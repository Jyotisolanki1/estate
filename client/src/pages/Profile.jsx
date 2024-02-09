import React, { useState,useEffect } from 'react';
import  {useSelector} from 'react-redux';
import { useRef } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const [ file , setFile] = useState(null);
  const [filePer, setFilePer] = useState(0);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});

  const fileRef = useRef(null);
  const {currentUser} = useSelector((state) =>state.user);


useEffect(()=>{
  if(file){
  handleFileUpload(file)
  }
},[file]);


const handleFileUpload =(file) =>{
  const storage = getStorage(app);
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage,fileName);
  const uploadTask = uploadBytesResumable(storageRef,file);


  uploadTask.on('state_changed',
  (snapshot)=>{
   const process = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
   setFilePer(Math.round(process));
  },
  (error)=>{
    setFileUploadErr(error)
  },
  ()=>{
   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
    setFormData({...formData,avatar: downloadURL})
   })
  });
}
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
      <input type='file'  ref={fileRef} hidden accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
         <img src={formData.avatar || currentUser.avatar} alt='profile' onClick={()=>fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
         {fileUploadErr?(
          <span className='text-red-700'>Error on image upload</span>
          ):filePer>0 && filePer <100 ? (
            <span className='text-slate-700'>`uploading ${filePer}% ...` </span>
          ):filePer === 100?(
            <span className='text-green-700'>Image uploaded successfully </span>
          ):""}
         <input type='text' placeholder='username' className='border p-3 rounded-lg' id="username"/>
         <input type='text' placeholder='email' className='border p-3 rounded-lg' id='email'/>
         <input type='password' placeholder="Password" className=' border p-3 rounded-lg' id='password'/>
         <button className='bg-slate-700 text-while rounded-lg disabled:opacity-80 p-3 uppercase'>Update</button>  
        </form>
        <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Acount</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
        </div>
    </div>
  )
}
