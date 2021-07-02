import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const MapContainer = (props) => {
  return (
    <Map google={this.props.google} zoom={14}>
      <Marker
        name={"Dolores park"}
        position={{ lat: 37.759703, lng: -122.428093 }}
      />
      <Marker />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: YOUR_GOOGLE_API_KEY_GOES_HERE,
})(MapContainer);
