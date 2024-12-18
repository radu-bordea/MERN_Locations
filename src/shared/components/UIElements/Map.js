import React, { useRef, useEffect } from 'react';

import './Map.css';

// Component to render a Google Map with a marker.
const Map = props => {
  const mapRef = useRef(); // Create a reference to the map container element.

  const { center, zoom } = props; // Destructure `center` and `zoom` from props.

  useEffect(() => {
    // Initialize the Google Map when the component mounts or updates.
    const map = new window.google.maps.Map(mapRef.current, {
      center: center, // Set the initial center of the map.
      zoom: zoom // Set the initial zoom level of the map.
    });

    // Add a marker at the specified center location.
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]); // Dependencies ensure the map updates when `center` or `zoom` changes.

  return (
    // Render a div to serve as the map container.
    <div
      ref={mapRef} // Attach the ref to access the DOM element.
      className={`map ${props.className}`} // Apply dynamic and custom CSS classes.
      style={props.style} // Apply inline styles passed via props.
    ></div>
  );
};

export default Map;
