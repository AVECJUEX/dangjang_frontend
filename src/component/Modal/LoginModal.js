import React, { useState, useEffect } from "react";
import styled from "styled-components";
import loginLogoPath from "../../IMG/logo.png";
import closePath from "../../IMG/close.png";
import "../member/LoginRegister.css";
import CloseIcon from "@mui/icons-material/Close";
import { Routes, Route, Outlet, Link, NavLink } from "react-router-dom";
import FindIdModal from "./FindIdModal";
import FindPwModal from "./FindPwModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserDispatch } from "../member/UserContext";

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
    width: 95%;
    border-radius: 40px;
    height: 48px;
    margin-top: 10px;
  }
 
  .modalLogo {
    object-fit: cover;
    width: auto;
    height: 100px;
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

function LoginModal({ closeModal }) {
  
  let history = useNavigate ();
  
  const [openFindIdModal, setOpenFindIdModal] = useState(false);
  const [openFindPwModal, setOpenFindPwModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useUserDispatch();
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");

  const onUseridHandler = (event) => {
    setUserid(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   // ????????? ???????????? user ??? ???????????? ??????
  //   // ?????? context api ??? ???????????? ????????? ????????? ?????????
  //   // ????????? ?????? ????????? provider ??? ????????? ???..

  //   // ????????? ????????? ??????
  //   // ????????? alert ???
    
  //   // ??? ????????? ?????????FindId, Findpw ??? ???????????? ????????? ????????????
  //   // ????????? ??????  -> ?????????FindId ??????

  // };


  const onSubmit = (event) => {
    event.preventDefault();
    if (!userid || !password) {
      alert("?????? ?????? ???????????? ??????????????????");
      return;
    }
 
    const userInfo = { userid: userid, password: password };
    console.log("[?????????]", userInfo);
    

    axios.post( "http://127.0.0.1:9090/dangjang/member/login", userInfo)
    .then( (res)=>{

      console.log(res.data);

      const { result, role, nickname , username , email, user_seq } = res.data;
       if (result === "success") {
         console.log("[????????? ??????] ????????? ????????? ??????");
         alert("????????? ??????");
         window.sessionStorage.setItem("userid", userid);
         window.sessionStorage.setItem("user_seq", user_seq);
         window.sessionStorage.setItem("role", role);
         window.sessionStorage.setItem("nickname", nickname);
         window.sessionStorage.setItem("username", username);
         window.sessionStorage.setItem("email", email);
         closeModal(false);

         window.location.reload();
       

        
       } else {
         alert("????????? ??????");
       }
    })
    .catch ( error=>{
      console.log(error);
    })

  };

  const onKeyPress=(e)=>{
    if(e.key==='Enter'){
    alert("");
    
    };
  }

  return (
    <Container>
      <Contents>
        <Title></Title>

        <div className="loginregister">
          <form>
            <img className="modalLogo" src={loginLogoPath} alt="" ></img>
            <div>
              <input
                name="userid"
                type="text"
                placeholder="???????????? ??????????????????"
                value={userid}
                onChange={onUseridHandler}
                className="loginregister__input"
                autocomplete="off"
                onKeyPress={onkeypress}
                
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="??????????????? ??????????????????"
                value={password}
                onChange={onPasswordHandler}
                className="loginregister__input"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={onSubmit}
                className="loginregister__button"
              >
                ?????????
              </button>
            </div>
            <div>
              <Link to="/register">
                <button
                  // type="submit"
                  className="findregister__button"
                  onClick={() => closeModal(false)}
                >
                  ????????????
                </button>
              </Link>
              &nbsp;&nbsp;
              
              <button
                className="findregister__button"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenFindIdModal(true);
                }}
              >
                ID ??????
              </button>
                
                &nbsp;&nbsp;
              <button
                className="findregister__button"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenFindPwModal(true);
                }}
              >
                Pw ??????
              </button>
            </div>
            <br/>
            <CloseIcon
              className="btnX"
              onClick={() => closeModal(false)}
            ></CloseIcon>
          </form>
        </div>
        {openFindIdModal && <FindIdModal closeFindIdModal={setOpenFindIdModal} />}
        {openFindPwModal && <FindPwModal closeFindPwModal={setOpenFindPwModal} />}
      </Contents>
    </Container>
  );
}

export default LoginModal;
