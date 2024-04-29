
import axios from 'axios';
declare var ol: any;

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURI(
        enteredAddress
      )}&format=json`
    )
    .then((response) => {
      const data = response.data[0];
      const lat = data.lat;
      const long = data.lon;

      const coordinates = { lat: lat, long: long };
      alert(`Latitude: ${coordinates.lat}, Longitude: ${coordinates.long}`);
       document.getElementById("map")!.innerHTML = ""; // clear <p> from <div id="map">
       new ol.Map({
         target: "map",
         layers: [
           new ol.layer.Tile({
             source: new ol.source.OSM(),
           }),
         ],
         view: new ol.View({
           center: ol.proj.fromLonLat([coordinates.long, coordinates.lat]),
           zoom: 16,
         }),
       });
    })
    .catch((error) => {
      console.log(error);
    });
}

form.addEventListener('submit', searchAddressHandler);