import React, { useCallback, useEffect } from 'react';

// Load client library.
// var ee = require('./gee');
// import * as ee from '@google/earthengine'
// var ee = require('@google/earthengine');

declare const window: any;
var ee = window.ee = require('@google/earthengine');

export default function useClassification(): (classificationOptions: {lat: number, lng: number}[], map: any) => Promise<void>{
  const classify = useCallback(async (coords: {lat: number, lng: number}[], map: any) => {
    if(!map){
      console.error("Map undefined. ")
      return;
    }
    
    // Initialize client library and run analysis.
    const initAndRun = () => {
      console.log('Authenticated. Initializing...');
      ee.initialize(null, null, function() {
        console.log('Initialised. Running classification...');
        
        const geometry = ee.Geometry.Polygon(Object.values(coords).map((value: { lat: number; lng: number; }) => [value.lng, value.lat]));
        console.log('Built Geometry.');
        classifyPoly(geometry, map);
        
        console.log('Pipeline complete. Wait for tiles to load...');
      }, function(e:any) {
        console.error('Initialization error: ' + e);
      });
    };

    // Authenticate using an OAuth pop-up.
    console.log('Authenticating...');
    ee.data.authenticateViaOauth(process.env.REACT_APP_GEE_OAUTH_CLIENT_ID, initAndRun, (e:any) => {
      console.error('Authentication error: ' + e);
    }, null, function() {
      console.log('Oauth failed. Trying popup...');
      ee.data.authenticateViaPopup(initAndRun);
    });
  }, []);
  return classify;
}

async function clearMap (map: any) {
  console.log("Clearing map...")
  map.data.forEach(function(feature:any) {
    // filter...
    map.data.remove(feature);
  console.log("Map Cleared.")
});
}

async function classifyPoly(geometry:any, map:any) {
  const cart_classifier = ee.FeatureCollection("users/arunetckumar/cart_classifier_3");
  const Sentinel2A = ee.ImageCollection("COPERNICUS/S2_SR");
  
  const classifier_string = cart_classifier.first().get('classifier');
  
  const classifier = ee.Classifier.decisionTree(classifier_string);
  
  const BANDS = ['B2', 'B3', 'B4', 'B8'];
  const ic = Sentinel2A
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 15))
    .select(BANDS)
    .filterBounds(geometry)
    .filterDate('2022-06-01', '2022-06-30');
  
  var final = await ic.median().classify(classifier);
  
  const palette = [
    '3f608f', // Water
    '3a9e78', // Veg
    '698549' // Land
  ]
  
  final = await final.clip(geometry);
  
  console.log('Classification done.');
  clearMap(map);
  console.log('Adding layer to map...');
  
  const mapId = await final.getMap({palette: palette, min: 0, max: 1});
  const eeTileSource = await new ee.layers.EarthEngineTileSource(mapId);
  const overlay = await new ee.layers.ImageOverlay(eeTileSource);
  
  map.overlayMapTypes.push(overlay);
  
  return {};
}


