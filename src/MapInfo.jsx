import React, { Component } from "react";
import { withLeaflet, MapControl } from "react-leaflet";
import L from "leaflet";
import './MapInfo.css';

class MapInfo extends MapControl {
  constructor(props, context) {
    super(props);
  }

  setInfo(e){
    this.panelDiv.innerHTML = '<h4>US Population Density</h4>' +  (e ?
      '<b>' + e.name + '</b><br />' + e.density + ' people / mi<sup>2</sup>'
      : 'Hover over a state');
  }

  createLeafletElement(opts) {
    const MapInfo = L.Control.extend({
      onAdd: map => {
        this.panelDiv = L.DomUtil.create("div", "info");
        return this.panelDiv;
      }
    });
    return new MapInfo({ position: "bottomleft" });
  }

  componentDidMount() {
    const { map } = this.props.leaflet;
    this.leafletElement.addTo(map);
  }
}

export default withLeaflet(MapInfo);