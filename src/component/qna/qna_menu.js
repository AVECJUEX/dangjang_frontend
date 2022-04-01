import React from "react";

import Input from "../Input";
import Label from "../Label";
import { Routes, Route, Outlet, Link, NavLink } from "react-router-dom";






function QnaMenu() {
 
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

    <NavLink className={({ isActive }) => 'qnamenu'+ (isActive ? '-active' : '')} to="qna/qna/qnatop">질문 TOP</NavLink>
    <NavLink to='/'  className="qnamenu" >운영정책</NavLink>
    <NavLink to='/'  className="qnamenu" >계정/인증</NavLink>
    <NavLink to='/'  className="qnamenu" >구매/판매</NavLink>
    <NavLink to='/'  className="qnamenu" >거래품목</NavLink>
    <NavLink to='/'  className="qnamenu" >거래매너</NavLink>
    <NavLink to='/'  className="qnamenu" >왁자지껄</NavLink>
    <NavLink to='/'  className="qnamenu" >당장채팅</NavLink>
    <NavLink to='/'  className="qnamenu" >이용제재</NavLink>
    <NavLink to='/'  className="qnamenu" >본인인증</NavLink>
    <NavLink className={({ isActive }) => 'qnamenu'+ (isActive ? '-active' : '')} to="qna/qna/qnafree">자유질문</NavLink>

    
  
 
      </div>
  )
}
export default QnaMenu;