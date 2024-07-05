import React, { useState } from 'react'
import {HiChevronDoubleLeft} from 'react-icons/hi2'
import {MdHome} from 'react-icons/md'
import {FaSearchengin} from 'react-icons/fa6'
import {motion} from 'framer-motion'
import {Link, Route, Routes} from 'react-router-dom'
import codepen from '../assets/codepenimages.webp'

import {Projects,SignUp, UserProfileDetails} from '../Components'
import {SET_SEARCH_TERM} from '../Context/actions/searchActions'
import { useDispatch, useSelector } from 'react-redux'
const Home = () => {
  const[isSideMenu, setIsSideMenu] = useState(false);
  // const[user,setUser] = useState(null);
  const user = useSelector((state) => state.user?.user);
  const searchTerm = useSelector((state) => state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : "");

  const dispath = useDispatch();
  return (
    <>
    {/* flex for xl screen 40% else take 20% width  */}
      <div className={`w-2 ${isSideMenu ? "w-2" :"flex-[.2] xl:flex-[.2]"} min-h-screen max-h-screen relative
      bg-secondary px-3 py-6 flex flex-col items-center justify-start 
      gap-4 transition-all duration-200 ease-out`} >

        {/* {Anchor button} */}
        
        <motion.div whileTap={{scale:.9}}
        onClick={() =>setIsSideMenu(!isSideMenu)} 
        className='w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg
        absolute -right-6 flex items-center justify-center cursor-pointer'>

          <HiChevronDoubleLeft className='text-white text-xl' />

        </motion.div>
        
        <div className='overflow-hidden w-full flex-col gap-4'>
           {/* Logo */}
          <Link to={'/home'}>
            <img src={codepen} alt='logo' className='object-contain w-72
            h-auto'/>
          </Link>
         {/* start coding */}
          <Link to={'/newProject'}>
            <div className='px-6 mt-3 py-3 rounded-xl border border-gray-400
            flex items-center justify-center cursor-pointer group hover:border-gray-200
            '>
              <p className='text-gray-400 group-hover:text-gray-200 capitalize'>Start Coding</p>
            </div>
          </Link>

          {/* home nav */}

          {
            user && (
              <Link to={"/home/projects"} className="flex items-center 
              justify-center gap-6 mt-3">
                <MdHome className='text-lg text-primaryText' />
                <p className='text-lg text-primaryText'>Home</p>
              </Link>
            ) 
          }
        </div>
       
      </div>
      <div className='flex flex-1 min-h-screen max-h-screen overflow-y-scroll
      h-full flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12'>

        {/* top section */}
        <div className='w-full flex items-center justify-between gap-3 '>
          {/* search */}
          <div className='bg-secondary w-full px-4 py-3 rounded-md flex
          items-center justify-center gap-3'>
            <FaSearchengin className='text-2xl text-primaryText '/>
            <input type='text' className='flex-1 px-4 py-1 text-xl bg-transparent
            outline-none border-none placeholder:text-gray-600 text-white'
            placeholder='Search here...'
            value={searchTerm}
            onChange={(e)=> dispath(SET_SEARCH_TERM(e.currentTarget.value))} />
          </div>
          {/* Profile */}
          {!user && (
            <motion.div whileTap={{scale:0.9}} className='flex items-center justify-center gap-3'>
              <Link to={"/home/auth"} className='bg-emerald-500 px-6 py-2
              rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700'>
                  SignUp
              </Link>
            </motion.div>
          )}

        {/*  */}
          {user && <UserProfileDetails />}
        </div>

        {/* bottom section */}
        <div className='w-full'>
          <Routes>
            <Route path='/*' element={<Projects />} />
            <Route path='/auth' element={<SignUp />}/>
            
          </Routes>
        </div>
      </div>
    </>
  )
}

export default Home