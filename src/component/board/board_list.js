import TableRow from './TableRow'
import React, { useState, useEffect, useCallback, Fragment } from "react";
import styled from "styled-components";
import { Link, useNavigate  } from "react-router-dom";
import { useInView } from "react-intersection-observer"
import Axios from "axios";
import "../../page.css";
import { useUserState } from '../member/UserContext';
import LoginModal from "../Modal/LoginModal";


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
  .btn {
    color: #fff;
    background-color: #6667ab;
    border-color: #6667ab;
  }
  a{
    font-size:10px;
  }
`;

const BoardSlider = styled.div`
  position: relative;
  transform: translate3d(0px, 0px, 0px);
  margin: 20px 0px;
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

function BoardList(){
    const [board, setBoard] = useState([]) //게시글
    const [totalCnt, setTotalCnt] = useState([]); //전체 레코드 개수
    const [page, setPage] = useState(1);
    const [loading, setLoading]=useState(false); //로딩 중을 띄우고싶었지만 안씀
    const [empty, setEmpty] = useState(false);
    const [keyword, setKeyword] = useState("");

    const [ref, inView] = useInView()

    let history = useNavigate ();

    const getboard = useCallback(async () => {
      console.log("getboard----", page, keyword)
      setLoading(true);

      if(keyword===undefined){
        keyword="";
      }
      await Axios.get(`http://localhost:9090/dangjang/board/list/`+page+'?keyword='+keyword).then((res)=>{
      console.log(res.data);
      console.log(res.data.list.length);

      if(res.data.list.length!=0){

        setTotalCnt(res.data.totalCnt);
        setBoard(prevState => [...prevState, ...res.data.list]);
        
      } else {
        setEmpty(true);
      }
      
      })
      setLoading(false)
    }, [page]);

      useEffect( ()=>
      {
        getboard()
      }, [page, keyword]);


      useEffect(() => {
        console.log(inView, !loading, !empty, page)
        if (inView && !loading && !empty) {
          setPage(prevState => prevState + 1)
        }
      }, [inView, loading])

      const onClickCode = (keyword) => {
        console.log(keyword);
        setBoard([]);
        setPage(1);
        setKeyword(keyword);
        setEmpty(false);
      }
      // 세션 가져와서 사용하는 함수
      const { user } = useUserState();
      useEffect(()=>{
        console.log(user);
      },[user]);

      const [openModal, setOpenModal] = useState(false);

      const clickWrite = () =>{
        if(user!=null){
          history("/board/write");
        } else {
          alert("로그인하세요");
          setOpenModal(true);
        }
      }
      //여기까지
      return (
        <BoardBox>
          <div className="Category">
            <p>
              <strong>물품 목록</strong>
              <button style={{float:'right'}} onClick={clickWrite}>글쓰기</button>
              {openModal && <LoginModal closeModal={setOpenModal} />}
            </p>
          </div>
          <hr style={{margin:'-5px'}}/>
          {
            totalCnt.map(({category_code, category_name, catCnt})=>{
              console.log(category_code,category_name,catCnt );
              if(category_code=='00') category_code='';
              return <a onClick={()=>onClickCode(category_code)}><strong>{category_name}({catCnt})</strong>&nbsp;&nbsp;&nbsp;&nbsp;</a>
            })
          }
          <BoardSlider >
            <div className="listbox" >
                {
                  board.map((object, i) => 
                     <Fragment key={i}>
                      {board.length - 1 === i ?                        
                      (<span ref={ref}><TableRow obj={object} key={i}/></span>):
                      
                      (<TableRow obj={object} key={i}/>)
                      }
                     </Fragment>
                  )
                }
            </div>
          </BoardSlider>
        </BoardBox>
      );
}

export default BoardList;