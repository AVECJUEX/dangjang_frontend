import React, { useState, useEffect } from "react";
import styled from "styled-components";
import loginLogoPath from "../../IMG/logo.png";
import closePath from "../../IMG/close.png";
import "../member/LoginRegister.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const Container = styled.div`
  position: fixed;
  top: 10%;
  width: 100%;
  height: 100%;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

// const Container = styled.div`
//   margin-top:15%;
//   width: 100%;
//   height: 500px;
//   display: flex;
//   position: relative;
//   flex-direction: column;
//   align-items: center;
//   background: rgba(0, 0, 0, 0.5);

// `;

const Contents = styled.div`
  padding: 0 auto;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  text-align: center;
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;

  .loginBtn {
    padding: 0px;
    margin: 0px;
    cursor: pointer;
    color: #00000;
    font-size: 17px;
    font-weight: 500;
  }
  .SignInBtn {
    padding: 0px;
    margin: 0px;
    cursor: pointer;
    color: #00000;
    font-size: 17px;
    font-weight: 500;
  }
  .loginregister__button {
    background-color: #6667ab;
    color: rgb(255, 255, 255);
    font-weight: 700;
    width: 100%;
    border-radius: 40px;
    height: 48px;
    margin-top: 10px;
  }

  .findregister__button {
    background-color: #6667ab;
    color: rgb(255, 255, 255);
    font-weight: 700;
    width: 30%;
    border-radius: 40px;
    height: 48px;
    margin-top: 10px;
  }
  img {
    object-fit: cover;
    width: 151px;
    height: 37px;
  }
  .modalLogo {
    object-fit: cover;
    width: auto;
    height: 100px;
  }
`;
const Title = styled.div`
  display: flex-end;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  width: 100%;
  overflow: auto;
  height: 10%;
`;

const Close = styled.button`
  color: gray;
  &:hover {
    cursor: pointer;
  }
  img {
    width: 100%;
    height: 100%;
    margin: 0;
    cursor: pointer;
  }
`;

const ModalContainer = styled.div`
  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: ${(props) => props.display};
    align-items: center;
    justify-content: center;
  }

  .modal-wrapper p {
    text-align: center;
    color: rgb(140, 140, 140);
    span {
      color: rgb(255, 47, 110);
      cursor: pointer;
    }
  }

  .login-modal {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    padding: 24px 16px;
    border-radius: 4px;
    width: 375px;

    img {
      display: inline-block;
      width: 140px;
      height: 70px;
    }
  }

  .modal-title {
    font-size: 17px;
    letter-spacing: -0.5px;
    line-height: 22px;
    font-weight: 700;
    text-align: center;
    margin: 24px 0px 20px;
  }

  .modal p {
    font-size: 16px;
  }

  .close-wrapper {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 10px;
    right: 10px;
    padding: 0;
    margin: 0;

    img {
      width: 100%;
      height: 100%;
      margin: 0;
      cursor: pointer;
    }
  }

  .ButtonBlock {
    float: left;
    margin: 39px 30px 0px 0px;
  }

  .Self {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(255, 47, 110);
    box-sizing: border-box;
    height: 40px;
    border-radius: 6px;
    overflow: hidden;
    margin: 10px 0px;
  }

  .StylelessButton-ActionButton {
    padding: 0px;
    margin: 0px;
    cursor: pointer;
    color: rgb(246, 246, 246);
    font-size: 17px;
    font-weight: 500;
  }
`;

function FindIdModal({ closeFindIdModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg]=useState("");
  const [password, setPassword] = useState("");

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPhoneHandler = (event) => {
    setPhone(event.currentTarget.value);
  };
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

 

  const onSubmit = (event) => {
    event.preventDefault();
    if (!name || !phone || !email) {
      alert("모든 값을 정확하게 입력해주세요");
      return;
    }
 
    const userInfo = { name : name , phone: phone , email : email};
    
    //console.log("[로그인]", userInfo);
    

    axios.post( "http://127.0.0.1:9090/dangjang/member/findid", userInfo)
    .then( (res)=>{

      console.log(res.data);

      const { result, userid} = res.data;
       if (result === "success") {
         console.log("[로그인 성공] 세션에 아이디 저장");
         
         setMsg("회원님의 아이디는 " + userid + " 입니다");
         
         //closeModal(false);

         //window.location.reload();
       

        
       } else {
         setMsg("아이디를 찾을 수 없습니다.");
       }
     })
    .catch ( error=>{
      console.log(error);
    })

  };

  return (
    <Container>
      <Contents>
        <Title></Title>

        <div className="findregister">
          <form name="myform" onSubmit={onSubmit}>
            <img className="modalLogo" src={loginLogoPath} alt=""></img>

            <div>
              <input
                name="name"
                type="text"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={onNameHandler}
                className="loginregister__input"
                autocomplete="off"
              />
            </div>

            <div>
              <input
                name="phone"
                type="text"
                placeholder="전화번호를 입력하세요"
                value={phone}
                onChange={onPhoneHandler}
                className="loginregister__input"
                autocomplete="off"
              />
            </div>

            <div>
              <input
                name="email"
                type="text"
                placeholder="이메일 주소를 입력하세요"
                value={email}
                onChange={onEmailHandler}
                className="loginregister__input"
                autocomplete="off"
              />
            </div>

            <div>
              <button
                 type="submit"
                // onSubmit={onSubmit}
                className="findregister__button"
              >
                ID 찾기
              </button>
            </div>
            <br/>
            <CloseIcon
              className="btnX"
              onClick={() => closeFindIdModal(false)}
            ></CloseIcon>
          </form>
        </div>
      </Contents>
    </Container>
  );
}

export default FindIdModal;
