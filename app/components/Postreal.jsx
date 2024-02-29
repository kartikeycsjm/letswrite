'use client'
import axios from 'axios'
import React, { useState } from 'react'
const Post = ({username,posttext,time,postid}) => {
  const [delstate,setDelstate]=useState('')
  const del=async()=>{
    try {
      const res=await axios.delete(`/api/main?id=${postid}`)
      const d=res.data.msg;
      setDelstate(d)
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  }
  return (
    <div className='my-5 w-[80%] border min-h-[100px] bg-pink-400 text-black flex flex-col justify-between items-center'>
        <h3 className='p-1 text-[20px]'>{username}</h3>
        <p className='p-2 text-[12px]'>{posttext}</p>
        <p className='text-[9px] p-1'>{time}</p>
        <button onClick={del}>{delstate?'deleted':'delete'}</button>
    </div>
  )
}
export default Post 