import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function DeleteModal({ onDeleteConfirmed, setShow }) {
  const handleClose = () => setShow(false)

  const handleCommit = async () => {
    handleClose()
    await onDeleteConfirmed()
  }

  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete note</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete Note?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={handleCommit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteModal
