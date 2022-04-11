import React, { useState } from "react";
import "./LoginRegister.css";
import loginLogoPath from "../../IMG/logo.png";
import { useNavigate } from "react-router-dom";
import { useUserDispatch } from "./UserContext";
import axios from "axios";

function LoginPage() {
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

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!userid || !password) {
      alert("모든 값을 정확하게 입력해주세요");
      return;
    }
 
    const userInfo = { userid: userid, password: password };
    console.log("[로그인]", userInfo);
    try {
      //const { data } = await axios.post( "http://127.0.0.1:9090/dangjang/member/login", userInfo);
      //const { result, user, msg } = data;

      // 임시 데이터
      const result="success";
      const user = "test1";
      const msg = "로그인 성공!!!!"

      alert(msg);
      if (result === "success") {
        console.log("[로그인 성공] 세션에 아이디 저장");
        window.sessionStorage.setItem("userid", user.userid);

        dispatch({
          type: "LOGIN",
          userid: userid,
        });

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div class="loginregister">
      <form>
        <img src={loginLogoPath} alt=""></img>
        <div>
          <input
            name="userid"
            type="text"
            placeholder="아이디를 입력해주세요"
            value={userid}
            onChange={onUseridHandler}
            class="loginregister__input"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={onPasswordHandler}
            class="loginregister__input"
          />
        </div>
        <div>
          <input
            type="submit"
            onSubmit={onSubmit}
            // class="loginregister__button"
          ></input>
        </div>
        <div>
          <button
            type="submit"
            onSubmit={onSubmit}
            class="loginregister__button"
          >
            회원가입
          </button>
        </div>
        <div>
          <button
            type="submit"
            onSubmit={onSubmit}
            class="loginregister__button"
          >
            ID/PW 찾기
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
