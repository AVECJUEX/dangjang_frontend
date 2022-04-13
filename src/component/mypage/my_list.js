
import React, { useState, useEffect} from "react";
import {  Link, Outlet, Route, Routes } from "react-router-dom";
import Axios from "axios";
import "../../page.css";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import MyHeader from "./my_header";


import MyMenu from "./my_menu";

import QnaId from "./my_id";
import RegisterModify from "../member/RegisterModify ";




const MyContainer = styled.div`
 h1{
  line-height: 32px;
  margin-bottom: 40px;
  text-decoration: none;
  list-style: none;
  white-space: nowrap;
  color: #292a32;
  font-weight: bolder;
  letter-spacing: -0.4px;
  line-height: 30px;
  
 }
 aside{
  display: inline-block; 
  vertical-align: top;
  width: 15%;
 }
 
 a{
  
  line-height: 32px;
  margin-bottom: 30px;
  text-decoration: none;
  list-style: none;
  white-space: nowrap;
  color: #8b95a1;
  letter-spacing: -0.4px;
  line-height: 30px;
  font-size: 18px;
  font-weight: 600;
  
  vertical-align: baseline;
  border-radius: 10px;
  display : block;
  
  padding:0px;
  
 }
 
 

 .qnamenu{
  display: flex;
  width: 100%;
  align-items: center;
  padding: 12px 16px;
 
  outline: none;
  border: none;
  margin: 0;
  overflow: visible;
  text-decoration: none;
  
  
 }
 
 .qnamenu-active{
  display: flex;
  width: 100%;
  align-items: center;
  padding: 12px 16px;
 
  outline: none;
  border: none;
  margin: 0;
  overflow: visible;
  text-decoration: none;
  color : #6667ab;
  font-weight : bolder;
   font-size : 24px;
  
  
 }
 
    
 .qnamenu:active,
 .qnamenu:hover{
   color : #6667ab;
   font-size : 24px;
   background-color:#e5e8eb;
   font-weight : bolder;
  }
  
  .qnalist{
    display: flex;
    width: 100%;
    align-items: center;
    padding: 12px 16px;
    outline: none;
    border: none;
    margin: 0;
    overflow: visible;
    text-decoration: none;
    font-weight : bolder;
  }
  .qnalist:active,
  .qnalist:hover{
    font-size : 24px;
    background-color:#e5e8eb;
    font-weight : bolder;
  }
 
  .qnaBtn{
    line-height: 32px;
    margin-bottom: 40px;
    margin-top : 20px;
    white-space: nowrap;
    color: #292a32;
    font-weight: bolder;
    letter-spacing: -0.4px;
    line-height: 30px;
    font-size : 19px;
    width : auto;
    padding : 8px;
    text-align : center;  
    margin-left:87%
 }
 .qnaBtn:hover{
  background-color:#e5e8eb;
 
 }
 .qnalist-title{
  line-height: 32px;
  margin-bottom: 40px;
  margin-top : 20px;
  white-space: nowrap;
  color: #292a32;
  font-weight: bolder;
  letter-spacing: -0.4px;
  line-height: 30px;
 }
 .qnalist-contents{
  line-height: 32px;
  margin-bottom: 40px;
  margin-top : 20px;
  white-space: nomal;
  color: #292a32;
  font-weight: bolder;
  letter-spacing: -0.4px;
  line-height: 30px;
  font-size : 19px;
  
 }
 }
 
 

`;


function MyList( ){
      
    
  

     const [qna, setQna] = useState([]) //게시글
     const [page, setPage] = useState(1);   //페이징 정보
     const [totalCnt, setTotalCnt] = useState(0); //전체 레코드 개수
     const [loading, setLoading]=useState(false); //로딩 중을 띄우고싶었지만 안씀

    
          /*
         useEffect( function, deps )
        - function : 수행하고자 하는 작업
        - deps : 배열 형태이며, 배열 안에는 검사하고자 하는 특정 값 or 빈 배열
        화면불러올때 이 부분이 호출된다. 
        */
        
        // setBoard(
        //    ...board,
        //    [
        //      {id:1, title:"제목1", writer:"홍길동1", contents:"내용을 막 넣자1"},
        //      {id:2, title:"제목2", writer:"홍길동2", contents:"내용을 막 넣자2"},
        //      {id:3, title:"제목3", writer:"홍길동3", contents:"내용을 막 넣자3"},
        //      {id:4, title:"제목4", writer:"홍길동4", contents:"내용을 막 넣자4"},
        //      {id:5, title:"제목5", writer:"홍길동5", contents:"내용을 막 넣자5"}
        //   ]
        // );


        //axios는 비동기모드로 데이터를 불러온다
        /*
        비동기모드는 반환값을 못받는데 데이터가 어느 시점에 올지 몰라서
        then 메서드 에서 결과 값이 오기를 기다려야 한다.
        axios.get(url)
        .then(response)->{})
        .catch(error)->{})
        */ 
      const loadData = async (page) => {
        setLoading(true);
        //비동기모드를 동기모드로 바꾸어서 데이터가 올 때 까지 기다리게 만들었음
        //그래서 값이 반환 될 때까지 기다린다.
        const res = await Axios.get('http://localhost:9090/dangjang/qna/list/'+page);
        console.log(res.data);
        setTotalCnt(res.data.totalCnt);
        setQna(res.data.list);
        setLoading(false);
      }

      //페이지가 처음에 화면에 끌 때 이부분이 호출된다.
     useEffect( ()=>
     {
      
      loadData(1);    //첫번째 페이지 데이터 가져와서 화면에 뿌리기
        
      }, []);
  
      //페이지 이동 버튼을 누르면 이 함수가 호출된다.
      const handlePageChange = (page) => {
        setPage(page);
        loadData(page);
      };
      
     
      
      return (
        <MyContainer>
          <MyHeader></MyHeader>
          <MyMenu></MyMenu>
            <Routes>
              
            <Route  path="/"  element={<QnaContents />} />
           
             

            </Routes>
            
       
         
            </MyContainer>
      );
    }
    
    function QnaContents(){
      return(
        <div>

          <Outlet/>          
        </div>
        
        
  )
}




export default MyList;



/*

무한스크롤 구현하기 
yarn add react-intersection-observer

*/