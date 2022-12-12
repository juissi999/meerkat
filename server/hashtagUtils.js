const findHashtagsFromString = (notestr) => {
  const hashtags = []

  // remove all control characters (line endings etc)
  notestr = notestr.replace(/[^\x20-\x7E]/gim, ' ')

  notestr.split(' ').map((element) => {
    if (element[0] === '#' && element.length > 1) {
      // trim all whitespaces and newlines from the hashtag string
      const trimmedEl = element.trim()

      // if hashtag not present yet, add it
      if (hashtags.indexOf(trimmedEl) < 0) {
        hashtags.push(trimmedEl)
      }
    }
  })

  return hashtags
}

const getAllHashtags = (dataArray) => {
  const htarray = dataArray.reduce((accumulator, currentdata) => {
    const ht = findHashtagsFromString(currentdata.text)
    const htmap = ht.map((h) => {
      return { name: h, linksto: currentdata.noteid } // [{name:'test', selected:true}]
    })

    return accumulator.concat(htmap)
  }, [])

  const hashtags = htarray.map((ht) => {
    return { name: ht.name }
  })

  return hashtags
}

module.exports = { getAllHashtags }
