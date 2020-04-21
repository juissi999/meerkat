import React from 'react'

const uploaddir = 'uploads'

const MemoryFile = ({children}) => {
  return (<div>
            {children.map((c,i)=><a href={'uploads/' + c} key={i}>{c}</a>)}
          </div>)
}

export default MemoryFile
