
import './App.css'
import {BrowserRouter,Routes,Route, Navigate, useNavigate} from 'react-router-dom'
import {Home, NewProject, Spinner} from './Components'
import { useEffect, useState } from 'react'
import { auth } from './Config/firebase.config'
import { QueryStartAtConstraint, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { db } from './Config/firebase.config'
import {useDispatch} from 'react-redux'
import {SET_USER} from './Context/actions/userActions' 
import {SET_PROJECTS} from './Context/actions/projectActions'
function App() {
  const navigate = useNavigate();
  const[isLoading , setIsLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(userCred=>{
      if(userCred){
        console.log(userCred?.providerData[0]);
        setDoc(doc(db,"users",userCred?.uid),userCred?.providerData[0]).
        then(()=>{
          //dipatch to store
          dispatch(SET_USER(userCred?.providerData[0]))
          navigate("/home/projects" , {replace :true})
        })
      }
      else{
        navigate("/home/auth", {replace:true})
      }

      setInterval(()=>{
        setIsLoading(false)
      },2000)
    });

    return () => unsubscribe();
  },[])


  useEffect(()=>{
    const projectQurey = query(
      collection(db,"Projects"),
      orderBy("id","desc")
    )

    const unsubscribe = onSnapshot(projectQurey,
      (querySnaps) => {
        const projectsList = querySnaps.docs.map(doc =>doc.data())

          dispatch(SET_PROJECTS(projectsList))
      })

      return unsubscribe;
  },[])
  return (
    <>
      {
        isLoading ? 
        <div className='w-screen h-screen flex items-center justify-center
        overflow-hidden'>
          <Spinner />
        </div>
        :
        <div className='w-screen h-screen flex items-start justify-start overflow-hidden'>
        <Routes>
          <Route path='/home/*' element={<Home />} />
          <Route path='/newProject' element={<NewProject />} />
          
          {/* {if the route is not matching then naviagte the user tho the /home 
          which is the default page} */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
      }
    </>
  )
}

export default App
