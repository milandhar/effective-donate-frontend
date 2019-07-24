import React, { Component } from 'react';
import Datamap from 'datamaps';
import d3 from 'd3';
import IndiaJson from '../countryMaps/ind.topo.json';

export default class BubbleMap extends Component {

    constructor(){
      super()
      this.state = {
        bubbles: []
      }
    }

    componentDidMount() {
      this.getProjects()
    }

    componentDidUpdate(){
      let bubble_map = new Datamap({
          element: document.getElementById('bubbles_map'),
          geographyConfig: {
            dataJson: IndiaJson,
            // dataUrl: 'https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json',
            popupOnHover: false,
            highlightOnHover: false
          },
          fills: {
            defaultFill: '#ABDDA4'
            //add theme fills here
          },
          setProjection: function (element) {
                var projection = d3.geo.mercator()
                    .center([78.9629, 23.5937]) // always in [East Latitude, North Longitude]
                    .scale(1000);
                var path = d3.geo.path().projection(projection);
                return { path: path, projection: projection };
            }
        })

        bubble_map.bubbles=(this.state.bubbles)

        // {popupTemplate: function(geo, data) {
        //     return '<div class="hoverinfo">Name:' + data.name + ''
        //   }
        // }

        // bubbles={[
        //   {
        //     name: 'Not a bomb, but centered on Brazil',
        //     radius: 23,
        //     centered: 'BRA',
        //     country: 'USA',
        //     yeild: 0,
        //     fillKey: 'USA',
        //     date: '1954-03-01'
        //   },
        //   {
        //     name: 'Castle Bravo',
        //     radius: 25,
        //     yeild: 15000,
        //     country: 'USA',
        //     significance: 'First dry fusion fuel "staged" thermonuclear weapon; a serious nuclear fallout accident occurred',
        //     fillKey: 'USA',
        //     date: '1954-03-01',
        //     latitude: 11.415,
        //     longitude: 165.1619
        //   },
        //   {
        //     name: 'Tsar Bomba',
        //     radius: 70,
        //     yeild: 50000,
        //     country: 'USSR',
        //     fillKey: 'RUS',
        //     significance: 'Largest thermonuclear weapon ever tested-scaled down from its initial 100Mt design by 50%',
        //     date: '1961-10-31',
        //     latitude: 73.482,
        //     longitude: 54.5854
        //   }
        // ]}
        // bubbleOptions={{
        //   popupTemplate: (geo, data) =>
        //     `<div class="hoverinfo">Yield: ${data.yeild}\nExploded on ${data.date} by the ${data.country}`
        // }}
    }

    getProjects = () => {
      const url = `http://localhost:3000/api/v1/projects?countryCode=IND`
      let bubbleArray = []
      fetch(url)
      .then(res=>res.json())
      .then(json=> {
        json.forEach(project => {
          if(project["latitude"] && project["longitude"]){
            bubbleArray.push({name: project["title"], latitude: project["latitude"], longitude: project["longitude"], radius: 5, fillKey: 'MEDIUM'})
          }
        })
        // , () => this.changeState(newOptions)
      })
      .then(() => this.setState({bubbles: bubbleArray}))
    }
			// <Example label="Bubbles">
			// </Example>

    render() {
        return (
            <div id="bubbles_map"></div>
        );
    }

}
