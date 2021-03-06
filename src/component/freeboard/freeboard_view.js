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
import { useUserState } from "../member/UserContext";
import ViewPost from "./freeboard_view_post";


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
    const { user } = useUserState();
    const [login_id, setLoginId] = useState("");
    const [login_seq, setLoginSeq] = useState("");
    const [change, setChange] = useState(0);

    useEffect(()=>{
      if(user!=null){
        setLoginId(user.userid);
        setLoginSeq(user.user_seq);
      }
    }, [user])


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
      click:""
    }
     );

     const [comments, setComments] = useState([]);

     const {free_seq} = useParams();

     const [content2, setContent] = useState('');
      const loadData = async () => {
        //?????????????????? ??????????????? ???????????? ???????????? ??? ??? ?????? ???????????? ????????????
        //????????? ?????? ?????? ??? ????????? ????????????.
        const res = await Axios.get(`http://localhost:9090/dangjang/freeboard/view/${free_seq}`);
        console.log(res.data);
        setPost(res.data.dto);
        setComments(res.data.commentList);
        
      }

      //???????????? ????????? ????????? ??? ??? ???????????? ????????????.
     useEffect( ()=>
     {
        console.log("free_seq------", free_seq);
        loadData(1);    //????????? ????????? ????????? ???????????? ????????? ?????????
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
        frmData.append("user_seq", login_seq);
        frmData.append("free_seq", post.free_seq);
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
        <h1>?????????????????????????????????????</h1>
        <h4>????????? ???????????????</h4>
          <Link className="fbBtn" style={{float:'right'}} to="/freeboard"> ?????????????</Link>
          <br/>
          <br/>
        <hr/><br/><br/>

        <ViewPost 
          style={{marginBottom:'0px'}}
          post={post}
          setPost={setPost}
        > 

        </ViewPost>


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
          <Button style={{ float: "right" }} onClick={writeComment}>????????????</Button>
          </div>

      </Box>
      </div>

      </BoardBox>
         
            </div>
          
        
      );
}






export default FreeBoardView;



/*

??????????????? ???????????? 
yarn add react-intersection-observer

*/