import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

const MPagination = ({
  noteCount,
  startIndex,
  setStartIndex,
  LIMIT,
  totalNoteCount
}) => {
  const updatePagination = async (newStartIndex) => {
    if (newStartIndex < 0) {
      setStartIndex(0)
    } else {
      setStartIndex(newStartIndex)
    }
  }

  return (
    <Pagination className="justify-content-center mt-2">
      <Pagination.Prev
        disabled={startIndex <= 0}
        onClick={() => updatePagination(startIndex - LIMIT)}
      ></Pagination.Prev>
      <Pagination.Item>
        {startIndex + 1}-{startIndex + noteCount}/{totalNoteCount}
      </Pagination.Item>
      <Pagination.Next
        disabled={startIndex + LIMIT >= totalNoteCount}
        onClick={() => updatePagination(startIndex + LIMIT)}
      ></Pagination.Next>
    </Pagination>
  )
}

export default MPagination
