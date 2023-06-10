import { motion } from "framer-motion";
import Header from "../component/header";
import supabase from "../config/SupabaseClient";
import { useState,useEffect } from "react";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Loading from "../component/Loading";
const Todo = () => {  
  const [fetchError,setFetchError] = useState(null)
  const [todoPage,setTodoPage]=useState(null)
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    const fetchTodo = async() =>{
      const {data,error} = await supabase
      .from('ToDoTable')
      .select()
      setLoading(true)
      if(error){
        setFetchError("ERROR BOS")
        console.log(error)
        setTodoPage(null)
      }
      if(data){
        setFetchError(null)
        setTodoPage(data)
      }
    }
    fetchTodo()
  })
  const [Todo,setTodo] = useState('')
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const {data,error} = await supabase
    .from('ToDoTable')
    .insert([{Todo}])
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
    <div>
      <Header title="Todo"/>
      <motion.div animate={{y:0}} initial={{y:50}}>
        <Form onSubmit={handleSubmit} >
          <InputGroup className="mb-3 form-todo">
            <Form.Control
              placeholder="To do"
              aria-label="To do"
              aria-describedby="basic-addon2"
              type="text" 
              id="todo" 
              value={Todo} 
              onChange={(e)=>setTodo(e.target.value)}
              required
            />
            <Button variant="primary" id="button-addon2" type="submit">
              Submit
            </Button>
          </InputGroup>
        </Form>
        <div className="content-outlet">
          <div className="todo-container">
            <div className="todos">
              {fetchError&&(<p>ERROR BOS</p>)}
              {loading ? todoPage && (
                todoPage.map(todo=>(
                  <LayoutTodo key={todo.id} todo={todo}/>))
              ):<Loading/>}
            </div>
          </div>
        </div>
      </motion.div> 
    </div>
  )
}
const LayoutTodo=({todo})=>{
  const handleDelete = async()=>{
    const {data,error} = await supabase
    .from('ToDoTable')
    .delete()
    .eq('id',todo.id)
    if(error){
      console.log(error)
    }
    if(data){
      console.log(error)
    }
  }
  return(
    <div>
      <div className="todo">
        {todo.Todo}
        <BsFillCheckCircleFill onClick={handleDelete} size={25} className="iconTodo"/>
      </div>
    </div>
        

  )
}
export default Todo;