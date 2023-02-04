import React from "react";
import { profile } from "../assets/svg/rigthNavbarIcons/profile";
import Image from "next/image";
import chat from "../assets/imgs/homeImg/chat.png";
import saved from "../assets/imgs/homeImg/save-instagram.png";
import tasks from "../assets/imgs/homeImg/to-do-list.png";
import { useSelector, useDispatch } from "react-redux";

const General = () => {
  const isOpen = useSelector((state) => state.open);

  return (
    <div
      className={`flex flex-col gap-8 h-[100vh] fixed left-[90px] top-[10rem] ${
        isOpen.open ? "-z-20" : ""
      }`}
    >
      <div className="flex items-center  gap-3">{profile} full name</div>
      <div className="flex items-center  gap-3">
        <Image
          className=" w-[40px] h-[40px]"
          src={chat}
          width={500}
          height={500}
          priority
        />{" "}
        Messages
      </div>
      <div className="flex items-center  gap-3">
        <Image
          className=" w-[40px] h-[40px]"
          src={saved}
          width={500}
          height={500}
          priority
        />{" "}
        Saved
      </div>
      <div className="flex items-center  gap-3">
        <Image
          className="w-[40px] h-[40px]"
          src={tasks}
          width={500}
          height={500}
          priority
        />{" "}
        Tasks
      </div>
    </div>
  );
};

export default General;