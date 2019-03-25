import React, { Component, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import MapBoxGLLayer from './MapBoxGLLayer'
import './App.css';
import L, { Omnivore } from 'leaflet';
import { Map, TileLayer, Marker, Popup, withLeaflet, Polygon, GeoJSON, MapControl } from 'react-leaflet'
import statesData from './us-states'
import MapInfo from './MapInfo'

const polygon = [[37.8, -96], [37.8, -105], [45, -96]]

const App = (props) => {

  const [center, setCenter] = useState([37.8, -96]);
  const [zoom, setZoom] = useState(4);
  const [bounds, setBounds] = useState([[50, -120], [22.5, -75]]);
  const GeoJSONEL = useRef(null);
  const MapEL = useRef(null);
  const MapBoxEl = useRef(null);
  const MapInfoEl = useRef(null);

  const highlightFeature = (e) => {
    var layer = e.target;
    layer.setStyle({
      weight: 5,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7
    });

    layer.bringToFront();

    MapInfoEl.current.setInfo(layer.feature.properties);
  }  

  const zoomToFeature = (e) => {
    setBounds(e.target._bounds);
  }

  const resetHighlight = (event) => {
    GeoJSONEL.current.leafletElement.resetStyle(event.target);
    MapInfoEl.current.setInfo();
  }

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }

  const style = (feature) => {
    return ({
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
      fillColor: getColor(feature.properties.density)
    });
  }

  const getColor = (d) =>{
    return d > 1000
    ? "#800026"
    : d > 500
      ? "#BD0026"
      : d > 200
        ? "#E31A1C"
        : d > 100
          ? "#FC4E2A"
          : d > 50
            ? "#FD8D3C"
            : d > 20 ? "#FEB24C" : d > 10 ? "#FED976" : "#FFEDA0";
  }

  return (
      <div>
        <Map ref={MapEL} center={center} zoom={zoom} bounds={bounds}>
          <MapInfo ref={MapInfoEl}/>
          <MapBoxGLLayer
            ref={MapBoxEl} 
            accessToken={"pk.eyJ1IjoiZmxvcnZhbmRla2VyY2tob3ZlIiwiYSI6ImNqdGZyMmtrejAxYWw0M3A2OGtwdTMxNWEifQ.5U-KSDZfyKNC_Z74fEWj6g"}
            style="mapbox://styles/mapbox/streets-v10"
          />
          <GeoJSON ref={GeoJSONEL}  data={statesData} style={style} onEachFeature={onEachFeature} />
        </Map>
      </div>
  );
}

export default withLeaflet(App);  