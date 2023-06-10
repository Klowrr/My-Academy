import {Button,Modal,Form} from 'react-bootstrap';
import { useState,useEffect } from "react";
import { FiEdit } from 'react-icons/fi'
import supabase from '../config/SupabaseClient';

function ModalUpdateLogBook(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [formError,setFormError] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault()
    const {data,error} = await supabase
    .from('logBook')
    .update({title,description})
    .select()
    .eq('id',props.id)

    if(error){
      console.log(error)
      setFormError("ERROR")
      setShow(false)
    }
    if (data){
      console.log(data)
      setFormError(null)
      setShow(false)
    }
  }
  useEffect(()=>{
    const fetchLogbook = async () => {
      const {data,error} = await supabase
       .from('logBook')
       .select()
       .eq('id',props.id)
       .single()
      
      if(error){
        // navigate('/',{replace:true})
        console.log("ERROR")
        setShow(false)
      }
      if(data){
        setTitle(data.title)
        setDescription(data.description)
        console.log(data)
        setShow(false)
      }
    }
    fetchLogbook()
  },[props.id])


  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        <FiEdit size={15}/>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h2>Update</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title :</Form.Label>
              <Form.Control 
              type="text" 
              value={title} 
              onChange={(e)=>setTitle(e.target.value)}
              required/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description :</Form.Label>
              <Form.Control 
                placeholder="Description" 
                type="text" 
                value={description} 
                onChange={(e)=>setDescription(e.target.value)}
                required/>
            </Form.Group>
          </Form>
          {formError && <p>{formError}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateLogBook;