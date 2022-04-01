import React from "react";

import Input from "../Input";
import Label from "../Label";
import { Routes, Route, Outlet, Link, NavLink } from "react-router-dom";






function QnaHeader() {
 
  return (
    <div>
    <h1>자주 묻는 질문</h1>
    <Label width="100%" padding="12px 15px 11px 46px">
        <Input
          name="search"
          placeholder="질문을 해보세요."
        />
    </Label>
    <br></br>
   
    </div>
  );
}

export default QnaHeader;