const findHashtags = (notestr) => {
  let hashtags = [];

  // remove all control characters (line endings etc)
  notestr = notestr.replace(/[^\x20-\x7E]/gmi, " ")

  notestr.split(" ").map((element) => {
     if (element[0] == "#" && element.length > 1) {
        // trim all whitespaces and newlines from the hashtag string
        const trimmed_el = element.trim()

        // if hashtag not present yet, add it
        if (hashtags.indexOf(trimmed_el) < 0) {
           hashtags.push(trimmed_el)
        }
     }
  })

  return hashtags
}

const updateHashtags = (data, setHashtags) => {
  const htarray = data.reduce((accumulator, currentdata) => {
    const ht = findHashtags(currentdata.text)
    const htmap = ht.map((h) => {
      return {name:h, linksto:currentdata.noteid} // [{name:'test', selected:true}]
    })

    return accumulator.concat(htmap)
  }, [])

  setHashtags(htarray)
}

export {updateHashtags}