import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #303030;
  border-radius: 0.75em;
  position: fixed;
  top: 0;
  right: 0;
  color: white;
`;

const Accordion = styled.button`
  cursor: pointer;
  padding: 0.75em 2.5em;
  & h4{
    font-size: 1.2rem;
  }
`;

export const Header = () => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  
  return(
    <Wrapper>
      <Accordion onClick={() => {
        setIsExpanded(!isExpanded);
      }}>
        <h4>Dam Assessment and Monitoring</h4>
        
      </Accordion>
      {isExpanded &&
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos, culpa inventore fugiat vero doloribus, rerum ipsum neque possimus iure dolore voluptatem aliquid officia quas veniam repellendus nostrum sit. Recusandae, voluptas?
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos, culpa inventore fugiat vero doloribus, rerum ipsum neque possimus iure dolore voluptatem aliquid officia quas veniam repellendus nostrum sit. Recusandae, voluptas?
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos, culpa inventore fugiat vero doloribus, rerum ipsum neque possimus iure dolore voluptatem aliquid officia quas veniam repellendus nostrum sit. Recusandae, voluptas?
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos, culpa inventore fugiat vero doloribus, rerum ipsum neque possimus iure dolore voluptatem aliquid officia quas veniam repellendus nostrum sit. Recusandae, voluptas?
        </p>
      }
    </Wrapper>
  )
}
