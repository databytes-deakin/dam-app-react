import React, { useCallback, useEffect } from 'react';

// Load client library.
// var ee = require('./gee');
// import * as ee from '@google/earthengine'
// var ee = require('@google/earthengine');

export interface IClassificationResult {
  isLoaded: boolean,
  error?: any,
  data?: any,
};

declare const window: any;
var ee = window.ee = require('@google/earthengine');

// TODO: env
export default function useClassification(): (classificationOptions: {lat: number, lng: number}[], map: any) => Promise<void>{
  const [classificationResult, setClassificationResult] = React.useState<IClassificationResult | null>(null);
  useEffect(() => {
    if(classificationResult?.isLoaded){
      console.log("Classification result!");
      console.log(classificationResult.data ?? classificationResult.error ?? "No result");
    }
  }, [classificationResult]);
  
  
  const classify = useCallback(async (coords: {lat: number, lng: number}[], map: any) => {
    console.log('Authenticated. Running classification...');
    // Initialize client library and run analysis.
    var initAndRun = () => {
      ee.initialize(null, null, function() {
        const geometry = ee.Geometry.Polygon(Object.values(coords).map((value: { lat: number; lng: number; }) => [value.lng, value.lat]));
        classifyPoly(geometry, map);
      }, function(e:any) {
        console.error('Initialization error: ' + e);
      });
    };

    // Authenticate using an OAuth pop-up.
    ee.data.authenticateViaOauth(process.env.REACT_APP_GEE_OAUTH_CLIENT_ID, initAndRun, (e:any) => {
      console.error('Authentication error: ' + e);
    }, null, function() {
      ee.data.authenticateViaPopup(initAndRun);
    });
  }, []);
  return classify;
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
    .filterDate('2022-06-01', '2022-06-30');
  
  var final = ic.median().classify(classifier);
  
  const palette = [
    '3f608f', // Water
    '3a9e78', // Veg
    '698549' // Land
  ]
  
  final = final.clip(geometry);
  
  const mapId = final.getMap({palette: palette, min: 0, max: 1});
  const eeTileSource = new ee.layers.EarthEngineTileSource(mapId);
  const overlay = new ee.layers.ImageOverlay(eeTileSource);
  
  map.overlayMapTypes.push(overlay);
  
  return {};
}


