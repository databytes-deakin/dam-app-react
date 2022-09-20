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
    lat: -37.419793,
    lng: 145.112841
  };
  const zoom = 8;
  
  const [coords, setCoords] = React.useState<{lat: number, lng: number}[]>([]);
  const [polygons, setPolygons] = React.useState<{lat: number, lng: number}[][]>([]);
  const [map, setMap] = React.useState<any>();
  const [maps, setMaps] = React.useState<any>();
  const [shapes, setShapes] = React.useState<any[]>([]);
  
  let selectedPolyRef = useRef();
  
  const handleApiLoaded = (maps: { map: any; maps: any; ref: Element | null; }) => {
    // console.log()
    setMap(maps.map);
    setMaps(maps.maps);
  }
  const classify = useClassification();
  
  const finishDraw = useCallback(() => {
    if(maps){
      
      props.setIsDrawing(false);
      setShapes(shapes.slice(0, -1));
      setPolygons([...polygons, coords]);
      setCoords([]);
      
      let polyInfo:any = {
        path: coords,
        geodesic: true,
        strokeColor: "#202020",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      };
      
      const poly = new maps.Polygon(polyInfo);
      
      poly.setMap(map);
      maps.event.addListener(poly, 'click', function(event: {domEvent: React.MouseEvent<HTMLElement>}) {
        let newShapes = shapes;
        let shape = newShapes.pop();
        shape.setMap(null);
        
        polyInfo.fillColor = "#10D840";
        polyInfo.strokeOpacity = 0.1;
        shape = new maps.Polygon(polyInfo);
        shape.setMap(map)
        
        setShapes([...newShapes, shape]);
        
        classify && map && polygons && classify(coords, map);
      });
      
      maps.event.addListener(poly, 'rightclick', function(event: {domEvent: React.MouseEvent<HTMLElement>}) {
        // TODO: DELETE
        // ley shape = event.domEvent.currentTarget.;
        poly.setMap(null);
        // setShapes(shapes.filter((s) => s !== poly));
      });
    }
  }, [classify, coords, map, maps, polygons, props, shapes]);
  
  React.useEffect(() => {
    if(maps && coords && props.isDrawing){
      let classificationPath = new maps.Polyline({
        path: coords,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      
      classificationPath.setMap(map);
      
      shapes.forEach((s) => s.setMap(null));
      
      setShapes([...shapes.slice(0, -1), classificationPath]);
    }
  }, [coords, map, maps, props.isDrawing, shapes]);
  
  
  return(
    <Wrapper
      onContextMenu={() => {
        finishDraw();
        props.setIsDrawing(false);
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY ?? ''}}
        defaultCenter={centre}
        draggable={!props.isDrawing}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
        onClick={({x, y, lat, lng, event}:ClickEventValue) => {
          if(props.isDrawing) {
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
