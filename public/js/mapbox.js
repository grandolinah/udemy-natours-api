/*eslint-disable*/
export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYW5qZWtvdmEiLCJhIjoiY2s3eWliNDdrMDJjdDNmcDk1d2NycnVmYiJ9.cXxRFgU5GI4p9jpKPzLIVw';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/anjekova/ck7yj1wug0aif1iruq5qd9h54',
    scrollZoom: false
    // center: [-118.113491, 34.111745],
    // zoom: 4,
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // add pop up

    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    // extend map bounds to incldue current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
