'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const Header = ({ username, loggedin }) => {
    const [search, setSearch] = useState('')
    const router = useRouter()
    const logout = () => {
        localStorage.removeItem('email')
        localStorage.removeItem('password')
        router.push('/login')
    }
    return (
        <div className='bg-blue-600 w-full h-[100px] flex justify-around items-center flex-col'>
            {username}
            <div className='w-full flex justify-between items-center'>
                <div id="search" className='w-[60%] rounded-lg h-[40px] border bg-white flex'>
                    <input type="text"
                        className='p-2 w-[80%] h-[30px] text-black rounded'
                        placeholder='search'
                        value={search}
                        onChange={e => setSearch(e.target.value)} />
                    <button onClick={() => router.push(`/${search}`)}
                        className='w-[20%] border border-blue-800 rounded text-black'
                    >search</button>
                </div>
                <div id="links" className='w-[40%] h-6 flex justify-around items-center'>
                    <Link href={'/'} className='text-black bg-blue-200 px-[5px] py-[1px] text-[12px] rounded'>
                        Feed
                    </Link>
                    <Link href={`/${username}`} className='text-black bg-blue-200 px-[5px] py-[1px] text-[12px] rounded'>
                        Profile
                    </Link>
                    {loggedin && <button onClick={logout}>logout</button>}
                </div>
            </div>

        </div>
    )
}

export default Header