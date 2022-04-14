import React, { useState, useEffect} from "react";
import Axios from "axios";
import {  useNavigate  } from "react-router-dom";
import Input from "../Input";
import Label from "../Label";
import { Routes, Route, Outlet, Link, NavLink } from "react-router-dom";
import QnaMenu from "./qna_menu";
import QnaFree from "./qna_free";
import QnaTop from "./qna_top";

import QnaView from "./qna_view"
import QnaOper from "./qna_oper";
import QnaId from "./qna_id";
import QnaSearchList from "./qna_searchList";
import QnaEvent from "./qna_evnet";



function QnaHeader() {

 

  

 
      
  
 
  return (
    <div style={{marginTop : '100px'}}>
    <h1>자주 묻는 질문</h1>
    

    <Label width="100%" padding="12px 15px 11px 46px">
        <Input name="keyword" placeholder="질문을 해보세요."></Input>
    </Label>
         
          
         
    <br></br>
    <br></br>
    <QnaMenu>

    </QnaMenu>
            <Routes>
              
            <Route  path="/"  element={<QnaContents />} />
              
              <Route path="/qna/qna/qna/qnaSearchList/:keyword" element={<QnaSearchList/>}/>
              <Route path="qna/qna/qnatop"  element={<QnaTop />} />
              <Route path="qna/qna/qnafree"  element={<QnaFree />} />
              <Route path="qna/qna/qnaoper"  element={<QnaOper />} />
              <Route path="qna/qna/qnaid"  element={<QnaId />} />
              <Route path="qna/qna/qnaEvent"  element={<QnaEvent />}/>
              
              <Route path="qna/view/:qna_seq/" element={<QnaView/>}/>
              
             
              
            </Routes>
    </div>
  );
}
function QnaContents(){
  return(
    <div>

      <Outlet/>          
    </div>
    
    
)
}

export default QnaHeader;