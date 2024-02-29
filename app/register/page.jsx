'use client'
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
const page = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [phone, setphone] = useState('')
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [msg, setmsg] = useState('')
    const register = async () => {
        const res = await axios.post('/api/register', {
            name, email, phone, username, password
        })
        const d = res.data;
        console.log(d);
        setmsg(d)
    }
    return (
        <div className='w-full h-screen flex justify-center items-center flex-col'>
            <h1>Let's Register</h1>
            <div className='w-[400px] h-[500px] rounded-lg bg-red-400 flex justify-around items-center
            flex-col'>
                <div className='w-[300px] h-[420px] border bg-red-400 flex justify-around items-center
        flex-col'>
                    <input
                        value={name} onChange={e => setname(e.target.value)}
                        placeholder='name' type="text" className='w-[250px] h-[45px] rounded p-4' />
                    <input
                        value={email} onChange={e => setemail(e.target.value)}
                        placeholder='email' type="text" className='w-[250px] h-[45px] rounded p-4' />
                    <input
                        value={phone} onChange={e => setphone(e.target.value)}
                        placeholder='phone' type="text" className='w-[250px] h-[45px] rounded p-4' />
                    <input
                        value={username} onChange={e => setusername(e.target.value)}
                        placeholder='username' type="text" className='w-[250px] h-[45px] rounded p-4' />
                    <input
                        value={password} onChange={e => setpassword(e.target.value)}
                        placeholder='password' type="password" className='w-[250px] h-[45px] rounded p-4' />
                    <button onClick={register} className='w-[250px] h-[45px] rounded bg-blue-600'>Register</button>
                    <p>{msg}</p>
                </div>
                <Link href={'/login'} className='underline text-blue-800'>Go to Login Page</Link>
            </div>
        </div>
    )
}
export default page