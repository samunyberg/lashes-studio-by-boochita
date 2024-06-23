'use client';

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const MapComponent = () => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <Map
        style={{ height: '100%', width: '100%' }}
        defaultCenter={{ lat: 61.686029, lng: 27.273806 }}
        defaultZoom={15}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        <Marker position={{ lat: 61.686029, lng: 27.273806 }} />
      </Map>
    </APIProvider>
  );
};

export default MapComponent;
