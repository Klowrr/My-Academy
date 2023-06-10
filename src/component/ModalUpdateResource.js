import {Button,Modal,Form} from 'react-bootstrap';
import { useState,useEffect } from "react";
import { FiEdit } from 'react-icons/fi'
import supabase from '../config/SupabaseClient';

function ModalUpdateResorce(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
  const [title,setTitle] = useState('')
  const [link,setLink] = useState('')
  const [formError,setFormError] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault()
    const {data,error} = await supabase
    .from('Resource')
    .update({title,link})
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
    const fetchResource = async () => {
      const {data,error} = await supabase
       .from('Resource')
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
        setLink(data.link)
        console.log(data)
        setShow(false)
      }
    }
    fetchResource()
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
              <Form.Label>Link :</Form.Label>
              <Form.Control 
                type="text" 
                value={link} 
                onChange={(e)=>setLink(e.target.value)}
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

export default ModalUpdateResorce;