import React, {useState} from 'react'
import fileservice from '../fileservice'

const FileInput = () => {

  const [file, setFile] = useState(null)

  const onSubmit = (event) => {
    event.preventDefault()
    fileservice.post(file)
  }

  const onChange = (event) => {
    setFile(event.target.files[0])
  }

  return(<form onSubmit={onSubmit}>
         <input type='file' onChange={onChange} />
         <input type='submit'></input>
         </form>)
}

export default FileInput
