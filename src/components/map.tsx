import React, { SetStateAction, useCallback, useRef } from 'react'
import GoogleMapReact, { ClickEventValue } from 'google-map-react';
import styled from 'styled-components';
import useClassification from '../services/classification-provider';

const Wrapper = styled.div`
  flex: 1;
  height: 100vh;
  * .selected > *{
    background: red;
  }
`;

export const Map = (props: {setIsDrawing: (value: SetStateAction<boolean>) => void, isDrawing: boolean}) =>{
  const centre = {
    lat: -37.199732, 
    lng: 145.906289
  };
  const zoom = 13;
  
  const [coords, setCoords] = React.useState<{lat: number, lng: number}[]>([]);
  const [polygons, setPolygons] = React.useState<{lat: number, lng: number}[][]>([]);
  const [line, setLine] = React.useState<any>();
  const [mouseLatLng, setMouseLatLng] = React.useState<any>();
  const [map, setMap] = React.useState<any>();
  const [maps, setMaps] = React.useState<any>();
  const [shapes, setShapes] = React.useState<any[]>([]);
  
  const handleApiLoaded = (maps: { map: any; maps: any; ref: Element | null; }) => {
    // console.log()
    setMap(maps.map);
    setMaps(maps.maps);
  }
  const classify = useClassification();
  
  const finishDraw = useCallback(() => {
    props.setIsDrawing(false);
    if(maps){
      
      props.setIsDrawing(false);
      setShapes(shapes.slice(0, -1));
      setPolygons([...polygons, coords]);
      setCoords([]);
      
      let polyInfo:any = {
        path: [...coords, mouseLatLng],
        geodesic: true,
        strokeColor: "#202020",
        strokeOpacity: 0.5,
        strokeWeight: 2,
      };
      
      const poly = new maps.Polygon(polyInfo);
      
      poly.setMap(map);
      maps.event.addListener(poly, 'click', function(event: {domEvent: React.MouseEvent<HTMLElement>}) {
        const geometry = line.getPath().getArray().map((p:any) => ({lat: p.lat(), lng: p.lng()}));
        console.log(geometry);
        
        classify && map && polygons && classify(geometry, map);
        poly.setMap(null);
        line.setMap(null);
        shapes.forEach((shape) => shape.setMap(null));
        setShapes([]);
      });
    }
  }, [classify, coords, line, map, maps, mouseLatLng, polygons, props, shapes]);
  
  React.useEffect(() => {
    if(maps && coords && props.isDrawing && line){
      line.setPath([...coords, mouseLatLng]);
    }
  }, [coords, line, map, maps, mouseLatLng, props.isDrawing]);
  
  React.useEffect(() => {
    if(maps)
      maps.event.addListener(map, 'mousemove', function(event: {latLng: any}) {
        setMouseLatLng(event.latLng);
      });
  }, [map, maps]);
  
  return(
    <Wrapper
      onContextMenu={() => {
        line.setPath([...coords, mouseLatLng, coords.at(0)]);
        finishDraw();
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY ?? ''}}
        defaultCenter={centre}
        draggable={!props.isDrawing}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
        onClick={({x, y, lat, lng, event: {latLng: any}}:ClickEventValue) => {
          if(props.isDrawing) {
            setCoords([...coords, {lat, lng}]);
            if(!line){
              setLine(new maps.Polyline({map, path: [{lat, lng}], clickable:false}));
            }
          }
        }}
      >
        {/* {points.map
          
        } */}
      </GoogleMapReact>
    </Wrapper>
  )
}
