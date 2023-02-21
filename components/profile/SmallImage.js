import { getAuth } from 'firebase/auth';
import Link from 'next/link'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useFetch } from '../useHooks/useFetch';
import { profile2 } from "../assets/svg/socialIcons/profile2";
import Image from 'next/image';

const SmallImage = () => {
    const auth=getAuth();
    const [user,loading]=useAuthState(auth)
    
  const {data}=useFetch('Users');
  const current=data&&data.filter(dt=>dt.id==user.uid)
  
  return (
    <div>
         {/* profileeeeee */}
         <div className="cursor-pointer "><Link href={"/profile"}>
              {current&&current[0]&&current[0].profilePhoto?<Image src={current[0].profilePhoto} className={`w-10 h-10 object-cover rounded-full `} width={100} height={100}/>:profile2}
              </Link>
              </div>
    </div>
  )
}

export default SmallImage