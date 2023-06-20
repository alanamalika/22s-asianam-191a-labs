// declare the variables
let mapCenter = [34.0709,-118.044]
const zoom = 10

let LAcounty = L.featureGroup();
let nonLAcounty = L.featureGroup();

let layers = {
    "Restaurants in LA County": LAcounty,
    "Restaurants outside of LA County": nonLAcounty
}

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1gegAf1mxnR5r2jdw1LzcANbW6nwWIFdmgnyUY8ov9YX0jn6RKPuf_gVCIO4GcxYh6P3AAW7ZlSMX/pub?output=csv"

// declare the map and use the variables above
const map = L.map('the_map').setView(mapCenter, zoom);

// add layer control box
L.control.layers(null,layers).addTo(map)

let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
});

Esri_WorldGrayCanvas.addTo(map);

function addMarker(data){
    if(data['Is this restaurant in Los Angeles County?'] == "Yes"){
        circleOptions.fillColor = "red"
        LAcounty.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data['What is your favorite restaurant that reminds you of home?']}</h2> <h3>${data['Which city is this restaurant located at?']}</h3>`))
        createButtons(data.lat,data.lng,data['What is your favorite restaurant that reminds you of home?'])
        }
    else{
        circleOptions.fillColor = "blue"
        nonLAcounty.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data['What is your favorite restaurant that reminds you of home?']}</h2> <h3>${data['Which city is this restaurant located at?']}</h3>`))
        createButtons(data.lat,data.lng,data['What is your favorite restaurant that reminds you of home?'])
    }
    return data
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
    })
    LAcounty.addTo(map) // add our layers after markers have been made
    nonLAcounty.addTo(map) // add our layers after markers have been made  
    let allLayers = L.featureGroup([LAcounty,nonLAcounty]);
    map.fitBounds(allLayers.getBounds());
}

loadData(dataUrl)