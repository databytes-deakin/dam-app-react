import React from 'react';
import './app.css';
import { Page } from './components/page';
import styled from 'styled-components';
import { Map } from './components/map';

const Home = (props: { children: React.ReactElement }) => {
  return (
    <Page>
      <Map>
        
      </Map>
    </Page>
  );
}

export default Home;
