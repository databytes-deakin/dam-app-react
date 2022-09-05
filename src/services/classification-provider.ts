import React, { useCallback, useEffect } from 'react';
import ee from '@google/earthengine';
export interface IClassificationResult {
  isLoaded: boolean,
  error?: any,
  data?: any,
};

// TODO: env
export default function useClassification(endpoint = "https://api.example.com/items")
: [(classificationOptions: {lat: number, lng: number}[][]) => Promise<void>, IClassificationResult | null]{
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
  
  const classify = useCallback(async (classificationOptions: {lat: number, lng: number}[][]) => {
    // const { coordinates } = classificationOptions;
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
