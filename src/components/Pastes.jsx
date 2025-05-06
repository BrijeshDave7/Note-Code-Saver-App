import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFrompastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Pastes = () => {
  const pastes = useSelector((state)=>state.paste.pastes)
  const[searchTerm,setSearchTerm]=useState('');
  const dispatch =useDispatch();
  // Sort pastes by createdAt descending (latest first)
  const sortedPastes = [...pastes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const filterData = sortedPastes.filter((paste)=>paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function handelDelete(pasteId){
      dispatch(removeFrompastes(pasteId));
  } 

  const buttonClass = "bg-[#e6e6ff] text-[#000066] px-4 py-2 rounded hover:bg-[#ccccff] transition-colors duration-300";

  return (
    <div>
      <div>
        <input 
          className='p-2 border-2 rounded-2xl min-w-[600px] mt-2 border-[#e6e6ff] text-[#000066] bg-[#e6e6ff]'
          type="text" 
          placeholder='Search Here'
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}/>
      </div>
      <div className='flex flex-col gap-5'>
        {
          filterData.length>0 &&
          filterData.map(
            (paste, index)=>{
              const formattedDate = new Date(paste.createdAt).toLocaleString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              });
              return (
                <div  className='border-2 mt-2 rounded-2xl border-[#e6e6ff]' key={paste._id}>
                  <div>
                    {paste.title}
                  </div>
                  <div className='overflow-hidden text-ellipsis max-h-[4.5em]'>
                    {paste.content}
                  </div>
                  <div className='flex flex-row  gap-4 place-content-evenly mt-2'>
                  <a href={`/?pasteId=${paste._id}`}>
                      <button className={buttonClass}>
                               Edit
                        </button>
                          </a>
                    <button className={buttonClass}>
                      <a   className="!text-[#000066] no-underline" href={`/pastes/${paste._id}`}>
                        View
                      </a>
                    </button>
                    <button className={buttonClass}  
                    onClick={()=> handelDelete(paste._id)}>
                      Delete
                    </button>
                    <button className={buttonClass} onClick={() => {
                      navigator.clipboard.writeText(paste.content)
                      toast.success("Copied Successfully")
                    }}>
                      Copy
                    </button>
                    <button className={buttonClass} onClick={() => {
                         if (navigator.share) {
                                   navigator.share({
                                    title: 'Check out this paste!',
                                    text: paste.content,
                         url: window.location.href, // or a specific link to the paste
                               }).then(() => {
      toast.success('Shared successfully!');
                          }).catch((error) => {
                         toast.error('Error sharing: ' + error.message);
                           });
                         } else {
                        toast.error('Sharing not supported on this browser.');
                         }
                      }}>
                         Share
                      </button>
                  </div>
                  <div>
                    {formattedDate}
                  </div>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default Pastes
