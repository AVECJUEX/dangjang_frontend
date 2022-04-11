import styled from "styled-components";
import Production from "./Production";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect} from "react";
import Axios from "axios";

const MainInfoBackground = styled.div`
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const MainInfoContainer = styled.div`
  width: 976px;
  margin: 0 auto;
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
    margin: 5px;
    padding: 0;
  }

  li {
    list-style: none;
  }

  .content-box {
    width: 95%;
    margin: 0 auto;
    border-bottom: 1px solid rgb(227, 227, 227);

    &:last-child {
      border-bottom: none;
    }
  }

  .content-box .basic-information {
    position: relative;
    margin-top: 5px;
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
      margin: 5px 0;
      border: 1px solid rgb(227, 227, 227);
      border-radius: 7px;
    }
  }
`;

function MainInfo(props, { match }) {
  let history = useNavigate ();
    let { board_seq } = useParams();

    const [inputs, setInputs] = useState({
      board_seq:'',
      category_name:'',
      category_code:'',
      title: '',
      user_id: '',
      content:'',
      price:'',
      hit:'',
      user_seq:'',
      wdate:''
    });
  
    const { title, category_name, category_code, content, price } = inputs; // 비구조화 할당을 통해 값 추출
  
    useEffect(() => { 
       console.log( board_seq );
       Axios.get(`http://localhost:9090/dangjang/board/view/${board_seq}`)
            .then(
              res => {
                  console.log(res.data);  //f12 눌러서 확인하기 
                  setInputs({
                    board_seq:res.data.board_seq,
                    title: res.data.title,
                    category_name: res.data.category_name,
                    category_code: res.data.category_code,
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

  return (
    <MainInfoBackground>
      <MainInfoContainer>
        <div className="content-box">
          <Production matchId={board_seq} />
        </div>
        <div className="content-box">
          <div className="basic-information">
            <h3><strong>[ {title} ]</strong></h3>
          </div>
          <div className="basic-infomation__detail">
            <p><strong>종류 : </strong>{category_name}</p>
            <p><strong>가격 : </strong>{price}원</p>
            <h4><strong>[ 내용 ]</strong></h4>
            <p>{content}</p>
          </div>
        </div>
      </MainInfoContainer>
    </MainInfoBackground>
  );
}

export default MainInfo;
