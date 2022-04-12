import * as React from "react";
import Headers from "./component/Headers";
import EventContainer from "./component/EventContainer";
import MarketList from "./component/MarketList";
import styled from "styled-components";
import "./App.css";
import "./CSS/reset.css";
import { Routes, Route, Outlet } from "react-router-dom";
import BoardList from "./component/board/board_list";
import BoardWrite from "./component/board/board_write";
import BoardView from "./component/board/board_view";
import BoardUpdate from "./component/board/board_update";

import FreeBoardList from "./component/freeboard/freeboard_list";
import FreeBoardWrite from "./component/freeboard/freeboard_write";
import FreeBoardView from "./component/freeboard/freeboard_view";

import QnaList from "./component/qna/qna_list"
import QnaView from'./component/qna/qna_view';
import QnaWrite from'./component/qna/qna_write';
import QnaCommentWrite from "./component/qna/qnacomment_write";
import QnaUpdate from "./component/qna/qna_update"


import MyList from "./component/mypage/my_list"

import RegisterPage from "./component/member/RegisterPage"

import LoginModal from "./component/Modal/LoginModal";
import LoginPage from "./component/member/LoginPage";
import FindIfModal from "./component/Modal/FindIdModal";
import { useUserDispatch } from "./component/member/UserContext";

import PZoomImage from "./component/board/util/PZoomImage";
import Modal from "./component/board/util/Modal";


const MarketContainer = styled.section`
  margin: 60px 0 0 auto;
  width: 100%;
`;

const MainPageContainer = styled.div`
  margin: 0 auto;
  width: 70%;
  animation: backColor 1s;

  @keyframes backColor {
    0% {
      opacity: 0;
      display: block;
    }
    50% {
      opacity: 0;
    }
    100% {
      display: none;
    }
  }

  @media ${(props) => props.theme.tablet} {
    width: 90%;
  }
`;

function App() {
  const dispatch = useUserDispatch();

  React.useEffect(()=>{
    if( window.sessionStorage.getItem("userid")!=null){
      dispatch({
        type: "LOGIN",
        userid: window.sessionStorage.getItem("userid"),
      });
    }
  },[]);  


  return (
    <>
      <div className="App">
        <Headers></Headers>
        <MainPageContainer>
          <MarketContainer>
            <Routes>

            <Route exact path="/"  element={<Layout />} />

              <Route path="board" element={<BoardList />} />
              <Route path="board/write" element={<BoardWrite />} />
              <Route path="board/view/:board_seq" element={<BoardView />} />

              <Route path="board/update/:board_seq" element={<BoardUpdate />}/>
              <Route path="board/view/modal" element={<Modal />} />

              <Route path="freeboard" element={<FreeBoardList />} />
              <Route path="freeboard/write" element={<FreeBoardWrite />} />
              <Route path="/freeboard/view/:board_seq" element={<FreeBoardView/>}/>


              <Route exact path="qna/*" element={<QnaList/>}/>
              <Route exact path="qna/write" element={<QnaWrite/>}/>
              <Route path="/qnaUpdate/:qna_seq" element={<QnaUpdate/>}/>
              <Route path="/qnacommentwrite/:qna_seq"  element={<QnaCommentWrite/>} />
 
              
              {/*회원가입  */}
              <Route path="register" element={<RegisterPage />} />
              <Route path="loginmodal" element={<LoginModal />} />
              <Route path="loginpage" element={<LoginPage />} />
              <Route path="findIdmodal" element={<FindIfModal />} />
              
              {/* 마이페이지 */}
              <Route exact path="mypage/*" element={<MyList/>}/>


              <Route path="test" element={<PZoomImage />} />
              
            </Routes>
          </MarketContainer>
        </MainPageContainer>
      </div>
    </>
  );
}

function Layout() {
  return (
    <div>
      <EventContainer />
      <MarketList />
      <Outlet />
    </div>
  );
}

export default App;

/*
useHistory
useLocation
useRouteMatch
useParams

*/
