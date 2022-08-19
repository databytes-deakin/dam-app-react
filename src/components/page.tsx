import React from 'react'

export const Page = (props:{
  children:React.ReactElement|React.ReactElement[],
  mynumber?: number
}) => {
  const [isClicked, setIsClicked] = React.useState(false);
  
  return(
    <div>
      {props.children}
      <button onClick={() => {
        setIsClicked(!isClicked);
      }}>
        CLICK ME
      </button>
      {isClicked ? "Yes" : "No"}
    </div>
  )
}
