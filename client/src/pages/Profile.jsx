import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { 
  deleteUserFailure, deleteUserStart, deleteUserSuccess,
   updateUserFailure, updateUserStart, updateUserSuccess,
  signOutStart,signOutSuccess,signOutFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [file, setFile] = useState(null);
  const [filePer, setFilePer] = useState(0);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const fileRef = useRef(null);
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed',
      (snapshot) => {
        const process = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePer(Math.round(process));
      },
      (error) => {
        setFileUploadErr(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL })
        })
      });
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleDeleteUser =async() =>{
   try {
    dispatch(deleteUserStart());
    const res = await fetch(`http://localhost:3000/api/user/delete/${currentUser._id}`,{
      method:'DELETE',
      credentials: "include" 
    })
    const data = res.json();
    if(data.success === false){
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data))
   } catch (error) {
    dispatch(deleteUserFailure(error.message))
   }
  }

  const handleSignout =async() =>{
    try {
     dispatch(signOutStart());
     const res = await fetch('http://localhost:3000/api/auth/signout',{
       method:'GET',
       'credentials':'include'
     })
     const data = res.json();
     if(data.success === false){
      dispatch(signOutFailure(data.message));
       return;
     }
     dispatch(signOutSuccess(data))
    } catch (error) {
     dispatch(signOutFailure(error.message))
    }
   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e) => setFile(e.target.files[0])} />

          <img src={formData.avatar || currentUser.avatar} alt='profile' onClick={() => fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />

          {fileUploadErr ? (
            <span className='text-red-700'>Error on image upload</span>
          ) : filePer > 0 && filePer < 100 ? (
            <span className='text-slate-700'>`uploading ${filePer}% ...` </span>
          ) : filePer === 100 ? (
            <span className='text-green-700'>Image uploaded successfully </span>
          ) : ""}

          <input type='text' placeholder='username' className='border p-3 rounded-lg' id="username" onChange={handleChange} defaultValue={currentUser.username} />

          <input type='text' placeholder='email' className='border p-3 rounded-lg' id='email' defaultValue={currentUser.email} onChange={handleChange} />

          <input type='password' placeholder="Password" className=' border p-3 rounded-lg' id='password' onChange={handleChange} />
          
          <button className='bg-slate-700 text-while rounded-lg disabled:opacity-80 p-3 uppercase' disabled={loading}>
          {loading? "loading....":"update"}
          </button>
          <Link to='/create-listing' className='bg-green-700 text-white uppercase p-3 rounded-lg text-center hover:opacity-80'>create listing</Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handleDeleteUser}>Delete Acount</span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignout}>Sign out</span>
      </div>
      <p className='text-red-700 mt-4'>{error?error:""}</p>
      <p className='text-green-700 mt-4'>{updateSuccess?"user updated success":""}</p>
    </div>
  )
}
