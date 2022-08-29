import React from 'react'

export const Page = (props:{
  children: any,
  mynumber?: number
}) => {
  return(
    <div>
      {props.children}
    </div>
  )
}
