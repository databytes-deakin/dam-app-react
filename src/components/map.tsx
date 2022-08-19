import React from 'react'
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Map = (props:{
  children:React.ReactElement|React.ReactElement[],
  mynumber?: number
}) => {
  const centre = {
    lat: -37.419793,
    lng: 145.112841
  };
  const zoom = 8;
  
  return(
    <Wrapper>
      <GoogleMapReact
        bootstrapURLKeys={{ key: ''}}
        defaultCenter={centre}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {/* MARKERS */}
      </GoogleMapReact>
    </Wrapper>
  )
}
