/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const MoviesSlider = styled.div`
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

  

  .Movie,
  img {
    border-radius: 5px;
    

  }



  .MovieInfo {
    font-size: 12px;
    text-align: left;
    width: calc(100% - 10px);
    margin: 5px 10px 0 0;
  }

  .MovieInfo p {
    color: #292a32;
    margin: 0;
    font-size: 14px;
    font-weight: 400;
  }

  .MovieInfo__name {
    font-size: 16px !important;
    font-weight: bold !important;
  }

  .MovieInfo__average {
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

function MarketList() {


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

 

  return (
    <>
            
         
    
      <MoviesBox>
        <div className="Category">
        <p>최신 물품</p>
         
        </div>
        <MoviesSlider>
          <div className="listbox">
          
              <a href="#!"></a>
          </div>
        </MoviesSlider>
      </MoviesBox>
     
    </>
  );
}

export default MarketList;
