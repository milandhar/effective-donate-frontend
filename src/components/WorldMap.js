import React, { Component } from "react"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"
import { geoPath } from "d3-geo"
import { geoTimes } from "d3-geo-projection"

class WorldMap extends Component {
  static defaultProps = {
    width: 800,
    height: 450,
  }
  constructor() {
    super()
    this.state = {
      center: [0,0],
      zoom: 1,
      currentCountry: null,
    }
    this.projection = this.projection.bind(this)
    this.handleGeographyClick = this.handleGeographyClick.bind(this)
  }
  projection() {
    return geoTimes()
      .translate([this.props.width/2, this.props.height/2])
      .scale(160)
  }
  handleGeographyClick(geography) {
    // geography looks something like this:
    // { type: "Feature",  properties: {...}, geometry: {...} }
    const path = geoPath().projection(this.projection())
    const centroid = this.projection().invert(path.centroid(geography))
    this.setState({
      center: centroid,
      zoom: 4,
      currentCountry: geography.properties.iso_a3,
    })

  }
  render() {
    return (
      <div>
        <ComposableMap
          width={this.props.width}
          height={this.props.height}
          projection={this.projection}
          >
          <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
            <Geographies geographyUrl="/simpleMaps/world-50m.json">
              {(geographies, projection) =>
                geographies.map((geography, i) => (
                  <Geography
                    key={i}
                    cacheId={`path-${i}`}
                    geography={geography}
                    projection={projection}
                    onClick={this.handleGeographyClick}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

export default WorldMap
