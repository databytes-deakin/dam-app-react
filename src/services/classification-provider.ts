import React, { useCallback, useEffect } from 'react';
import ee from '@google/earthengine';
export interface IClassificationResult {
  isLoaded: boolean,
  error?: any,
  data?: any,
};

// TODO: env
export default function useClassification(endpoint = "https://api.example.com/items")
: [(classificationOptions: {lat: number, lng: number}[], map: any) => Promise<void>, IClassificationResult | null]{
  const [classificationResult, setClassificationResult] = React.useState<IClassificationResult | null>(null);
  const initGoogleEarthEngine = () => {
    console.log("Authentication!");
    try {
      // TODO: env
      ee.data.authenticateViaOauth(process.env.REACT_APP_GEE_OAUTH_CLIENT_ID, () => {
        console.log("Authentication via OAuth was a success!");
      }, (e: any) => {
        throw e;
      }, null, () => {
          console.log('Authenticating by popup...');
        ee.data.authenticateViaPopup(() => {
          console.log('Authenticated by popup - success!');
        }, (e: any) => {
          console.error("Generic authentication error!");
          throw e;
        });
      });
    } catch (error) {
      console.error("Authentication Error!");
      console.error(error);
    }
  }
  
  const classify = useCallback(async (coords: {lat: number, lng: number}[], map: any) => {
    const geometry = ee.Geometry.Polygon(Object.values(coords).map((value: { lat: number; lng: number; }) => [value.lng, value.lat]));
    classifyData(geometry,  map);
    return;
    // const { coordinates } = classificationOptions;
    
    var image = ee.Image('COPERNICUS/S2_SR/20210109T185751_20210109T185931_T10SEG').clip(geometry);
    
    var rgbVis = {
      bands: ['B11', 'B8', 'B3'],
      min: 0,
      max: 3000
    };
    
    image.getMap(rgbVis)
      .then((mapId: any) => ee.layers.EarthEngineTileSource(mapId))
      .then((tileSource: any) => ee.layers.ImageOverlay(tileSource))
      .then((overlay: any) => map.overlayMapTypes.push(overlay))
      .catch((e: any) => {throw e});
    
    return fetch(endpoint)
      .then(res => res.json())
      .then(
        (data: any) => {
          setClassificationResult({ isLoaded: true, data });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error: any) => {
          setClassificationResult({ isLoaded: true, error });
        }
      )
  }, [endpoint]);
  
  useEffect(() => initGoogleEarthEngine(), []);
  useEffect(() => {
    if(classificationResult?.isLoaded){
      console.log("Classification result!");
      console.log(classificationResult.data ?? classificationResult.error ?? "No result");
    }
  }, [classificationResult]);
  
  return [classify, classificationResult];
}
let mapId: any;
let eeTileSource: any;
let overlay: any;
let cart_classifier: any;
let Sentinel2A: any;
let classifier_string: any;
let classifier: any;
let BANDS: any;
let ic: any;
async function classifyData(geometry:any, map:any) {
  const doGaussBlur = false;
  let cart_classifier = ee.FeatureCollection("users/arunetckumar/cart_classifier_3");
  let Sentinel2A = ee.ImageCollection("COPERNICUS/S2_SR");
  
  // Load using this
  let classifier_string = cart_classifier.first().get('classifier');
  
  let classifier = ee.Classifier.decisionTree(classifier_string);


  BANDS = ['B2', 'B3', 'B4', 'B8'];
  let ic = Sentinel2A
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 15))
    .select(BANDS);
  
  ic = ic.filterDate('2022-06-01', '2022-06-30')
  
  var final = ic.median().classify(classifier);
  
  // if(doGaussBlur === true){
  //   let skinny = ee.Kernel.gaussian({
  //     radius: 25,
  //     sigma: 15,
  //     units: 'meters',
  //     normalize: true
  //   });
    
  //   let fat = ee.Kernel.gaussian({
  //     radius: 25,
  //     sigma: 20,
  //     units: 'meters',
  //     normalize: true
  //   });
    
  //   let skinnyBlur = await final.convolve(skinny);
  //   let fatBlur = await final.convolve(fat);
    
  //   let edges = await ee.Algorithms.CannyEdgeDetector(fatBlur, 0.2, 0).multiply(ee.Image(5)).add(ee.Image(1)).convolve(fat);
    
  //   final = await edges.multiply(skinnyBlur);
  // }
  
  const palette = [
    '3f608f', // Water
    '3a9e78', // Veg
    '698549' // Land
  ]
  
  final = await final.clip(geometry);
  
  mapId = await final.getMap({palette: palette, min: 0, max: 1});
  eeTileSource = new ee.layers.EarthEngineTileSource(mapId);
  overlay = new ee.layers.ImageOverlay(eeTileSource);
  
  await map.overlayMapTypes.push(overlay);
  return {};
}


