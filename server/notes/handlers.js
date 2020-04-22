const dbservice = require('../dbservice')

exports.getAll = (request, response) => {
  dbservice.getAllNotes((err, notes) => {
    if (err) {
      return console.log(err)
    }
    response.json(notes) 
    })
}

exports.post = (request, response) => {
  const posttime = Date.now()
  const noteid = Math.floor(Math.random()*1000000000);
  const note = {text:request.body.text, noteid:noteid, date:posttime}

  if (!note.text) {
    return response.status(400).json({
      error: 'content missing' 
    })
  }

  dbservice.postNote(noteid, note.text, posttime, (err) =>{
    if (err) {
      response.status(409).end()
      return console.log(err)
    }
    response.json(note)
  })
}

exports.delete = (request, response) => {
  const id = Number(request.params.id)

  dbservice.deleteNote(id, (err) => {
    if (err) {
      response.status(409).end()
      return console.log(err)
    }
    // after note deleted, delete all linked files
    dbservice.deleteFiles(id, (err)=>{
      if (err) {
        response.status(409).end()
        return console.log(err)
      }
      // note and possible files deleted, all ok
      response.status(204).end()
    })
  })
}

exports.put = (request, response) => {
  const id = Number(request.params.id)
  const notestr = request.body.text
  //const posttime = Date.now()

  dbservice.putNote(id, notestr, (err) =>{
    if (err) {
      response.status(409).end()
      return console.log(err)
    }
    response.status(200).end()
  })
}
