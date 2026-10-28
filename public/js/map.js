// Interactive Map using Leaflet and OpenStreetMap
document.addEventListener('DOMContentLoaded', () => {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    let coordinates = [48.8566, 2.3522]; // Default Paris [lat, lng]
    let listingTitle = 'Destination';
    let listingLocation = 'Exact location provided after booking';

    try {
        if (mapElement.dataset.coordinates) {
            const rawCoords = JSON.parse(mapElement.dataset.coordinates);
            // GeoJSON coordinates are [longitude, latitude], Leaflet requires [latitude, longitude]
            if (Array.isArray(rawCoords) && rawCoords.length === 2) {
                coordinates = [rawCoords[1], rawCoords[0]];
            }
        }
        if (mapElement.dataset.title) {
            listingTitle = mapElement.dataset.title;
        }
        if (mapElement.dataset.location) {
            listingLocation = mapElement.dataset.location;
        }
    } catch (e) {
        console.error('Error parsing map coordinates:', e);
    }

    // Initialize the Leaflet map
    const map = L.map('map', {
        scrollWheelZoom: false
    }).setView(coordinates, 13);

    // OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom Airbnb-styled pin marker
    const airbnbIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="
            background-color: #fe424d;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
            border: 2px solid white;
            font-size: 16px;
        "><i class="fa-solid fa-house"></i></div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
        popupAnchor: [0, -20]
    });

    // Add marker and popup
    const popupContent = `
        <div style="padding: 4px; font-family: sans-serif;">
            <h6 style="margin: 0 0 4px 0; font-weight: bold; color: #222;">${listingTitle}</h6>
            <p style="margin: 0; font-size: 12px; color: #717171;">${listingLocation}</p>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #fe424d; font-weight: 600;">Exact location provided after booking</p>
        </div>
    `;

    L.marker(coordinates, { icon: airbnbIcon })
        .addTo(map)
        .bindPopup(popupContent)
        .openPopup();

    // Circle radius for privacy presentation like Airbnb
    L.circle(coordinates, {
        color: '#fe424d',
        fillColor: '#fe424d',
        fillOpacity: 0.12,
        radius: 400
    }).addTo(map);
});
