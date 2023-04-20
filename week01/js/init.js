const map = L.map('the_map').setView([34.0709, -118.444], 5); // (1)!
// var map = L.map('map').setView([51.505, -0.09], 13);
// Leaflet tile layer, i.e. the base map
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); // (2)!
// //JavaScript let variable declaration to create a marker
let marker1 = L.marker([34.161327, -118.167648]).addTo(map) // (3)!
    .bindPopup('RE:SET Concert Series featuring Steve Lacy, Toro y Moi, Foushee, and James Blake')
    .openPopup();
        
let marker2 = L.marker([33.674801, -116.221977]).addTo(map) // (3)!
    .bindPopup('Coachella Weekend 2 with Frank Ocean, Bad Bunny and BLACKPINK')
    .openPopup();
        
 let marker3 = L.marker([37.769421, -122.486214]).addTo(map) // (3)!
    .bindPopup('Outside Lands 2023')
    .openPopup();
                    
let marker4 = L.marker([34.129250, -118.478060]).addTo(map) // (3)!
    .bindPopup('Jpanese Breakfast with Ichiko Aoba')
    .openPopup();