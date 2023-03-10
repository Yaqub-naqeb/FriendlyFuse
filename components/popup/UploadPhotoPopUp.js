import React, { useEffect, useState } from 'react'
import { doc} from "firebase/firestore"; 
import { db, storage } from '@/firebase/FirebaseApp';
import { useSelector,useDispatch } from 'react-redux';
import { setEditPopup, setPostPopUp, setUploadProfilePhoto } from '@/redux/reducers/isOpen';
import { close } from '../assets/svg/close/close';
import {  ref, uploadBytesResumable, getDownloadURL, listAll, uploadBytes } from "firebase/storage";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { uuid } from 'uuidv4';
import { getFirestore, updateDoc } from "firebase/firestore";
import { useFetch } from '../useHooks/useFetch';
import { set_Profile_Photo } from '@/redux/reducers/profille';
import { collection, getDocs, query, where } from "firebase/firestore";
import {useServerRendering} from '../useHooks/useServerRendering'
const UploadPhotoPopUp = () => {


    const PopUp = useSelector((state) => state.open);
    const photoUrl=useSelector((state) => state.profile);
    console.log(photoUrl);

const dispatch=useDispatch();
const auth=getAuth();
const [user,loading]=useAuthState(auth)
const [photo,setPhoto]=useState(null);
const [bgphoto,setBgPhoto]=useState(null);
const {data}=useFetch('Users')
const [docId,setDocId]=useState();

useEffect(()=>{
  const rendering=async()=>{  const q = query(collection(db, "Users"), where("id", "==", user.uid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    setDocId(doc.id, " => ", doc.data())
    console.log(doc.data());
  });}

  rendering();

},[photoUrl&&photoUrl.photoUrl])

// Your Firebase SDK Initialization code here
const submitHandler =(e)=>{
  e.preventDefault();
  const db = getFirestore(); // initialize Firestore


const code=uuid();
// console.log(photo.name);
if(photo){
  const imageRef = ref(storage,`images/${photo.name+code}`);

  uploadBytes(imageRef, photo).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => {
  const docRef = doc(db, "Users",docId);
  // update the Profile image
  const data1 = {
  profilePhoto:url,
  };
  updateDoc(docRef, data1)
  .then(docRef => {
    alert("profile picture successfully changed");
  })
  .catch(error => {
    console.log(error);
  })
    });
  });
  
}
  const code1=uuid();
  // console.log(bgphoto.name);

 if(bgphoto){
  const bgImageRef = ref(storage,`images/${bgphoto.name+code1}`);

  // background photo
uploadBytes(bgImageRef, bgphoto).then((snapshot) => {
  getDownloadURL(snapshot.ref).then((url) => {
const docRef = doc(db, "Users",docId);
// update the Profile image
const data1 = {
backgroundPhoto:url,
};
updateDoc(docRef, data1)
.then(docRef => {
  alert("background picture successfully changed");
})
.catch(error => {
  console.log(error);
})
  });
});

 }


  setPhoto('')
  setBgPhoto('')
  dispatch(setUploadProfilePhoto(!PopUp.uploadProfilePhoto))
}



  return (
    <div className='z-50 bg-white text-center '>
   
<div className='flex justify-end px-5 items-center'>
<div className='flex align-middle items-center justify-between gap-[9rem] '>
      <h1 className='font-semibold text-2xl py-5 '>Edit Profile Picture</h1>
<p className='cursor-pointer' onClick={()=>dispatch(setUploadProfilePhoto(!PopUp.uploadProfilePhoto))}>{close}</p>
      </div>
</div>


    <hr />
    <form onSubmit={submitHandler}>
    <div className='   flex flex-col items-center justify-center align-middle gap-5 w-[30vw] h-[45vh] rounded-md shadow-md px-16'>

    
      <div className='flex gap-3  items-center justify-center align-middle'>
       UploadImage: <input onChange={e=>setPhoto(e.target.files[0])}  type="file"  className='border   max-w-full ' />
      </div>
      <div className='flex gap-3  items-center justify-center align-middle'>
       Upload Background Image: <input onChange={e=>setBgPhoto(e.target.files[0])}  type="file"  className='border   max-w-full ' />
      </div>
   
{/* image */}
<button className={`w-full bg-[#757BB8] h-[2rem]  rounded-full text-xl font-semibold ${photo||bgphoto?'':'opacity-40'} `}  disabled={photo||bgphoto?false:true} >Post</button>

    </div>
</form>

    </div>
  )
}

export default UploadPhotoPopUp



