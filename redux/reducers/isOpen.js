import { createSlice } from "@reduxjs/toolkit";

const isOpenSlice=createSlice({

    name:'open',
    // this is initial value
    initialState:{
        open:false,
        like:false,
        dark:false,
        postPopUp:false,
        swe:false,
        editPopup:false,
        uploadProfilePhoto:false,
        login:false,
        skillsEdit:false,
        projectPhoto:false
    },
    // to update the initial value
    reducers:{
        setIsOpen(state,action){
            state.open=!state.open
        },
        setLike(state,action){
            state.like=!state.like
        }
        ,
        setDarkMode(state,action){
            state.dark=!state.dark
        }
        ,
        setPostPopUp(state,action){
            state.postPopUp=!state.postPopUp
        },
        
        setSwe(state,action){
            state.swe=!state.postPopUp
        }, 
        setEditPopup(state,action){
            state.editPopup=!state.editPopup
        },
        
        setUploadProfilePhoto(state,action){
            state.uploadProfilePhoto=!state.uploadProfilePhoto
        },
    
        setLogin(state,action){
            state.login=!state.login
        },
        setSkillsEdit(state,action){
            state.skillsEdit=!state.skillsEdit
        },
        setProjectsPhoto(state,action){
            state.projectPhoto=!state.projectPhoto
        }
        
    }



})
export const {setIsOpen,setLike,setDarkMode,setPostPopUp,setProjectsPhoto, setSwe,setEditPopup,setUploadProfilePhoto,setLogin,setSkillsEdit}=isOpenSlice.actions
export default isOpenSlice.reducer