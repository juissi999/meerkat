const sqlite = require('sqlite3').verbose()
const fs = require('fs')
const path = require('path')

const dbdir = path.resolve(__dirname, 'db')
const dbpath = path.join(dbdir, 'meerkat.db')

if (!fs.existsSync(dbdir)) {
  fs.mkdirSync(dbdir)
}

const db = new sqlite.Database(dbpath, (err) => {
  if (err) {
    return console.error(err.message)
  }

  const queries = ['CREATE TABLE IF NOT EXISTS notes(text TEXT, date INT, noteid INT PRIMARY KEY)',
    'CREATE TABLE IF NOT EXISTS files (noteid INT, filename TEXT)']

  for (let i = 0; i < queries.length; i++) {
    db.run(queries[i], (err) => {
      if (err) {
        return console.error(err.message)
      }
    })
  }
})

exports.getAllNotes = (cb) => {
  const allNotes = []

  db.each('SELECT * FROM notes', (err, row) => {
    if (err) {
      return cb(err)
    }
    allNotes.push(row)
  }, () => cb(null, allNotes))
}

exports.getOneNote = (noteid, cb) => {
  const querystr = 'SELECT * FROM notes WHERE noteid=?'
  db.get(querystr, [noteid], (err, row) => {
    if (err) {
      return cb(err)
    }

    // if note does not exist, return empty JSON
    if (row === undefined) {
      return cb(null, {})
    }

    return cb(null, row)
  })
}

exports.postNote = (noteid, notestr, posttime, cb) => {
  const querystr = 'INSERT INTO notes (noteid, text, date) VALUES (?, ?, ?)'
  db.run(querystr, [noteid, notestr, posttime], (err) => {
    if (err) {
      return cb(err)
    }
    cb()
  })
}

exports.deleteNote = (noteid, cb) => {
  const querystr = 'DELETE FROM notes WHERE noteid = ?'
  db.run(querystr, [noteid], (err) => {
    if (err) {
      return cb(err)
    }
    cb()
  })
}

exports.putNote = (noteid, notestr, cb) => {
  const querystr = 'UPDATE notes SET text=? WHERE noteid=?'
  db.run(querystr, [notestr, noteid], (err) => {
    if (err) {
      return cb(err)
    }
    cb()
  })
}

exports.postFile = (noteid, filename, cb) => {
  const querystr = 'INSERT INTO files (noteid, filename) VALUES (?, ?)'
  db.run(querystr, [noteid, filename], (err) => {
    if (err) {
      return cb(err)
    }
    cb()
  })
}

exports.deleteFiles = (noteid, cb) => {
  const querystr = 'DELETE FROM files WHERE noteid = ?'
  db.run(querystr, [noteid], (err) => {
    if (err) {
      return cb(err)
    }
    cb()
  })
}

exports.getAllFiles = (cb) => {
  const allFiles = []

  db.each('SELECT * FROM files', (err, row) => {
    if (err) {
      return cb(err)
    }
    allFiles.push(row)
  }, () => cb(null, allFiles))
}
