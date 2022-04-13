import React from "react";

import Input from "../Input";
import Label from "../Label";
import { Routes, Route, Outlet, Link, NavLink } from "react-router-dom";






function MyMenu() {
 
  // const onMouse=(e)=>{
  
    
  //   e.target.style.background = "#e5e8eb";
  //   //document.getElementById('qnali').style.backgroundColor="#e5e8eb";
  // }
  // const mouseDown=(e)=>{
  //   e.target.style.background = "#ffffff";
  //   //document.getElementById('qnali').style.backgroundColor="#ffffff";
  // }
  
  return(
    <div style={{display : 'inline-block', width : '15%', padding : '0px'}}>

    <NavLink to="/registerModify" className={({ isActive }) => 'mymenu'+ (isActive ? '-active' : '')} >내 정보 수정</NavLink>
    <NavLink className={({ isActive }) => 'mymenu'+ (isActive ? '-active' : '')} to="" >내가 쓴 글</NavLink>
    <NavLink to="mymarket" className={({ isActive }) => 'mymenu'+ (isActive ? '-active' : '')} >내 판매</NavLink>
    <NavLink className={({ isActive }) => 'mymenu'+ (isActive ? '-active' : '')} to="">채팅</NavLink>

    
  

    </div>
  )
}
export default MyMenu;