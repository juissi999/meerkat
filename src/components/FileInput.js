import React from 'react'

const FileInput = ({file, setFile}) => {

  const onChange = (event) => {
    setFile(event.target.files[0])
  }

  if (file === null) {
    return(<div>
            <label className='custom-file-upload'>
              + Add a file
              <input type='file' onChange={onChange}/>
            </label>
           </div>)
  } else {
    return (<div>
              {file.name}
            </div>)

  }
}

export default FileInput
