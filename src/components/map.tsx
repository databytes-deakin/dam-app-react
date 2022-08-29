import React from 'react'
import GoogleMapReact, { ClickEventValue } from 'google-map-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1;
  height: 100vh;
`;

export const Map = (props: {isClassifying: boolean, onRightClick: () => void}) =>{
  const centre = {
    lat: -37.419793,
    lng: 145.112841
  };
  const zoom = 8;
  
  const [coords, setCoords] = React.useState<{lat: number, lng: number}[]>([]);
  const [map, setMap] = React.useState<any>();
  const [maps, setMaps] = React.useState<any>();
  
  const handleApiLoaded = (maps: { map: any; maps: any; ref: Element | null; }) => {
    // console.log()
    setMap(maps.map);
    setMaps(maps.maps);
  }
  
  React.useEffect(() => {
    if(maps && coords){
      const classificationPath = new maps.Polyline({
        path: coords,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      
      classificationPath.setMap(map);
    }
  }, [coords, map, maps]);
  
  return(
    <Wrapper
      onContextMenu={() => {
        setCoords([]);
        props.onRightClick();
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: ''}}
        defaultCenter={centre}
        draggable={props.isClassifying === false}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
        onClick={({x, y, lat, lng, event}:ClickEventValue) => {
          if(props.isClassifying){
            console.log(lat, lng);
            setCoords([...coords, {lat, lng}]);
          }
        }}
      >
        {/* {points.map
          
        } */}
      </GoogleMapReact>
    </Wrapper>
  )
}
