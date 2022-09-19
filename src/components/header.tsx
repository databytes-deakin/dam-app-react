import { Button, Paper } from '@mui/material';
import React from 'react'
import styled from 'styled-components';

const Wrapper = styled(Paper)`
  position: fixed;
  z-index: 99;
  top: 0;
  right: 0;
  width: 24em;
  list-style-type: none;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 0 20px!;
  padding: 16px;
`;

const Accordion = styled.div`
  cursor: pointer;
  & h4{
    font-size: 1.2rem;
  }
  font-weight: bold;
`;

export const Header = () => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  
  return(
    <Wrapper elevation={5}>
      <Accordion onClick={() => {
        setIsExpanded(!isExpanded);
      }}>
        <h4>Dam Assessment and Modelling</h4>
      </Accordion>
      {isExpanded &&
      <div>
        <hr />
        <p>
          DataBytes © 2022
          <br></br> <br></br>
          <h6>About the Project</h6>
          <br></br>
          This project will survey farm dams using computer vision techniques in conjunction with high resolution satellite data, the output of which will be used by scientists and policy makers to model the effects on climate change and facilitate sustainable farming practices. 
          <br></br> <br></br>
          In T3 2021 the Environmental Science Squad created an algorithm which can detect water in high resolution satellite images in Victoria. 
          <br></br> <br></br>
          <h6>Motivation</h6>
          <br></br>
          Farm dams are a high source of greenhouse gasses when not properly managed, producing the equivalent of approximately 385,000 cars per day in Victoria alone! Deakin University is leading ground-breaking research into the effects of farm dams on climate change, however, there is currently limited survey data of farm dams in Australia.
          <br></br> <br></br>
        </p>
          
          <Button href="https://github.com/DAM-Project/" target="_blank" rel="noreferrer" variant="contained" color="primary">
            GitHub
          </Button>
          &nbsp;
          &nbsp;
          <Button href="https://dam-app-django.readthedocs.io/en/latest/" target="_blank" rel="noreferrer" variant="contained" color="secondary">
            Documentation
          </Button>
        </div>
      }
    </Wrapper>
  )
}
