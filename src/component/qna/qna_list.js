
import TableRow from './TableRow'
import React, { useState, useEffect} from "react";
import {  Link } from "react-router-dom";
import Axios from "axios";
import "../../page.css";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import Input from '../Input';
import Label from '../Label';



const QnaContainer = styled.div`
 h1{
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 30px;
  text-decoration: none;
  list-style: none;
  white-space: nowrap;
  color: #292a32;
  font-weight: 900;
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
  width: 120%;
  height:120%;
  padding:0px;
  
 }
 
 

 .Table{
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: start;
  justify-content: flex-start;
  width: 100%;
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
  
  
 }
 

`;


function QnaList( ){
      
    
  

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
      
      const onMouse=(e)=>{
        var i;
        var id = document.getElementsByClassName("qnalist"[0]).value;
        console.log("길이"+id);
        
        e.target.style.background = "#e5e8eb";
        //document.getElementById('qnali').style.backgroundColor="#e5e8eb";
      }
      const mouseDown=(e)=>{
        e.target.style.background = "#ffffff";
        //document.getElementById('qnali').style.backgroundColor="#ffffff";
      }
      
      return (
        <QnaContainer>

        <div>
          <h1>자주 묻는 질문</h1>
          <Label width="100%" padding="12px 15px 11px 46px">
              <Input
                name="search"
                placeholder="질문을 해보세요."
              />
          </Label>
          <br></br>
          <aside>

          <div style={{display : 'inline-block', width : '100%', padding : '0px'}}>

          <Link to='/'  className="qnamenu"  onMouseOver={onMouse} onMouseLeave={mouseDown} style={{color:'#6667ab', fontSize:'24px'}}>질문 TOP</Link>
          <Link to='/'  className="qnamenu" onMouseOver={onMouse} onMouseLeave={mouseDown}>운영정책</Link>
          <Link to='/'  className="qnamenu" onMouseOver={onMouse} onMouseLeave={mouseDown} >계정/인증</Link>
          <Link to='/'  className="qnamenu" onMouseOver={onMouse} onMouseLeave={mouseDown} >구매/판매</Link>
          <Link to='/'  className="qnamenu" onMouseOver={onMouse} onMouseLeave={mouseDown} >거래품목</Link>
          <Link to='/'  className="qnamenu" onMouseOver={onMouse} onMouseLeave={mouseDown} >거래매너</Link>
          <Link to='/'  className="qnamenu" onMouseOver={onMouse} onMouseLeave={mouseDown} >왁자지껄</Link>
          <Link to='/'  className="qnamenu" onMouseOver={onMouse} onMouseLeave={mouseDown} >당장채팅</Link>
          <Link to='/'  className="qnamenu" onMouseOver={onMouse} onMouseLeave={mouseDown} >이용제재</Link>
          <Link to='/'  className="qnamenu" onMouseOver={onMouse} onMouseLeave={mouseDown} >본인인증</Link>
          <Link to='/'  className="qnamenu" onMouseOver={onMouse} onMouseLeave={mouseDown} >자유질문</Link>

          
        
       
            </div>
          </aside>
          <aside style={{width : '78%', marginLeft:'7%', padding : '0px'}}>

          <div style={{display : 'inline-block', width : '100%',marginTop : '3px'}}>
         
         {/* <ul style={{display : 'inline-block', width : '70%',marginTop : '0px'}}> */}
           <Link to="/" className="qnalist" onMouseEnter={onMouse} onMouseOut={mouseDown} >Q. 커뮤니티 가이드 라인</Link>      
           <Link to="/" className="qnalist" onMouseEnter={onMouse} onMouseOut={mouseDown} >Q. 중고거래 운영정책</Link>      
           <Link to="/" className="qnalist" onMouseEnter={onMouse} onMouseOut={mouseDown} >Q. 당장마켓에서 지킬 매너</Link>      
           <Link to="/" className="qnalist" onMouseEnter={onMouse} onMouseOut={mouseDown} >Q. 판매 금지 물품</Link>      
           <Link to="/" className="qnalist" onMouseEnter={onMouse} onMouseOut={mouseDown} >Q. 왁자지껄 게시판이 뭔가요??</Link>      
           <Link to="/" className="qnalist" onMouseEnter={onMouse} onMouseOut={mouseDown} >Q. 중고거래 게시판 거래 및 환불정책</Link>      
           <Link to="/" className="qnalist" onMouseEnter={onMouse} onMouseOut={mouseDown} >Q. 작성한 게시글이 보이지 않아요</Link>      
           <Link to="/" className="qnalist" onMouseEnter={onMouse} onMouseOut={mouseDown} >Q. 다른 프로필로 전환하고 싶어요</Link>      
         {/* </ul> */}
        </div>
          </aside>
            </div>
            </QnaContainer>
      );
}


export default QnaList;



/*

무한스크롤 구현하기 
yarn add react-intersection-observer

*/