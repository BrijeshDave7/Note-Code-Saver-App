import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {

  const[title,setTitle]=useState("");
  const[value,setValue]=useState(""); 
  const[searchParams,setSearchParams]= useSearchParams();
  const pasteId=searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPaste =useSelector((state)=>state.paste.pastes)

  useEffect(()=>{
      if(pasteId){
        const paste =allPaste.find((p)=>p._id === pasteId);
        if(paste){
          setTitle(paste.title);
          setValue(paste.content);
        }
      } else {
        setTitle("");
        setValue("");
      }
  },[pasteId, allPaste])

  function createPaste(){
      const paste={
          title:title,
          content:value,
          _id:pasteId ||
          Date.now().toString(36),
          createdAt:new Date().toISOString(),

      }

      if(pasteId){
        //update
          dispatch(updateToPastes(paste));
       
      }
      else{
        //create
          dispatch(addToPastes(paste));
         
      }
      //after creation and updation
      setSearchParams({});
  }
  return (
   <div>
   <div className='flex flex-row gap-7 place-content-between'>
      <input 
      className='p-3 rounded-2xl mt-2 w-[66%] pl-4 border-2 border-[#e6e6ff] text-[#000066] bg-[#e6e6ff]'
      type="text"
      placeholder='Enter Your Title Here' 
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />
      <button className='rounded-2xl w-[40%] bg-[#e6e6ff] text-[#000066] hover:bg-[#ccccff] transition-colors duration-300'  onClick={createPaste}>
       {
        pasteId ? "Update Note" : "Create New Note" 
       }
      </button>
      
    </div>
    <div>
    <textarea 
      className='rounded-xl mt-4 min-w-[500px] p-4 border-2 border-[#e6e6ff] text-[#000066] bg-[#e6e6ff]'
      value={value}
      placeholder="Write Your Thought Or Code Here..."
      onChange={(e)=>setValue(e.target.value)}
      rows={20}
    />
  </div>
  </div>
  )
}

export default Home
