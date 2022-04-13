import styled from "styled-components";
import TableRow from './TableRow'
import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "../../page.css";
import Pagination from "react-js-pagination";
import Feed from './Feed'
import Post from './Post';
import Like_insert from "./util/Like_insert";
import { SettingsInputSvideo } from "@material-ui/icons";


function FreeBoardView( ){

     const [post, setPost] = useState({
      free_seq:"",
      userid:"",
      title:"",
      content:"",
      image:"",
      wdate:"",
      like_cnt:"",
      hit:"",
      user_seq:"",
    }
     );

     const [comments, setComments] = useState([]);

     const {free_seq} = useParams();

      const loadData = async () => {
        //비동기모드를 동기모드로 바꾸어서 데이터가 올 때 까지 기다리게 만들었음
        //그래서 값이 반환 될 때까지 기다린다.
        const res = await Axios.get(`http://localhost:9090/dangjang/freeboard/view/${free_seq}`);
        console.log(res.data);
        setPost(res.data.dto);
        setComments(res.data.commentList);
        
      }

      //페이지가 처음에 화면에 끌 때 이부분이 호출된다.
     useEffect( ()=>
     {
        console.log("free_seq------", free_seq);
        loadData(1);    //첫번째 페이지 데이터 가져와서 화면에 뿌리기
      }, []);
  
      
      return (
          
        <div>

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
                >


                </Post>
                <input name=""/>
                <button>댓글달기</button>

                {comments.map((data)=>{ return <><p>{data.content}</p><p>테스트</p></>})}
           
         
            </div>

        
      );
}






export default FreeBoardView;



/*

무한스크롤 구현하기 
yarn add react-intersection-observer

*/