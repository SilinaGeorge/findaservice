import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import MarkerComponent from "../components/common/MarkerComponent.jsx";

const { compose, withProps, withState, withHandlers } = require("recompose");
const FaAnchor = require("react-icons/lib/fa/anchor");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} = require("react-google-maps");

const displayMarkers = (markers, centerPoint, callback) => {
  return markers.map(marker => {
    if (arePointsNear({ lat: marker.lat, lng: marker.lng }, centerPoint, 30)) {
      return (
        <MarkerComponent
          lat={marker.lat}
          lng={marker.lng}
          name={marker.name}
          callback={callback}
        />
      );
    }
  });
};

const arePointsNear = (checkPoint, centerPoint, km) => {
  var ky = 40000 / 360;
  var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
};

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=	AIzaSyAl9pWMK_Ctdbv_nmQnO-8ppOVPAvIDz7Q&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `88vh` }} />,
    containerElement: <div style={{ height: `88vh` }} />,
    mapElement: <div style={{ height: `88vh` }} />
  }),
  withState("zoom", "onZoomChange", 8),
  withHandlers(() => {
    const refs = {
      map: undefined
    };
    return {
      onMapMounted: () => ref => {
        refs.map = ref;
      },
      onZoomChanged: ({ onZoomChange }) => () => {
        onZoomChange(refs.map.getZoom());
      }
    };
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    center={{ lat: props.lat, lng: props.lng }}
    defaultZoom={13}
    options={{ maxZoom: 20 }}
    ref={props.onMapMounted}
    onZoomChanged={props.onZoomChanged}
  >
    {displayMarkers(
      props.pos,
      { lat: props.lat, lng: props.lng },
      props.callback
    )}
  </GoogleMap>
);

export default Map;
