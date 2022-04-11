/* eslint-disable jsx-a11y/anchor-has-content */
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TableRow from './board/TableRow'
import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const MoviesBox = styled.div`
  .Category {
    white-space: nowrap;
    max-width: 1320px;
    padding: 12px 0 14px;
    overflow: hidden;
    text-overflow: ellipsis;z
    max-height: 60px;
    line-height: 30px;

    @media ${(props) => props.theme.mobile} {
      padding-top: 0px;
    }
  }

  .Category p {
    color: #292a32;
    font-size: 22px;
    font-weight: 900;
    letter-spacing: -0.4px;
    line-height: 30px;

    @media ${(props) => props.theme.mobile} {
      font-size: 25px;
    }
  }
`;

const EventBox = styled.div`

p {
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
  text-align : center;

  .listbox{
    padding-right : 0px;
  }

  .list{
    display: inline-block;
    width : 20%;
    height: 100%;
  }  

  li {
    list-style: none;
  }

  img {
    display: inline-block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  a {
    display: inline-block;
    text-decoration: none;
    margin: 0px 8px;
  }

  a:link { color: black; text-decoration: none;}
  a:visited { color: black; text-decoration: none;}
  a:hover { color: black; text-decoration: none;}
 

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

  p {
    margin: 0;
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

function MarketList() {
  const [board, setBoard] = useState([])
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState([]);
  const [loading, setLoading]=useState(false);
  const settings = {
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 3,
          arrows: false,
        },
      },
    ],
  };

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
  loadData(1);
  }, []);

  return (
    <>
      <MoviesBox>
        <div className="Category">
        <p>최신 물품</p>
        </div>
        <BoardSlider>
          <div className="listbox">
            {
              board.map(function(object, i){
                  return <TableRow obj={object} key={i} totalCnt={totalCnt} />
              })
            }
          </div>
        </BoardSlider>
      </MoviesBox>
     
    </>
  );
}

export default MarketList;
