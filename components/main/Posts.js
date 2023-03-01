
//  setprofile the name of new branch
import {  doc, getFirestore,serverTimestamp,setDoc,updateDoc } from "firebase/firestore";
import React from 'react'
import Image from 'next/image'
import { love } from '../assets/svg/socialIcons/love'
import { loveRed } from '../assets/svg/socialIcons/loveRed'
import { comment } from '../assets/svg/socialIcons/comment'
import { send } from '../assets/svg/socialIcons/send'
import {useDispatch, useSelector} from "react-redux";
import { profile } from '../assets/svg/rigthNavbarIcons/profile'
import Link from "next/link";
import ImageComponent2 from "../img/ImageComponent2";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLikeDetail } from "../useHooks/useLikeDetail";
import { setIsLikeByUser } from "@/redux/reducers/isOpen";
import { set_user_uid } from "@/redux/reducers/profille";

const Posts = ({postData,src,name}) => {
    console.log(postData);
const {subCollectionLikeData}=useLikeDetail('Posts',postData.docId);

// console.log(subCollectionLikeData.isLiked);

const auth=getAuth()
const [user]=useAuthState(auth);


    const like = useSelector((state) => state.open);
    const prof = useSelector((state) => state.profile);

    const dispatch=useDispatch();


    const db = getFirestore(); // initialize Firestore



const likedHandler=async()=>{
    const dbb = getFirestore(); // initialize Firestore


    const docReff = doc(dbb, `Posts/${postData.docId}/LikeDetail`,user.uid);
    // if it is new
    if(postData.isNew){
        await setDoc(docReff,{
            likes: 1,
            isLiked:true,
            userId:user.uid,
        timeStamp:serverTimestamp(),}) 
        // update the isNew
        
  const docRef = doc(dbb, "Posts", postData.docId);
  
  const data1 = {
    isNew:false
  };
  
  updateDoc(docRef, data1)
  .then(docRef => {
      console.log("A New Document Field has been added to an existing document");
  })
  .catch(error => {
      console.log(error);
  })   

    }else{

        await setDoc(docReff,{
            isLiked:subCollectionLikeData.isLiked?false:true,   
            timeStamp:serverTimestamp(),})
    }
 
    
    dispatch(setIsLikeByUser(!like.isLikeByUser))


// update postData
const db = getFirestore(); // initialize Firestore

const docRef = doc(db, "Posts", postData.docId);

const postData1 = {
likes: subCollectionLikeData&&subCollectionLikeData.isLiked?postData.likes-1:postData.likes+1,
};

updateDoc(docRef, postData1)
.then(docRef => {
    // "like is updated";
})
.catch(error => {
    // you can print the error
})
}

// profileHandler
const profileHandler=()=>{

    dispatch(set_user_uid(postData.userUid))
    console.log(prof.user_uid);


}  





  return (
    <div className={`shadow-md ${like.dark?'bg-[#273649] text-[#E7F6F2]':'bg-[#ffffffe8]'}  h-full w-[45%] place-items-center rounded-2xl mx-3`}>
      
{/* card */}
<div className=''>
{/* header of card */}
<div className='flex justify-between  px-8 pt-5 ' > 
    <div className='flex items-center gap-1'>  <div className='cursor-pointer'>
        
           {/* profileeeeee */}
           <Link href={"/publicProfile"}>
             <div className="cursor-pointer relative" onClick={profileHandler}>
              {postData&&postData.profilePhoto?<Image alt="Image" src={`${postData.profilePhoto&&postData.profilePhoto}`} className={`w-10 h-10 object-cover rounded-full `} width={100} height={100}/>:profile}    
              </div>
              </Link>
   
        
        
        </div>  <h1 className='font-bold cursor-pointer'>{name}</h1> </div>

    <h1 className='font-bold cursor-pointer'>...</h1>
    
</div>
{/* the content */}
<div className='px-8 py-5'>
    <p>{postData.text}</p>
</div>
{/*  image */}
<div className="relative w-[full] h-[30rem]">
<ImageComponent2 
        isContain={false}
        layout={true}
        pathImage={`${src}`}
        className={""}
      />
</div>

{/* likes */}
<div className='flex justify-between mx-5 py-5 items-center '>
  
<div>
   {postData&&postData.likes} Likes
</div>
{/* Like comment Send */}
   <div className='flex  gap-5 items-center align-middle justify-center'> <div className="cursor-pointer" onClick={likedHandler} >

    {subCollectionLikeData&&subCollectionLikeData.isLiked?loveRed:love}</div>

    <div className="cursor-pointer">{comment}</div>
    <div className="cursor-pointer">{send}</div>
    </div>

</div>
</div>
</div>
  )
}

export default Posts
