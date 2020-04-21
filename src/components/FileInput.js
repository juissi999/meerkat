import React from 'react'

const FileInput = ({file, setFile}) => {

  const onChange = (event) => {
    setFile(event.target.files[0])
  }

  if (file === null) {
    return(<div className='filearea'>
            <label className='fileupload'>
              Add a file
              <input type='file' onChange={onChange}/>
            </label>
           </div>)
  } else {
    return (<div className='filearea'>
              {file.name}
            </div>)

  }
}

export default FileInput
