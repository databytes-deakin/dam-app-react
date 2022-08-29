import React, { useEffect } from 'react';

export interface IClassificationOptions {
  coordinates: {
    longitude: Number,
    latitude: Number,
  }[]
};

export interface IClassificationResult {
  isLoaded: boolean,
  error?: any,
  data?: any,
};

export default function useClassification(endpoint = "https://api.example.com/items"){
  const [classificationResult, setClassificationResult] = React.useState<IClassificationResult>();
  const initGoogleEarthEngine = () => {
    
  }
  
  const classify = (classificationOptions: IClassificationOptions) => {
    // const { coordinates } = classificationOptions;
    fetch(endpoint)
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
  };
  
  useEffect(() => initGoogleEarthEngine(), []);
  useEffect(() => {
    
    
  }, [classificationResult]);
  
  return [classify, classificationResult];
}
