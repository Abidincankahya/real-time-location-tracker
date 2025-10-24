const socket = io("http://localhost:5000");

const map = L.map("map").setView([39.92, 32.85], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
}).addTo(map);

const markers = {};

navigator.geolocation.watchPosition(
  (pos) => {
    const { latitude, longitude } = pos.coords;
    const id = socket.id;
    socket.emit("sendLocation", { id, lat: latitude, lng: longitude });
  },
  (err) => console.error(err),
  { enableHighAccuracy: true }
);

socket.on("receiveLocation", (data) => {
  const { id, lat, lng } = data;
  if (markers[id]) {
    markers[id].setLatLng([lat, lng]);
  } else {
    markers[id] = L.marker([lat, lng]).addTo(map);
  }
});