import styled from "styled-components";
import React, {useRef,useEffect, useState } from "react";

import LogoPath from "../IMG/logo.png";
import Input from "./Input";
import Label from "./Label";
import LoginModal from "./Modal/LoginModal";
import { Link, NavLink } from "react-router-dom";
import { useUserDispatch, useUserState } from "./member/UserContext";
// import styles from "styles/components/DropDown.module.scss";
// import classNames from "classNames";
import useDetectClose from "./hooks/useDetectCLose";






const HeaderContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: #ffff;
  width: 100%;
  height: 62px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 0px 0px;
  z-index: 10;
`;

const HeaderBox = styled.div`
  margin: 0 auto;
  width: 70%;
  height: 100%;
  @media ${(props) => props.theme.tablet} {
    width: 90%;
    margin: 0 auto;
  }
  .Category {
    position: relative;
    height: 100%;
  }
  .MainUl {
    display: flex;
    align-items: center;
    height: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  ul :first-child {
    margin-left: 0px;
  }
  li {
    margin-left: 24px;
    list-style: none;
    white-space: nowrap;
    color: #292a32;
    font-size: 17px;
    font-weight: 900;
    letter-spacing: -0.4px;
    line-height: 30px;
    //color : #6667AB;
  }
  .Header-Menu {
    text-decoration: none;
    margin-left: 24px;
    list-style: none;
    white-space: nowrap;
    color: #292a32;
    font-size: 19px;
    font-weight: 900;
    letter-spacing: -0.4px;
    line-height: 30px;
  }
  .Header-Menu:hover {
    font-size: 24px;
  }
  .Header-Menu-Active {
    text-decoration: none;
    margin-left: 24px;
    list-style: none;
    white-space: nowrap;
    color: #292a32;
    font-weight: 900;
    letter-spacing: -0.4px;
    line-height: 30px;
    font-size: 24px;
  }
  
  .right-content {
    display: flex;
    position: absolute;
    justify-content: flex-end;
    width: 50%;
    right: 0px;
  }

  button {
    cursor: pointer;
    background: transparent;
    color: rgb(116, 116, 123);
    font-size: 14px;
    min-width: 78px;
    width: auto;
    padding: 0px;
    border: 0px;
  }

  button.mainButton {
    cursor: pointer;
    display: inline-block;
    font-weight: 900;
    line-height: 1.5;
    color: #6667ab;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 3px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    border-color :#6667AB;
    transition: color .15s 
      ease-in-out,background-color .15s 
      ease-in-out,border-color .15s 
      ease-in-out,box-shadow .15s 
      ease-in-out;
    
  }

  button.sign-up {
    text-align: center;
    border-radius: 6px;
    font-weight: 500;
    line-height: 20px;
    box-sizing: border-box;
    width: auto;
    min-width: 86px;
    height: 32px;
    color: rgb(53, 53, 53);
    padding: 5px 14px 6px;
    border: 1px solid rgba(116, 116, 123, 0.5);
  }

  img {
    object-fit: cover;
    width: 151px;
    height: 37px;
  }

  li,label{
    display:flex;
    backgroundColor :#E6E6FA;

  }


`

;

function Headers() {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useUserState();
  const dispatch = useUserDispatch();
 



  useEffect(()=>{
    console.log('user 정보 ---> ', user);
  }, [user])

  const onClickLogout = () => {
    sessionStorage.clear();

    dispatch({
      type: "LOGOUT",
    });

    window.location.reload();
  }
  return (
    <HeaderContainer>
      <HeaderBox>
        <div className="Category">
          <ul className="MainUl">
       
            <li>
              <Link to="/">
                <img src={LogoPath} alt=""></img>
              </Link>
            </li>
            
            <li>
              🛒
              <NavLink
                to="/board"
                className={({ isActive }) =>
                  "Header-Menu" + (isActive ? "-Active" : "")
                }
              >
                
                마켓
              </NavLink>
            </li>
            <li>
              👨‍👨‍👧‍👧
              <NavLink
                to="/freeboard"
                className={({ isActive }) =>
                  "Header-Menu" + (isActive ? "-Active" : "")
                }
              >
                
                왁자지껄
              </NavLink>
            </li>
            <li>
              🗨️
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "Header-Menu" + (isActive ? "" : "")
                }
              >
                
                채팅
              </NavLink>
            </li>
            <li>
              ❕❔
              <NavLink
                to="/qna/qna/qna/qnatop"
                className={({ isActive }) =>
                  "Header-Menu" + (isActive ? "-Active" : "")
                }
              >
                
                질문
              </NavLink>
            </li>
            
            <div className="right-content">
              <ul className="MainUl">
                <li>
                  <Label width="300px" padding="12px 15px 11px 46px">
                    <Input
                      name="search"
                      placeholder="물품을 검색해보세요."
                      autocomplete="off"
                    />
                  </Label>
                </li>

                {user == null ? <li>
                  <button
                    className="mainButton"
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    로그인
                  </button>
                </li>
                :
                <>
                <li>
                <NavLink
                to="/mypage"
                // to={DropDown}
                className={({ isActive }) =>
                  "Header-Menu" + (isActive ? "-Active" : "")
                }
              >
                {" "}
                마이페이지
              
                </NavLink>
                </li>
                <li onClick={onClickLogout}>로그아웃</li>
                </>
                }
                
                <li></li>
              </ul>
            </div>
          </ul>
        </div>

        {openModal && <LoginModal closeModal={setOpenModal} />}
      </HeaderBox>
    </HeaderContainer>
  );
}

export default Headers;
