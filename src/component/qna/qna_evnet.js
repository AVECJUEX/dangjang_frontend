
import TableRow from './TableRow'
import React, { useState, useEffect} from "react";
import {  Link, NavLink, Route, Routes } from "react-router-dom";
import Axios from "axios";
import "../../page.css";
import Pagination from "react-js-pagination";
import styled from "styled-components";


function QnaEvent() {
 
  
  const [qna, setQna] = useState([]) //게시글

  const [category, setCategory] = useState('10');   //페이징 정보
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
     const res = await Axios.get('http://localhost:9090/dangjang/qna/list/'+page+'/'+category);
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

  
 
  
   
  
  return(
    
    <div style={{display : 'inline-block', width : '78%', marginLeft:'7%', padding : '0px', verticalAlign: 'top'}}>
       {
          qna.map(function(object, i){
            return<TableRow obj={object} key={i} totalCnt={totalCnt}/>
          })
        }
       
   </div>
  );
}

export default QnaEvent;