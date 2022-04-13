import { Avatar, Box } from "@material-ui/core";
import { DeleteForeverRounded } from "@material-ui/icons";
import React from "react";

const PostReply = ({ profile_url, writer, contents }) => {
  console.log(writer, contents);
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          float: "left",
          width: "500px",
          border: "solid #e9e9e9 1px",
          backgroundColor: "#e9e9e9",
          margin: "0px 10px 10px 0px",
          padding: "6px",
          borderRadius: "10px",
          display: "flex",
        }}
      >
        <Avatar src={profile_url} />
        <Box sx={{ width: "100px", marginLeft: "10px" }}>{writer}</Box>
        <Box sx={{ width: "400px", marginLeft: "10px" }}>{contents}</Box>
      </Box>
      <DeleteForeverRounded
        style={{ marginLeft: "5px", marginBottom: "12px", cursor: "pointer" }}
      />
    </Box>
  );
};

export default PostReply;
