import styled from "styled-components";
import TableRow from './TableRow'
import React, { useState, useEffect, Fragment, useMemo} from "react";
import { Routes, Route, Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import FreeBoardView from './freeboard_view'
import FileUpload from "./util/FileUpload";
import Axios from "axios";
import "../../page.css";
import Pagination from "react-js-pagination";
import Feed from './Feed'
import Post from './Post';
import { useUserState } from "../member/UserContext";

const BoardBox = styled.div`

  
h1{
  line-height: 32px;
  margin-top : 30px;
  margin-bottom: 70px;
  text-decoration: none;
  list-style: none;
  white-space: nowrap;
  color: #292a32;
  font-weight: bolder;
  letter-spacing: -0.4px;
  line-height: 30px;
  font-size : 40px;
  
 }
h4{
  line-height: 32px;
  white-space: nowrap;
  color: #292a32;
  font-weight: bolder;
  letter-spacing: -0.4px;
  line-height: 30px;
  font-size : 20px;
  
 }
 .fbBtn{
  line-height: 32px;
  white-space: nowrap;
  color: #292a32;
  font-weight: bolder;
  letter-spacing: -0.4px;
  line-height: 30px;
  font-size : 19px;
  padding : 8px;
  text-align : center;  
  text-decoration: none;
  border-radius: 10px;
  display : block;
}
.fbBtn:hover{
background-color:#e5e8eb;
color : #6667ab;

}

 aside{
  .Category {
    white-space: nowrap;
    max-width: 1320px;
    padding: 12px 0 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 60px;
    line-height: 30px;
  }

  .Category p {
    color: #292a32;
    font-size: 22px;
    font-weight: 900;
    letter-spacing: -0.4px;
    line-height: 30px;
  }
  .btn {
    color: #fff;
    background-color: #6667ab;
    border-color: #6667ab;
  }
`;

function FreeBoardList( ){
     const { user } = useUserState();
      
     let history = useNavigate (); //자바스크립트 : history.go(-1)
     const [login_id, setLoginId] = useState("");
     const [login_seq, setLoginSeq] = useState("");
     const [freeboard, setFreeBoard] = useState([]) //게시글
     const [page, setPage] = useState(1);   //페이징 정보
     const [totalCnt, setTotalCnt] = useState(0); //전체 레코드 개수
     const [loading, setLoading]=useState(false); //로딩 중을 띄우고싶었지만 안씀
     const [change, setChange] = useState(0);

        //새로고침 시 user_id, user_seq 사라지는거 방지
        useEffect(()=>{
          if(user!=null){
            setLoginId(user.userid);
            setLoginSeq(user.user_seq);
          }
        }, [user])
       
    
          /*
         useEffect( function, deps )
        - function : 수행하고자 하는 작업
        - deps : 배열 형태이며, 배열 안에는 검사하고자 하는 특정 값 or 빈 배열
        화면불러올때 이 부분이 호출된다. 
        */
        


        //axios는 비동기모드로 데이터를 불러온다
        /*
        비동기모드는 반환값을 못받는데 데이터가 어느 시점에 올지 몰라서
        then 메서드 에서 결과 값이 오기를 기다려야 한다.
        axios.get(url)
        .then(response)->{})
        .catch(error)->{})
        */ 

        /*
        boardList = [
        {
            "key": "",
            "keyword": "",
            "pg": 0,
            "pageSize": 10,
            "pgGroup": 5,
            "start": 0,
            "rnum": 1,
            "free_seq": 1,
            "user_id": "test",
            "title": "fortest",
            "content": "잘나와야한다",
            "image": "01.jpg",
            "wdate": "2022-04-01",
            "like_cnt": "",
            "hit": "",
            "user_seq": ""
        },
         {
            "key": "",
            "keyword": "",
            "pg": 0,
            "pageSize": 10,
            "pgGroup": 5,
            "start": 0,
            "rnum": 1,
            "free_seq": 1,
            "user_id": "test",
            "title": "fortest",
            "content": "잘나와야한다",
            "image": "01.jpg",
            "wdate": "2022-04-01",
            "like_cnt": "",
            "hit": "",
            "user_seq": ""
        }

        boardList.map((data)=> <div></div>)
    ]
        
        */
      const loadData = async () => {
        setLoading(true);
        //비동기모드를 동기모드로 바꾸어서 데이터가 올 때 까지 기다리게 만들었음
        //그래서 값이 반환 될 때까지 기다린다.
        var frmData = new FormData();
        frmData.append("user_seq", login_seq);

        const res = await Axios.post(`http://localhost:9090/dangjang/freeboard/list/${page}`, frmData);
        console.log(res.data);
        setTotalCnt(res.data.totalCnt);
        setFreeBoard(res.data.list);
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

      useEffect(()=>{
        console.log("total like", change);
        loadData(page);

      },[change])
      
      return (
        
        <BoardBox>
          
        <div style={{marginTop : '130px'}}>
          <h1>👨‍👨‍👧‍👧왁자지껄</h1>
          <h4>즐거운 일상을 공유해보세요!!</h4>
            <Link className="fbBtn" style={{float:'right'}} to="/freeboard/write"> ✏️글쓰기</Link>
            <br/>
            <br/>
          <hr/><br/><br/>
          
        

          
           {freeboard.map((post)=> 
                <Post
                    free_seq={post.free_seq}
                    userid={post.userid}
                    title= {post.title}
                    content={post.content}
                    image={post.image}
                    wdate={post.wdate}
                    like_cnt={post.like_cnt}
                    hit={post.hit}
                    user_seq={post.user_seq}
                    click={post.click}
                    change={change}
                    setChange={setChange}
                    
                />)
                
            }
            </div>
           </BoardBox>
        
      );
}


    
//       <Feed/>

           {
              // freeboard.map((object, i) => {
              //     return <TableRow obj={object} key={i} totalCnt={totalCnt} />
                  /*key : 반복적인것을 넘길 떄 반드기 주고, 동일한 값이 입력되면 안된다
                    obj : props 라는 객체를 이용해 부모 컴포넌트가 자식 컴포넌트 한테 값을 줄 수 있다. 맘대로 */
              //})
           }                                                               
      
    

 {/*
    pagenation : npm install react-js-pagination 한거임
                페이징을 다 처리 할 수 있다
                activePage : 현재페이지값
                itemCountPerPage : 한페이지에 몇개씩 나타낼 것 인가
                totalItemsCount : 전체데이터 개수
                pageRangeDisplayed : 한번에 보여지는 페이지 개서 1~5 6~10
                onChange : 페이지를 눌렀을 때 호출될 함수
                */}
    
    
{/*     
  </div>
  )
} */}


export default FreeBoardList;



/*

무한스크롤 구현하기 
yarn add react-intersection-observer

*/