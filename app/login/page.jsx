'use client'
import React, { useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
const page = () => {
    const router = useRouter()
    let [id,setId]=useState();
    const [email, setemail] = useState('')
    const [msg, setmsg] = useState('')
    const [password, setpassword] = useState('')
    const login = async () => {
        const res = await axios.post('/api/login', {
            email, password
        })
        const d = res.data;
        console.log(d.status);
        setmsg(d.status)
        setId(d.user._id)
        localStorage.setItem('email',email)
        localStorage.setItem('password',password)
        if (d.status === 'Login successful') {
            router.push(`/`);
        }
    }
    useEffect(() => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        if (email && password) {
          router.push('/');
        }
      }, []);
    return (
        <div className='w-full h-screen flex justify-center items-center flex-col'>
            Let's Login
            <div className='w-[400px] h-[320px] rounded-lg bg-red-400 flex justify-around items-center
            flex-col'>
                <div className='w-[300px] h-[200px] border bg-red-400 flex justify-around items-center
        flex-col'>
                    <input type='text'
                    placeholder='email'
                        value={email}
                        onChange={(e => setemail(e.target.value))}
                        className='w-[250px] h-[45px] rounded p-4' />
                    <input
                        type="password"
                        placeholder='password'
                        value={password}
                        onChange={e => setpassword(e.target.value)}
                        className='w-[250px] h-[45px] rounded p-4' />
                    <button onClick={login} className='w-[250px] h-[45px] rounded bg-blue-600'>Login</button>
                    <p>{msg}</p>
                </div>
                <button className='underline text-blue-800'>forgot password</button>
                <Link className='underline text-blue-800' href={'/register'}>register yourself</Link>
            </div>
        </div>
    )
}
export default page;