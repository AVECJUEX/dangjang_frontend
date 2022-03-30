
import * as React from "react";
import Headers from './component/Headers';
import EventContainer from './component/EventContainer';
import MoviesSliderContainer from './component/MarketList';
import styled from "styled-components";
import './App.css';
import "./CSS/reset.css";
import { Routes, Route, Outlet, Link, NavLink } from "react-router-dom";
import BoardList from'./component/board/board_list';


const MoviesContainer = styled.section`
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
  return (
    <>
   
      <div className="App">
          <Headers></Headers>
          <MainPageContainer>

           <MoviesContainer>
          <EventContainer></EventContainer>
              
            <Routes>
              <Route path="/"  element={<Layout />} />
              <Route path="board" element={<BoardList />} />
            </Routes>
           </MoviesContainer>

        </MainPageContainer>
      </div>
    </>
  );
}


function Layout() {
 
return (
  <div >
  

        
        
          <MoviesSliderContainer>

        </MoviesSliderContainer>
       
       
    <Outlet/>
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