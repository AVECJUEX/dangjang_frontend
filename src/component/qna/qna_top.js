import React from "react";

import { Routes, Route, Outlet, Link, NavLink } from "react-router-dom";




function QnaTop() {
 
  
  return(
    
    <div style={{display : 'inline-block', width : '78%', marginLeft:'7%', padding : '0px', verticalAlign: 'top'}}>
     <Link to="/" className="qnalist">Q. 커뮤니티 가이드 라인</Link>      
     <Link to="/" className="qnalist"  >Q. 중고거래 운영정책</Link>      
     <Link to="/" className="qnalist"  >Q. 당장마켓에서 지킬 매너</Link>      
     <Link to="/" className="qnalist"  >Q. 판매 금지 물품</Link>      
     <Link to="/" className="qnalist"  >Q. 왁자지껄 게시판이 뭔가요??</Link>      
     <Link to="/" className="qnalist"  >Q. 중고거래 게시판 거래 및 환불정책</Link>      
     <Link to="/" className="qnalist"  >Q. 작성한 게시글이 보이지 않아요</Link>      
     <Link to="/" className="qnalist"  >Q. 다른 프로필로 전환하고 싶어요</Link>      
  </div>
  );
}

export default QnaTop;