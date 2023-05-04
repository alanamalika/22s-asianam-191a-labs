// declare map variable
const map = L.map('the_map').setView([34.0709,-118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// use our marker functions
addMarker(34.161327, -118.167648,'RE:SET Concert Series at the Rose Bowl', 'media/steve-lacy.png','Featuring Steve Lacy, Toro y Moi, Foushee, and James Blake!')
addMarker(33.674801, -116.221977,'Coachella Music Festival at Empire Polo Club', 'media/kaytramine.jpeg','Sad to see Frank Ocean leave but excited for Kaytraminé!')
addMarker(37.769421, -122.486214,'Outside Lands at Golden Gate Park', 'media/Maggie-Rogers.png','Excited to see Kendrick Lamar, NIKI, Maggie Rogers, and Megan Thee Stallion!')
addMarker(34.129250, -118.478060,'Japanese Breakfast with Ichiko Aoba at Walt Disney Concert Hall', 'media/japanese-breakfast.jpg','Ready to scream out the lyrics to Be Sweet!')

// create a function to add markers
function addMarker(lat,lng,title,image,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <img src="${image}" height="200px"> </img> <h3>${message}</h3>`)
    createButtons(lat,lng,title);
    return message
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng], 10); //this is the flyTo from Leaflet
    })
    document.getElementById("button").appendChild(newButton); //this adds the button to our page.
}