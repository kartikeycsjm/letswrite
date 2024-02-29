'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/app/components/Header'
import Post from '@/app/components/Post'
import Footer from '@/app/components/Footer'
import { useEffect } from 'react'
const page = () => {
  const router = useRouter()
  const [loggedin, setLoggedin] = useState(false)
  const [details, setDetails] = useState({})
  const [posts, setPosts] = useState([])
  const [posttext, setPosttext] = useState('')
  useEffect(() => {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    if (email && password) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`api/main?email=${email}&password=${password}`);
          setDetails(res.data.user);
          console.log('main', res.data);
          setPosts(res.data.textpost)
          setLoggedin(true);
        } catch (error) {
          console.error('Error fetching user details:', error);
          // Handle error, e.g., redirect to login
          // router.push('/login');
        }
      };

      fetchData();
    } else {
      router.push('/login');
    }
  }, []);
  const dopost = async () => {
    const res = await axios.post('/api/main', {
      username: details.username,
      post: posttext
    })
    const msg = res.data;
    console.log(msg);
  }
  return (
    <div className='min-h-screen w-full flex justify-start items-center flex-col bg-black text-white'>
      {details && <Header
        username={details.username}
        loggedin={loggedin}
      />}
      <div id="makepost" className='relative top-[8px] w-full h-[50px] flex justify-around items-center'>
        <textarea value={posttext}
          onChange={e => setPosttext(e.target.value)}
          placeholder='letswrite something'
          className='text-black p-3 text-[12px] rounded h-[50px] resize-none w-[80%]' name="" id="" cols="30" rows="10"></textarea>
        <button
          onClick={dopost}
          className='rounded w-[15%] h-[30px] border border-blue-700 flex justify-center items-center'>Post</button>
      </div>
      <div id="posts" className='w-full min-h-screen flex justify-around flex-col items-center'>
        {posts.length > 0 &&
          posts.map((item, index) => (
            <Post key={index} username={item.username}
              posttext={item.post}
              time={item.createdAt}
            />
          ))
        }
      </div>
      <Footer />
    </div>
  )
}
export default page