import React, { Component } from 'react';
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import d3 from 'd3';
import WorldJson from '../countryMaps/World.topo.json';
import { Redirect, Link } from 'react-router-dom'

class ChoroplethMap extends Component {

    constructor(props){
      super(props)
    }

    componentDidUpdate(props) {
        // Datamaps expect data in format:
        // { "USA": { "fillColor": "#42a844", numberOfWhatever: 75},
        //   "FRA": { "fillColor": "#8dc386", numberOfWhatever: 43 } }
        let dataset = {};

        // We need to colorize every country based on "numberOfWhatever"
        // colors should be uniq for every value.
        // For this purpose we create palette(using min/max this.props.data-value)

        let onlyValues = this.props.data.map(function (obj) { return obj[1]; });
        let minValue = Math.min.apply(null, onlyValues),
            maxValue = Math.max.apply(null, onlyValues);

        // create color palette function
        // color can be whatever you wish
        let paletteScale = d3.scale.linear()
            .domain([minValue, maxValue])
            .range(["#EFEFFF", "#02386F"]); // blue color

        // fill dataset in appropriate format
        this.props.data.forEach(function (item) { //
            // item example value ["USA", 70]
            let iso = item[0],
                value = item[1];
            dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
        });

        let height = 168;
        let width = 360;

        let map = new Datamap({
            element: document.getElementById('choropleth_map'),
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
                    let transformCount
                    //check to see what the log-ed project count comes back as...
                    if(!data.numberOfThings){
                      //if zero or null
                      transformCount = 0
                    } else {
                      //else take E to the power of the log and round to the nearest integer
                      transformCount = Math.round(Math.pow(Math.E,data.numberOfThings))
                    }

                    if (!data) { return; }
                    // tooltip content
                    return ['<div class="hoverinfo">',
                            '<strong>', geo.properties.name, '</strong>',
                            // '<br>Count: <strong>', data.numberOfThings, '</strong>',
                            // '<br>Count: <strong>', Math.round(Math.pow(Math.E,data.numberOfThings)),'</strong>',
                            '<br>Count: <strong>', transformCount,'</strong>',
                            '</div>'].join('');
                    }
            },
            fills: {
                HIGH: '#afafaf',
                LOW: '#123456',
                MEDIUM: 'blue',
                UNKNOWN: 'rgb(0,0,0)',
                defaultFill: '#eee'
            },
            data: dataset,
            // projection: 'mercator'
            setProjection: function (element) {
                var projection = d3.geo.mercator()
                    .center([0, 0]) // always in [East Latitude, North Longitude]
                    .scale(200)
                    .translate([element.offsetWidth / 3, element.offsetHeight / 3]);

                var path = d3.geo.path().projection(projection);
                return { path: path, projection: projection };
            },
            done: function(map){
              map.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                let link = geography.id
                // link to the country component here. Might need a callback to mapBrowser first
                // could use localStorage as a backup
                props.handleClick(geography)
                // props.history.push({
                //   pathname: "/country",
                //   state: {link: geography}
                // })
                // this.clickCountry()
                // console.log(link)
              })
            }
        });
      }

      clickCountry = () => {
        console.log('in click country')
        this.props.handleClick()
      }

    render() {
        return (
            <div id="choropleth_map"></div>
        );
    }
}

export default ChoroplethMap;
