import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes:localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes"))
  :[]
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const newPaste = action.payload;
  
      // Check for duplicate title (case-insensitive)
      const isDuplicate = state.pastes.some(
          paste => paste.title.toLowerCase() === newPaste.title.toLowerCase()
      );
  
      if (isDuplicate) {
          // Show both alert and toast warning
          alert("A paste with this title already exists!");
          toast.warning("Duplicate title detected!");
          return; // Don't add the paste
      }
  
      // If no duplicate, add the paste
      state.pastes.push(newPaste);
  
      // Save to localStorage
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
  
      // Show success message
      toast.success("Created Successfully");
  }
  ,
  
    updateToPastes: (state,action) => {
      const paste =action.payload;
      const index =state.pastes.findIndex((item)=>
      item._id===paste._id);
      if(index >= 0){
        state.pastes[index]=paste;

        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Note Updated");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes=[];
      localStorage.removeItem("pastes");
     
    },
    removeFrompastes:(state, action)=>{
      const pasteId=action.payload;

      console.log(pasteId);
      const index=state.pastes.findIndex((item)=>
      item._id === pasteId);
      if(index>=0) {
        state.pastes.splice(index,1);

        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Note Removed");
      
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes,updateToPastes , resetAllPastes, removeFrompastes} = pasteSlice.actions

export default pasteSlice.reducer
