import React from 'react'
const Post = ({username,posttext,time}) => {
  return (
    <div className='my-5 w-[80%] border min-h-[100px] bg-slate-600 flex flex-col justify-between items-center'>
        <h3 className='p-1 text-[20px]'>{username}</h3>
        <p className='p-2 text-[12px]'>{posttext}</p>
        <p className='text-[9px] p-1'>{time}</p>
    </div>
  )
}
export default Post 