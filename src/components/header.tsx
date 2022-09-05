import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
position: fixed;
z-index: 99;
top: 0;
right: 0;
width: 24em;
list-style-type: none;
background: #4d4d4f;
font-size: 1rem;
color: #fff;
display: flex;
flex-direction: column;
border-radius: 0 0 0 20px;
padding: 16px;
`;

const Accordion = styled.button`
  cursor: pointer;
  padding: 0.75em 1.5em;
  & h4{
    font-size: 1.2rem;
  }
  color: #fff;
  background: #4d4d4f;
  margin-block-start: 1.33em;
  margin-block-end: 1.33em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 15px;
  padding: 10px 30px;
  border-radius: 5px;
  margin: 10px 10px;
  cursor: pointer;
`;


function sayHello() {
  alert('You clicked me!');
}
// Usage
<button onClick={sayHello}>Default</button>;


export const Header = () => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  
  return(
    <Wrapper>
      <Accordion onClick={() => {
        setIsExpanded(!isExpanded);
      }}>
        <h4><u>Dam Assessment and Modelling</u></h4>
        
      </Accordion>
      {isExpanded &&
        <p>
          DataBytes © 2022
          <br></br> <br></br>
    <b>About the Project</b>
    <br></br>
    This project will survey farm dams using computer vision techniques in conjunction with high resolution satellite data, the output of which will be used by scientists and policy makers to model the effects on climate change and facilitate sustainable farming practices. 
    <br></br> <br></br>
    In T3 2021 the Environmental Science Squad created an algorithm which can detect water in high resolution satellite images in Victoria. 
    <br></br> <br></br>
    <b>Motivation</b> 
    <br></br> <br></br>
    Farm dams are a high source of greenhouse gasses when not properly managed, producing the equivalent of approximately 385,000 cars per day in Victoria alone! Deakin University is leading ground-breaking research into the effects of farm dams on climate change, however, there is currently limited survey data of farm dams in Australia.
        <br></br>
   <a href="https://github.com/DAM-Project/dam-app-react" target="_blank" rel="noreferrer">
          <Button>GitHub</Button>
        </a>

        <a href="https://dam-app-django.readthedocs.io/en/latest/" target="_blank" rel="noreferrer">
          <Button>Documentation</Button>
        </a>
        </p>

        
      }
    </Wrapper>
  )
}
