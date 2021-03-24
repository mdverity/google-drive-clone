import React from "react";
import Navbar from "./Navbar";
import { Container } from "react-bootstrap";
import { useFolder } from "../../hooks/useFolder";
import AddFolderButton from "./AddFolderButton";

const Dashboard = () => {
  const { folder } = useFolder("vQmqCpcxNY1RsAEUOp9M");
  console.log(folder);
  return (
    <>
      <Navbar />
      <Container fluid>
        <AddFolderButton currentFolder={folder} />
        Content
      </Container>
    </>
  );
};

export default Dashboard;
