import React, { Component } from 'react';
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import d3 from 'd3';
import WorldJson from '../countryMaps/World.topo.json';
// import { Redirect, Link } from 'react-router-dom';

class ChoroplethMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needsUpdate: false,
      width: 0,
      height: 0,
    };
    this.mapRef = React.createRef();
  }

  componentDidUpdate() {
    // if(this.props.dropdownUpdated){
    this.renderMap(this.props);
    // }
  }

  componentDidMount() {
    let width = this.getWidth();
    let height = this.getHeight();
    this.setState({ width: width, height: height }, () => {
      this.renderMap(this.props);
    });
    let resizedFn;

    window.addEventListener('resize', () => {
      clearTimeout(resizedFn);
      resizedFn = setTimeout(() => {
        this.redrawMap();
      }, 200);
    });
  }

  redrawMap() {
    let width = this.getWidth();
    let height = this.getHeight();
    this.setState({ width: width, height: height });
    d3.select('svg').remove();
    this.renderMap = this.renderMap.bind(this);
    this.renderMap(this.props);
  }

  getWidth() {
    if (
      this &&
      this.map &&
      this.map.current &&
      this.mapRef &&
      this.mapRef.current &&
      this.mapRef.current.parentElement
    ) {
      return this.mapRef.current.parentElement.offsetWidth;
    }
  }

  getHeight() {
    if (
      this &&
      this.map &&
      this.map.current &&
      this.mapRef &&
      this.mapRef.current &&
      this.mapRef.current.parentElement
    ) {
      return this.mapRef.current.parentElement.offsetHeight;
    }
  }

  renderMap = (props) => {
    let dataset = {};
    // We need to colorize every country based on "numberOfWhatever"
    // colors should be uniq for every value.
    // For this purpose we create palette(using min/max this.props.data-value)

    let onlyValues = props.data.map(function (obj) {
      return obj[1];
    });
    let minValue = Math.min.apply(null, onlyValues),
      maxValue = Math.max.apply(null, onlyValues);

    // create color palette function
    // color can be whatever you wish
    let paletteScale = d3.scale
      .linear()
      .domain([minValue, maxValue])
      .range(['#EFEFFF', '#02386F']); // blue color
    // Datamaps expect data in format:
    // { "USA": { "fillColor": "#42a844", numberOfWhatever: 75},
    //   "FRA": { "fillColor": "#8dc386", numberOfWhatever: 43 } }

    // fill dataset in appropriate format
    props.data.forEach(function (item) {
      //
      // item example value ["USA", 70]
      let iso = item[0],
        value = item[1];
      dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
    });

    // let height = 168;
    // let width = 360;

    let map = new Datamap({
      element: document.getElementById('choropleth_map'),
      responsive: true,
      scope: 'world',
      geographyConfig: {
        popupOnHover: true,
        highlightOnHover: true,
        borderColor: '#444',
        highlightBorderWidth: 1,
        borderWidth: 0.5,
        dataJson: WorldJson,
        popupTemplate: function (geo, data) {
          // don't show tooltip if country don't present in dataset
          let transformCount;
          //check to see what the log-ed project count comes back as...
          if (!data.numberOfThings) {
            //if zero or null
            transformCount = 0;
          } else {
            //else take E to the power of the log and round to the nearest integer
            transformCount = Math.round(Math.pow(Math.E, data.numberOfThings));
          }

          if (!data) {
            return;
          }
          // tooltip content
          return [
            '<div class="hoverinfo">',
            '<strong>',
            geo.properties.name,
            '</strong>',
            // '<br>Count: <strong>', data.numberOfThings, '</strong>',
            // '<br>Count: <strong>', Math.round(Math.pow(Math.E,data.numberOfThings)),'</strong>',
            '<br>Project Count: <strong>',
            transformCount,
            '</strong>',
            '</div>',
          ].join('');
        },
      },
      fills: {
        HIGH: '#afafaf',
        LOW: '#123456',
        MEDIUM: 'blue',
        UNKNOWN: 'rgb(0,0,0)',
        defaultFill: '#eee',
      },
      data: dataset,
      // projection: 'mercator'
      setProjection: function (element) {
        var projection = d3.geo
          .mercator()
          .center([0, 20]) // always in [East Latitude, North Longitude]
          .scale(160)
          .translate([element.offsetWidth / 3, element.offsetHeight / 3]);

        var path = d3.geo.path().projection(projection);
        return { path: path, projection: projection };
      },
      done: function (map) {
        map.svg
          .selectAll('.datamaps-subunit')
          .on('click', function (geography) {
            let link = geography.id;

            props.handleClick(geography);
          });
      },
    });
    // this.setState({state: this.state}, this.props.toggleDropdownUpdated, console.log(dataset), map.updateChoropleth(dataset))
  };

  removeDiv = () => {
    // this.props.handleClick()
    const parentNode = document.getElementById('choropleth_map');
    const childNode = document.getElementsByClassName('datamap');
    d3.select('svg').remove();
  };

  render() {
    return (
      <div id='choropleth_parent'>
        {this.removeDiv()}
        <div ref={this.mapRef} id='choropleth_map'></div>
      </div>
    );
  }
}

export default ChoroplethMap;
