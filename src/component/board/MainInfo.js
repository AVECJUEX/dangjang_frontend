import styled from "styled-components";
import Production from "./Production";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect} from "react";
import Axios from "axios";

const MainInfoBackground = styled.div`
  width: 100%;
  padding-top: 30px;
  background-color: #f8f8f8;
`;

const MainInfoContainer = styled.div`
  width: 976px;
  margin: 0 auto;
  padding-bottom: 20px;
  background-color: white;
  border: 1px solid rgb(227, 227, 227);
  border-radius: 15px;

  @media ${(props) => props.theme.tablet} {
    width: 640px;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  p {
    margin: 10px 0px;
  }

  .content-box {
    width: 95%;
    padding-bottom: 15px;
    margin: 0 auto;
    border-bottom: 1px solid rgb(227, 227, 227);

    &:last-child {
      border-bottom: none;
    }
  }

  .content-box .basic-information {
    position: relative;
    display: flex;
    align-items: center;
  }

  .content-box .basic-information a {
    position: absolute;
    right: 0;
  }

  .coment-box {
    width: 95%;
    margin: 0 auto;
    padding: 15px;
    background-color: #f8f8f8;
    justify-content: center;
    border-radius: 15px;

    .coment-input {
      display: flex;
      width: 100%;

      input {
        width: 80%;
        padding: 8px 0;
        border-radius: 7px;
        border: 2px solid rgb(227, 227, 227);
      }

      button {
        width: 20%;
        display: flex;
        background-color: rgb(255, 47, 110);
        box-sizing: border-box;
        border-radius: 6px;
        margin: 0px auto;
        justify-content: center;
        align-items: center;
      }
    }

    span {
      color: rgb(140, 140, 140);

      &:last-child {
        margin-left: 5px;
      }
    }

    li {
      padding: 5px 0px 5px 10px;
      margin: 10px 0;
      border: 1px solid rgb(227, 227, 227);
      border-radius: 7px;
    }
  }
`;

function MainInfo(porps, { match }) {
  let history = useNavigate ();
    let { board_seq } = useParams();

    const [inputs, setInputs] = useState({
      board_seq:'',
      category_name:'',
      title: '',
      user_id: '',
      content:'',
      price:'',
      hit:'',
      user_seq:'',
      wdate:''
    });
  
    const { title, category_name, content, user_id, price, 
    hit, user_seq, wdate  } = inputs; // 비구조화 할당을 통해 값 추출
  
    const onChange = (e) => {
      const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
      console.log(value, name);
      setInputs({
        ...inputs, // 기존의 input 객체를 복사한 뒤
        [name]: value // name 키를 가진 값을 value 로 설정
      });
    };
  
    useEffect(() => { 
       console.log( board_seq );
       Axios.get(`http://localhost:9090/dangjang/board/view/${board_seq}`)
            .then(
              res => {
                  console.log(res.data);  //f12 눌러서 확인하기 
                  setInputs({
                    board_seq:board_seq,
                    title: res.data.title,
                    category_name: res.data.category_name,
                    content:res.data.content,
                    user_id: res.data.user_id,
                    user_seq: res.data.user_seq,
                    price: res.data.price,
                    hit: res.data.hit,
                    wdate: res.data.wdate
                  });
              }
            );
      //console.log( heroState.hero );
    }, []);

    const onSubmit=(e)=> {
      e.preventDefault();
      var frmData = new FormData(); 
      frmData.append("board_seq", inputs.board_seq);
      frmData.append("title", inputs.title);
      frmData.append("category_name", inputs.category_name);
      frmData.append("user_id", inputs.user_id);
      frmData.append("user_seq", inputs.user_seq);
      frmData.append("price", inputs.price);
      frmData.append("content", inputs.content);
      frmData.append("hit", inputs.hit);
      frmData.append("wdate", inputs.wdate);

      console.log( document.myform.filename.files );
      
      frmData.append("file", document.myform.filename.files[0]);
      
      Axios.post('http://localhost:9090/board/update/', frmData)
            .then(
              res => {
                console.log(res.data);
               history('/board');
              }
            );
    }

  return (
    <MainInfoBackground>
      <MainInfoContainer>
        <div className="content-box">
          <div className="basic-information">
            <h3>기본정보</h3>
          </div>
          <div className="basic-infomation__detail">
            <p>{inputs.title}</p>
            <p>{inputs.category_name}</p>
            <p>{inputs.price}</p>

            <h4>내용 </h4>
            <p>{inputs.content}</p>
          </div>
        </div>

        <div className="content-box">
          <div className="basic-information">
            <h3>출연/제작</h3>
          </div>
          <Production matchId={inputs.board_seq} />
        </div>
        <div className="content-box">
          <div className="basic-information">
            <h3>댓글</h3>
          </div>
          {/* <div className="coment-box">
            <div className="coment-input">
              {login ? (
                <Input
                  onChange={onChange}
                  name="commentInput"
                  value={inputs.commentInput}
                ></Input>
              ) : (
                <input readOnly value={"   로그인 후에 이용해주세요"} />
              )}

              <button
                onClick={
                  login ? onClick : () => alert("로그인 후 사용해주세요")
                }
              >
                <img className="StatusImage" src={PlusPath} alt=""></img>
              </button>
            </div>
            <div className="coments">
              <ul>
                {comments.map((comment) => (
                  <li key={comment.id}>
                    <span>{comment.userName} :</span>
                    <span>{comment.comment}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}
        </div>
      </MainInfoContainer>
    </MainInfoBackground>
  );
}

export default MainInfo;
