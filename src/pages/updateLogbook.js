import { useParams,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import supabase from "../config/SupabaseClient";

const UpdateLogBook = () => {
  
  const {id} = useParams()
  const navigate = useNavigate()
    
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [formError,setFormError] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault()
    const {data,error} = await supabase
    .from('logBook')
    .update({title,description})
    .select()
    .eq('id',id)

    if(error){
      console.log(error)
      setFormError("ERROR")
    }
    if (data){
      console.log(data)
      setFormError(null)
      navigate('/LogBook')
    }
  }
  useEffect(()=>{
    const fetchLogbook = async () => {
      const {data,error} = await supabase
       .from('logBook')
       .select()
       .eq('id',id)
       .single()
      
      if(error){
        navigate('/',{replace:true})
      }
      if(data){
        setTitle(data.title)
        setDescription(data.description)
        console.log(data)
      }
    }
    fetchLogbook()
  },[id,navigate])


  return(
    <div className="content form-update">
      <h1>Update - {id}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title : </label>
        <input 
        type="text" 
        id="title" 
        value={title} 
        onChange={(e)=>setTitle(e.target.value)}/>

        <label htmlFor="link">Description : </label>
        <input 
        type="text" 
        id="link" 
        value={description} 
        onChange={(e)=>setDescription(e.target.value)}/>
        <button>Update</button>
        {formError && <p>{formError}</p>}
      </form>
    </div>
  )
}
export default UpdateLogBook;