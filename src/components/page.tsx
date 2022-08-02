import React from 'react'

export const Page = (props:{children:React.ReactElement}) => {
  return(
    <div>
      {props.children}
    </div>
  )
}
