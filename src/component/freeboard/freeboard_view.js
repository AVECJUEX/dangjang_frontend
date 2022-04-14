import styled from "styled-components";
import TableRow from './TableRow'
import React, { useState, useEffect} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import "../../page.css";
import Pagination from "react-js-pagination";
import Feed from './Feed'
import Post from './Post';
import PostReply from "./PostReply";
import Like_insert from "./util/Like_insert";
import { SettingsInputSvideo } from "@material-ui/icons";
import { Avatar, Box } from "@material-ui/core";
import { Button, TextField } from "@mui/material";


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

     const [content2, setContent] = useState('');
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
  

      const replyStyle= {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mrginBottom: "10px"
      }
/*


	private String fbco_seq="";
	private String user_seq="";
	private String free_seq="";
	private String content="";
	private String wdate="";

*/
      const writeComment = async () =>{
        const frmData = new FormData();
        frmData.append("user_seq", "1");
        frmData.append("free_seq", "14");
        frmData.append("content", content2 );
        const res = await Axios.post(`http://localhost:9090/dangjang/fbcomment/insert`, frmData);
        console.log(res.data);
        window.location.reload(true);

      }

      const onChangeContent = (e)=>{
        setContent(e.target.value);
      }
      
      return (
        
        <div style={{marginTop : '130px'}}>
          <BoardBox>
        <h1>👨‍👨‍👧‍👧왁자지걸</h1>
        <h4>댓글을 남겨주세요</h4>
          <Link className="fbBtn" style={{float:'right'}} to="/freeboard"> 📄글목록</Link>
          <br/>
          <br/>
        <hr/><br/><br/>

                <Post style={{marginBottom:'0px'}}
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

                <div style={replyStyle, {marginTop : '0px',height:'70%',paddingTop:'0px'} }>
                  <Box
                    sx={{
                      width: 550,
                      maxWidth: "100%"
                      
                    }}
                    >

                
                  
                  {
                    comments.map( (props)=> <PostReply props={props}/>)
                  } 
                  
                  <div>
                    <TextField fullWidth style={{width: "689.3px"}} value={content2} onChange={onChangeContent}/>
                  </div>
                  <div>   
                  <Button style={{ float: "right" }} onClick={writeComment}>댓글달기</Button>
                  </div>
      
              </Box>
              </div>

                {/* <input name=""/>

<button>댓글달기</button>

{comments.map((data)=>{ return <><p>{data.content}</p><p>테스트</p></>})}
*/}
</BoardBox>
         
            </div>
          
        
      );
}






export default FreeBoardView;



/*

무한스크롤 구현하기 
yarn add react-intersection-observer

*/