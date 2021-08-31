const ipAddress = document.querySelector("#ip-input");
const submit = document.querySelector("#submit-button");
const ipDisplay = document.querySelector(".ip");
const ispDisplay = document.querySelector(".isp");
const timeZoneDisplay = document.querySelector(".timeZone");
const locDisplay = document.querySelector(".loc");
const displayfunc = document.querySelector(".info");
const mapdiv = document.querySelector("#mapid");
let locationURL;
let ipLocation;
let data;
let lattitude = 0;
let longitude = 0;
let ip;
let ipTimezone;
let isp;
let zoom = 1;

// initializing leaflet map

let mymap = L.map("mapid").setView([0, 0], 1.2, false);

let marker = L.marker([0, 0]).addTo(mymap);

let tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

// disable scroll zoom on map

mymap.scrollWheelZoom.disable();
mymap.on("click", function () {
  if (mymap.scrollWheelZoom.enabled()) {
    mymap.scrollWheelZoom.disable();
    mymap.dragging.disable();
  } else {
    mymap.scrollWheelZoom.enable();
    mymap.dragging.enable();
  }
});

//submit button event listner

submit.addEventListener("click", function (e) {
  e.preventDefault();

  displayfunc.style.display = "flex";
  locationURL = `https://geo.ipify.org/api/v1?apiKey=at_fHnI3uVKvOcwHZkDK4uvRvr7S0uCD&ipAddress=${ipAddress.value}`;
  sendGetRequest(locationURL);
});

//send request to api

function sendGetRequest(URL) {
  const request = new XMLHttpRequest();
  request.open("GET", URL);
  request.send();

  request.addEventListener("load", function () {
    data = JSON.parse(this.responseText);
    zoom = 13;
    setData(data);
    displayData(ip, ipLocation, ipTimezone, isp);
    map(lattitude, longitude, zoom);
  });
}

function setData(data) {
  lattitude = data.location.lat;
  longitude = data.location.lng;
  ip = data.ip;
  ipLocation =
    data.location.city +
    " ," +
    data.location.region +
    " ," +
    data.location.country;
  ipTimezone = data.location.timezone;
  isp = data.isp;
}

function displayData(ipAddress, loc, timeZone, isp) {
  ipDisplay.textContent = ipAddress;
  timeZoneDisplay.textContent = timeZone;
  locDisplay.textContent = loc;
  ispDisplay.textContent = isp;
}

//refresh map for new data

function map(lattitude, longitude) {
  mymap.setView([lattitude, longitude], 13);
  L.marker([lattitude, longitude]).addTo(mymap);
}
