import Head from "next/head";
import Image from "next/image";
import { Poppins } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import {useSelector} from "react-redux";
import Homee from "@/components/main/Homee";
import { db, initFirebase } from "@/firebase/FirebaseApp";
import PostPopUp from "@/components/popup/PostPopUp";
import SignUp from "@/components/form/SignUp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from 'react-firebase-hooks/firestore';

import { getAuth } from "firebase/auth";
import {Index}from './profile'
import { useMode } from "@/components/useHooks/useMode";
const poppins = Poppins({ subsets: ["latin"],weight: ['400','700'] });

export default function Home() {
  
  // const mode = useSelector((state) => state.open);
  const {mode}=useMode();
  const auth = getAuth();

const app=initFirebase();
const [user]=useAuthState(auth)

// const [userDoc, loading, error] = useDocument(user && db.collection('ProfileInfo').doc(user.uid));

  return (
    <div className="flex flex-col items-center">
  <div>
  <Head>
        <title >Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={` ${mode?'bg-[#1b2430] text-[#E7F6F2]':'bg-[#EBEBEB]'} mx-auto flex items-center justify-center  `}>





<Homee/>


<div className="fixed   top-1/2">
</div>
      </div>
 </div> 

   
    
    </div>
  );
}
