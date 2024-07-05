import {GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithRedirect} from "firebase/auth"
import {auth} from '../Config/firebase.config'
import { v4 as uuidv4 } from 'uuid';
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider()
export const signINWithGoogle = async () =>{
    await signInWithPopup(auth, googleProvider).then(userCred=>{
        window.location.reload();
    });
}


export const signINWithGitHub = async () =>{
    await signInWithPopup(auth, githubProvider).then(userCred=>{
        window.location.reload();
    });
}
// firebase store provides onAuth STATE CHANGE which is listner event
// which listens to state management session token state 

export const Menus = [
    {id:uuidv4(),name:"Projects" , uri : "/home/projects"},
    {id:uuidv4(),name:"Collections" , uri : "/home/collections"},
    {id:uuidv4(),name:"Profile" , uri : "/home/profile"},
]

export const signOutAction = async()=>{

    await auth.signOut().then(()=>
    window.location.reload())
}