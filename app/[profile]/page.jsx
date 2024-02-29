'use client'
import React, { useEffect, useState } from 'react'
import Header from '@/app/components/Header'
import Post from '@/app/components/Post'
import Post2 from '@/app/components/Postreal'
import Footer from '@/app/components/Footer'
import axios from 'axios'
import { useParams } from 'next/navigation'
const page = () => {
    let params = useParams();
    let email = localStorage.getItem('email');
    let password = localStorage.getItem('password');
    const [details, setDetails] = useState({})
    const [posts, setPosts] = useState([])
    const getDetails = async () => {
        const res = await axios.get(`/api/${params.profile}`);
        const det = res.data;
        console.log('met', det);
        setDetails(det.details)
        setPosts(det.posts)
    }
    useEffect(() => {
        getDetails()
    }, [])
    return (

        <div className='min-h-screen w-full flex justify-start items-center flex-col bg-black text-white'>
            <Header
                username={details.username}
            />
            <div id="makepost" className='relative top-[8px] w-full h-[100px] flex justify-around items-center flex-col'>
                {details &&
                    <>
                        <h1>{details.name}</h1>
                        <h2>Email Id: {details.email}</h2>
                        <h2>Phone: {details.phone}</h2>
                    </>
                }
            </div>
            {
                (email === details.email && password === details.password) ? <div id="posts" className='w-full min-h-screen flex justify-around flex-col items-center'>
                    {
                        posts.length > 0 && posts.slice().reverse().map((item, index) => (
                            <Post2 key={index} username={item.username}
                                posttext={item.post}
                                time={item.createdAt}
                                postid={item._id}
                            />
                        ))
                    }
                </div> : <div id="posts" className='w-full min-h-screen flex justify-around flex-col items-center'>
                    {
                        posts.length > 0 && posts.slice().reverse().map((item, index) => (
                            <Post key={index} username={item.username}
                                posttext={item.post}
                                time={'10/10/24 10:10'}
                            />
                        ))
                    }
                </div>
            }
            <Footer />
        </div>
    )
}
export default page