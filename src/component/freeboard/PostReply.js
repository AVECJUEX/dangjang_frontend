import { Avatar, Box } from "@material-ui/core";
import { DeleteForeverRounded } from "@material-ui/icons";
import React from "react";


const PostReply = ({props}) => {
  const { fbco_seq, user_seq, free_seq, content, wdate, userid } = props;
  console.log(user_seq, content);
  return (
    <Box sx={{ display: "flex", alignItems: "center", width:"100%"}}>
      
      <Box
        sx={{
          float: "left",
          width: "800px",
          height : "70px",
          border: "solid #e9e9e9 1px",
          backgroundColor: "#e9e9e9",
          margin: "0px 10px 10px 0px",
          padding: "6px",
          borderRadius: "10px",
          display: "flex",
          lineHeight: "32px",
          marginBottom: "15px",
          textDecoration: "none",
          listStyle: "none",
          whiteSpace: "nowrap",
          color: "#292a32",
          fontWeight: "bolder",
          letterSpacing: "-0.4px",
          lineHeight: "30px",
          textAlign : "center",
          verticalAlign : "middle"
        }}

       
      >
        <Avatar src={""} style={{margin:"10px 10px 10px 10px"}} />
        <Box sx={{ width: "100px",    marginTop: '14px', marginLeft:'15px'  }}>{userid}</Box>
        <Box sx={{ width: "300px",    marginTop: '14px'  }}>{content}</Box>
        <Box sx={{ width: "200px" ,    marginTop: '14px'}}>{wdate}</Box>
        
      </Box>
      <DeleteForeverRounded
        style={{ marginLeft: "5px", marginBottom: "12px", cursor: "pointer" }}
      />
    </Box>
  );
};

export default PostReply;
