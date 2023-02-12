import React from "react";
import Modal from "../redux/reducers/isOpen";
import Navbar from "./Navbar";
import { Poppins } from "@next/font/google";
import { useSelector } from "react-redux";
import DarkToggle from "./main/toggle/DarkToggle";
import PostPopUp from "./popup/PostPopUp";
import SignUp from "./form/SignUp";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";



const poppins = Poppins({ subsets: ["latin"], weight: ["600", "400", "700"] });
const Layout = ({ children }) => {
  const isDark = useSelector((state) => state.open);
const auth=getAuth();
  const [user,loading]=useAuthState(auth)


  return (
    <div className={`${poppins.className } ${user?'':'bg-[#EBEBEB] flex items-center justify-center align-middle h-[120vh]'}`}  >
{/* background  */}


{user?<>
      <Navbar />
 <div className={`${isDark.postPopUp&&' blur-sm '}`}>
 <DarkToggle/>
     <div className={`pt-[8rem]  px-[5rem] ${isDark.dark?'bg-[#1B2430]':'bg-[#EBEBEB] '}`}>
     {children}

     </div>
     <div>  {isDark.postPopUp&&<div className={`w-full fixed top-0 blur-lg h-screen bg-[#f3f3f49d] z-50`}>k</div>}
</div>
 </div>
 <div className="fixed top-[10rem] left-1/3  z-50">
       {isDark.postPopUp&&<PostPopUp/>}
  </div> </>:<div className=""><SignUp/></div>
}



    </div>
  );
};

export default Layout;
