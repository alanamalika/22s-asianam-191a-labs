// declare the variables
let mapCenter = [34.0709,-118.044]
const zoom = 10

// declare the map and use the variables above
const map = L.map('the_map').setView(mapCenter, zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(data){
    L.marker([data.lat,data.lng]).addTo(map).bindPopup(`<h2>${data['What is your favorite restaurant that reminds you of home?']}</h2> <h3>${data['Which city is this restaurant located at?']}</h3>`)
    createButtons(data.lat,data.lng,data['What is your favorite restaurant that reminds you of home?'])
    return
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

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1gegAf1mxnR5r2jdw1LzcANbW6nwWIFdmgnyUY8ov9YX0jn6RKPuf_gVCIO4GcxYh6P3AAW7ZlSMX/pub?output=csv"

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
}

loadData(dataUrl)