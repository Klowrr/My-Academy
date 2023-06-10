import { motion } from "framer-motion";
import supabase from "../config/SupabaseClient";
import { useState,useEffect } from "react";
import Header from "../component/header";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Skeletontable } from "../component/skeleton";
import ModalUpdateLogBook from "../component/ModalUpdateLogBook";
import ModalDelete from "../component/ModalDelete";
const Logbook = () => {

  //Mengambil Data
  const [fetchError,setFetchError] = useState(null)
  const [logBook,setLogBook] = useState(null)
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    const fetchLogBook = async() =>{
      const {data,error} = await supabase
      .from('logBook')
      .select()
      setLoading(true)
      if(error){
        setFetchError("ERROR NIH BOS")
        setLogBook(null)
        console.log(error)
      }
      if(data){
        setFetchError(null)
        setLogBook(data)
      }
    }
    fetchLogBook()
  })

  const [title,setTitle] = useState('')
  const [description,setDesription] = useState('')
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const {data,error} = await supabase
    .from('logBook')
    .insert([{title,description}])
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
      <div>
        <Header title="Log Book"/>
        <motion.div animate={{y:0}} initial={{y:50}} >
          <Form onSubmit={handleSubmit} className="form-logbook">
            <Row >
              <Col md>
                <Form.Control 
                  placeholder="Title " 
                  type="text" 
                  id="title" 
                  value={title} 
                  onChange={(e)=>setTitle(e.target.value)}
                  required/>
              </Col>
              <Col md={6} className="my-3 my-md-0">
                <Form.Control 
                  placeholder="Description" 
                  type="text" 
                  maxLength={20}
                  value={description} 
                  onChange={(e)=>setDesription(e.target.value)}
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
                <th style={{width:'50%'}}>Description</th>
                <th style={{textAlign:"center",width:'20%'}} >Action</th>
              </tr>
            </thead>
            {loading ? logBook&&(
            logBook.map(logBook=>(
            <Table key={logBook.id} logBook={logBook}/>))
            ):<Skeletontable row={5}/>}
            {fetchError&&<p>{fetchError}</p>} 
          </table>
        </motion.div>
        
      </div>
    </>
    
    )
  }

  //Template Table
  const Table = ({logBook})=>{   

    //Delete Data
    const handleDelete = async()=>{
      const {data,error} = await supabase
      .from('logBook')
      .delete()
      .eq('id',logBook.id)
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
          <td>{logBook.title}</td>
          <td style={{maxWidth:'200px',overflowWrap:'break-word'}}>{logBook.description}</td>
          <td style={{textAlign:"center",alignItems:'center'}} className="action">
            <div className="iconEdit">
              <ModalUpdateLogBook id={logBook.id}/>
            </div>
            <div className="iconDelete">
              <ModalDelete action={handleDelete}/>
            </div>
          </td>
        </tr>
      </tbody>

  )
}
export default Logbook;