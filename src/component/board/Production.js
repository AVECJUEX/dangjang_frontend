import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect} from "react";
import Axios from "axios";
import styled from "styled-components";

const ProductionContainer = styled.div`
  .appearance-production {
    ul {
      display: flex;
      flex-wrap: wrap;
    }

    li {
      display: flex;
      width: 30%;
      height: 200px;
      margin: 0 15px;
    }

    .character-box {
      display: flex;
      height: 100%;
      align-items: center;
      width: 100%;
      box-sizing: border-box;

      p {
        margin: 5px 0 0 0px;
        color: rgb(140, 140, 140);
        font-size: 14px;
        font-weight: 400;
      }

      .title {
        color: rgb(30, 30, 30);
        font-size: 16px;
        font-weight: 700;
        letter-spacing: -0.7px;
        line-height: 22px;
        white-space: nowrap;
      }
    }

    li img {
      width: 90%;
      height: 90%;
      border-radius: 7px;
    }

    li .character-text-box {
      border-bottom: 1px solid rgb(227, 227, 227);
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 80px;
      width: 100%;
      margin-left: 5%;
      /* padding-bottom: 30px; */
    }
  }
`;

function Production(props, { match }) {
  let history = useNavigate ();
  let { board_seq } = useParams();

  const [inputs, setInputs] = useState({
    board_seq:'',
    image1:'',
    image2:'',
    image3:'',
    image4:'',
    image5:'',
    image6:'',
  });
  const {image1, image2, image3, image4, image5, image6} = inputs; // 비구조화 할당을 통해 값 추출

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
                    image1:res.data.image1,
                    image2:res.data.image2,
                    image3:res.data.image3,
                    image4:res.data.image4,
                    image5:res.data.image5,
                    image6:res.data.image6
                  });
              }
            );
      //console.log( heroState.hero );
    }, []);
    const onSubmit=(e)=> {
      e.preventDefault();
      var frmData = new FormData(); 
      frmData.append("board_seq", inputs.board_seq);
      frmData.append("image1", inputs.image1);
      frmData.append("image1", inputs.image2);
      frmData.append("image1", inputs.image3);
      frmData.append("image1", inputs.image4);
      frmData.append("image1", inputs.image5);
      frmData.append("image1", inputs.image6);

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
      <ProductionContainer>
        <div className="appearance-production">
          <ul>
            <li>
              <div className="character-box">
                <img src={inputs.image1} alt={inputs.image1}></img>
              </div>
            </li>
            <li>
              <div className="character-box">
                <img src={inputs.image2} alt={inputs.image2}></img>
              </div>
            </li>
            <li>
              <div className="character-box">
                <img src={inputs.image3} alt=""></img>
              </div>
            </li>
            <li>
              <div className="character-box">
                <img src={inputs.image4} alt=""></img>
              </div>
            </li>
            <li>
              <div className="character-box">
                <img src={inputs.image5} alt=""></img>
              </div>
            </li>
            <li>
              <div className="character-box">
                <img src={inputs.image6} alt=""></img>
              </div>
            </li>
          </ul>
        </div>
      </ProductionContainer>
    );
}

export default Production;
