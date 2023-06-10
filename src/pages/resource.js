import { motion } from "framer-motion";
import Header from "../component/header";
import { useState,useEffect } from "react";
import supabase from "../config/SupabaseClient";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Skeletontable } from "../component/skeleton";
import ModalUpdateResorce from "../component/ModalUpdateResource";
import ModalDelete from "../component/ModalDelete";

const Resource = () => {
  const [fetchError,setFetchError] = useState(null)
  const [resource,setResource] = useState(null)
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    const fetchResource = async() =>{
      const {data,error} = await supabase
      .from('Resource')
      .select()
      setLoading(true)
      if(error){
        setFetchError("ERROR NIH BOS")
        setResource(null)
        console.log(error)
      }
      if(data){
        setFetchError(null)
        setResource(data)
      }
    }
    fetchResource()
  })

  const [title,setTitle] = useState('')
  const [link,setLink] = useState('')
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const {data,error} = await supabase
    .from('Resource')
    .insert([{title,link}])
    .select()

    if(error){
      console.log(error)
    }
    if(data){
      console.log(data)
      window.location.reload(false)
    }
  }

  return(
    <>
      <Header title="Resource"/>
      <motion.div animate={{y:0}} initial={{y:50}}>
        <Form onSubmit={handleSubmit} className="form-logbook">
            <Row >
              <Col md>
                <Form.Control 
                  placeholder="Title " 
                  type="text" 
                  maxLength={30}
                  id="title" 
                  value={title} 
                  onChange={(e)=>setTitle(e.target.value)}
                  required/>
              </Col>
              <Col md={6} className="my-3 my-md-0">
                <Form.Control 
                  placeholder="Link" 
                  type="url" 
                  value={link} 
                  onChange={(e)=>setLink(e.target.value)}
                  required/>
              </Col>
              <Col md={2}>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        
          <table>
            <thead>
              <tr>
                <th style={{width:'30%'}}>Title</th>
                <th style={{width:'50%'}}>Link</th>
                <th style={{textAlign:"center",width:'20%'}} >Action</th>
              </tr>
            </thead>
            {loading ? resource&&(
            resource.map(resource=>(
            <Table key={resource.id} resource={resource}/>))
            ):<Skeletontable row={5}/>}
            {fetchError&&<p>{fetchError}</p>} 
          </table>
      </motion.div>
    </>
  )
}
 const Table = ({resource})=>{   
    const handleDelete = async()=>{
      const {data,error} = await supabase
      .from('Resource')
      .delete()
      .eq('id',resource.id)
      if(error){
        console.log(error)
      }
      if(data){
        console.log(error)
      }
    }
    return(
      <tbody>
        <tr>
          <td>{resource.title}</td>
          <td  style={{maxWidth:'100px'}}><a style={{overflowWrap:'break-word'}} href={resource.link} target="blank">{resource.link}</a></td>
          <td style={{textAlign:"center"}} className="action">
            <div className="iconEdit">
              <ModalUpdateResorce id = {resource.id}/>
            </div>
            <div className="iconDelete">
              <ModalDelete action={handleDelete}/>
            </div>
          </td>
        </tr>
      </tbody>

  )
}
export default Resource;