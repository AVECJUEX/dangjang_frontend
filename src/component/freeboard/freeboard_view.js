
import TableRow from './TableRow'
import React, { useState, useEffect} from "react";
import { Routes, Route, Outlet, Link, NavLink } from "react-router-dom";

import Axios from "axios";
import "../../page.css";
import Pagination from "react-js-pagination";
import Feed from './Feed'
import Post from './Post';

function FreeBoardView( ){
     const [freeboard, setFreeBoard] = useState([]) //게시글
     const [page, setPage] = useState(1);   //페이징 정보
     const [totalCnt, setTotalCnt] = useState(0); //전체 레코드 개수
     const [loading, setLoading]=useState(false); //로딩 중을 띄우고싶었지만 안씀

   
      const loadData = async () => {
        setLoading(true);
        //비동기모드를 동기모드로 바꾸어서 데이터가 올 때 까지 기다리게 만들었음
        //그래서 값이 반환 될 때까지 기다린다.
        const res = await Axios.get(`http://localhost:9090/dangjang/freeboard/list/${page}`);
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
      
      return (
        <div>
           {freeboard.map((post)=> 
                <Post
                    free_seq={post.free_seq}
                    user_id={post.user_id}
                    title= {post.title}
                    content={post.content}
                    image={post.image}
                    wdate={post.wdate}
                    like_cnt={post.like_cnt}
                    hit={post.hit}
                    user_seq={post.user_seq}
                />)
                
            }
           
        </div>
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


export default FreeBoardView;



/*

무한스크롤 구현하기 
yarn add react-intersection-observer

*/