
import TableRow from './TableRow'
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../../page.css";

const BoardBox = styled.div`
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
`;
const BoardSlider = styled.div`
  position: relative;
  transform: translate3d(0px, 0px, 0px);
  margin: 0px -8px;

  .listbox{
    padding-right : 0px;
  }

  .list{
    display: inline-block;
    width : 20%;
    height: auto;
  }  

  li {
    list-style: none;
  }

  img {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
  }

  a {
    display: inline-block;
    text-decoration: none;
    margin: 0px 8px;
  }

  .Board,
  img {
    border-radius: 5px;
  }

  .BoardInfo {
    font-size: 12px;
    text-align: left;
    width: calc(100% - 10px);
    margin: 5px 10px 0 0;
  }

  .BoardInfo__title {
    font-size: 16px !important;
    font-weight: bold !important;
  }

  .BoardInfo__price {
    color: #555765;
  }

  .slick-prev:before,
  .slick-next:before {
    position: absolute;
    left: 0px;
    top: -100%;
    color: black;
  }

  .slick-slider {
    display: flex;
    justify-content: center;

    .slick-prev.slick-disabled:before,
    .slick-next.slick-disabled:before {
      display: none;
    }
  }
`;

function BoardList( ){
     const [board, setBoard] = useState([]) //게시글
     const [totalCnt, setTotalCnt] = useState(0); //전체 레코드 개수
     const [loading, setLoading]=useState(false); //로딩 중을 띄우고싶었지만 안씀

      const loadData = async (page) => {
        setLoading(true);
        const res = await Axios.get('http://localhost:9090/dangjang/board/list/'+page);
        console.log(res.data);
        setTotalCnt(res.data.totalCnt);
        setBoard(res.data.list);
        setLoading(false);
      }

     useEffect( ()=>
     {
      loadData(1);    //첫번째 페이지 데이터 가져와서 화면에 뿌리기  
     }, []);
      
      return (
        <BoardBox>
          <div className="Category">
            <p>최신 물품</p>
          </div>

          <BoardSlider>
            <div className="listbox">
                {
                  board.map(function(object, i){
                    return <TableRow obj={object} key={i} totalCnt={totalCnt}/>
                  })
                }
            </div>
          </BoardSlider>
          <Link className="btn btn-danger" to="/board/write">글쓰기</Link>
        </BoardBox>
      );
}

export default BoardList;



/*

무한스크롤 구현하기 
yarn add react-intersection-observer

*/