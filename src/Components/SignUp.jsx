import React, { useState } from 'react'
import codepen from '../assets/codepenimages.webp'
import { UserAuthInput } from '../Container'
import { FaEnvelope, FaEye, FaGit, FaGithub } from 'react-icons/fa6';
import {FcGoogle } from 'react-icons/fc';
import { MdPassword } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { signINWithGitHub, signINWithGoogle } from '../Utils/helper';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Config/firebase.config';
import {fadeInOut} from '../animation'
const SignUp = () => {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[getEmailValidationStatus,setGetEmailValidationStatus] = useState(false);
  const[isLogin,setIsLogin] = useState(false);
  const[alert,setAlert] = useState(false);
  const[alertMessage,setAlertMessage] = useState("")

  const createNewUser = async ()=>{
    if(getEmailValidationStatus){
      await createUserWithEmailAndPassword(auth,email,password).then(userCred =>{
        if(userCred){
          console.log(userCred);
        }
      }).catch((err)=>console.log(err))
    }
  }

  const loginWithEmailPassword = async() =>{
    if(getEmailValidationStatus){
      await signInWithEmailAndPassword(auth,email,password).then(userCred=>{
        if(userCred){
          console.log(userCred);
        }
      }).catch((err)=>{
        console.log(err.message);
        if(err.message.includes("user-not-found")){
          setAlert(true);
          setAlertMessage("Invaild Id : User not Found")
        }
        else if(err.message.includes("wrong-password")){
          setAlert(true);
          setAlertMessage("Password Mismatch")
        }
        else{
          setAlert(true);
          setAlertMessage("Temprorarily disabled due to many failed login!")
        }
        setInterval(()=>{
          setAlert(false)
        },5000)
      })
    }
  }
  return (
    <div className='w-full py-6 '>
      <img src={codepen} alt='logo' 
      className='object-contain w-32 opacity-50 h-auto'/>
      <div className='w-full flex flex-col items-center justify-center py-8'>
          <p className='text-primaryText py-12 text-2xl'>Join with Us! &#128516;</p>
          <div className='px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8'>
            {/* email */}
            <UserAuthInput 
            label="Email" 
            placeholder="Email" 
            isPass={false} 
            key="Email" 
            setStateFunction={setEmail} 
            Icon={FaEnvelope}
            setGetEmailValidationStatus={setGetEmailValidationStatus} />
            {/* password */}
            <UserAuthInput  
            label="Password" 
            placeholder="Password" 
            isPass={true}
            key="Password" 
            setStateFunction={setPassword} 
            Icon={MdPassword} />
            

            {/* login button */}
            {
              !isLogin ? <motion.div onClick={createNewUser} whileTap={{scale:0.9}} className='flex items-center justify-center gap-3 w-full bg-emerald-500 px-6 py-2
              rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700'>
                <p className='text-white text-xl'>Sign Up</p>
            </motion.div> : 
            <motion.div onClick={loginWithEmailPassword} whileTap={{scale:0.9}} className='flex items-center justify-center gap-3 w-full bg-emerald-500 px-6 py-2
            rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700'>
              <p className='text-white text-xl'>Login</p>
          </motion.div>
            }

            {/* alert section */}
            <AnimatePresence>
              {alert && (
                <motion.p 
                key={"Alert Message"}
                {...fadeInOut}
                className='text-red-500'>{alertMessage}</motion.p>
              ) }
            </AnimatePresence>
            
            {/* account text section */}
            {
              !isLogin ? <p className='text-sm text-primaryText flex items-center justify-center gap-3'>Already have an account?<span onClick={()=>setIsLogin(!isLogin)} className='text-emerald-500 cursor-pointer'>Login here</span></p> :
              <p className='text-sm text-primaryText flex items-center justify-center gap-3'>Doesn't have and account ! <span className='text-emerald-500 cursor-pointer' onClick={()=>setIsLogin(!isLogin)}>Click here</span></p>
            }
            
            
            {/* or section */}
            <div className='flex items-center justify-center gap-12'>
              <div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
              <p className='text-sm text-[rgba(256,256,256,0.2)]'>or</p>
              <div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
            </div>
            {/* signin with google */}

            <motion.div 
            onClick={signINWithGoogle}
            className='flex items-center justify-center
            backdrop-blur-md w-full py-3 gap-3 rounded-xl bg-[rgba(256,256,256,0.2)] hover:bg-[rgba(256,256,256,0.4)] cursor-pointer  ' whileTap={{scale : 0.9}}>

                <FcGoogle className='text-3xl px-0.5' />
                <p className='text-xl text-white'> Sign in with Google</p>
            </motion.div>
            {/* or section */}
            <div className='flex items-center justify-center gap-12'>
              <div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
              <p className='text-sm text-[rgba(256,256,256,0.2)]'>or</p>
              <div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
            </div>
            {/* signin with github */}
            <motion.div
            onClick={signINWithGitHub}
            className='flex items-center justify-center
            backdrop-blur-md w-full py-3 gap-3 rounded-xl bg-[rgba(256,256,256,0.2)] hover:bg-[rgba(256,256,256,0.4)] cursor-pointer  ' whileTap={{scale : 0.9}}>

                <FaGithub className='text-3xl px-0.5 text-white' />
                <p className='text-xl text-white'> Sign in with GitHub</p>
            </motion.div>
          </div>
      </div>
    </div>
  )
}

export default SignUp