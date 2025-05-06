import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const Viewpastes = () => {

  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return <div>Paste not found</div>;
  }

  const copyContent = () => {
    navigator.clipboard.writeText(paste.content);
    toast.success("Copied Successfully");
  };

  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between items-center'>
        <input 
          className='p-3 rounded-2xl mt-2 w-[66%] pl-4'
          type="text"
          placeholder='Enter Your Title Here' 
          value={paste.title}
          disabled
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={copyContent}
        >
          Copy
        </button>
      </div>
      <div>
        <textarea 
          className='rounded-xl mt-4 min-w-[500px] p-4'
          value={paste.content}
          placeholder="Write Your Thought Or Code Here..."
          disabled
          rows={20}
        />
      </div>
    </div>
  )
}

export default Viewpastes
