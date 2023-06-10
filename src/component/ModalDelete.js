import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiTrash } from 'react-icons/fi'

function ModalDelete(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow} >
        <FiTrash size={15}/>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Yakin Ingin Dihapus?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={props.action}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;