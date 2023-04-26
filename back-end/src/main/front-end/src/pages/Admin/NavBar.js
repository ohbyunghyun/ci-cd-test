import React from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import MemberList from "./MemberList";
import BoardList from "./BoardList";
import CommentList from "./CommentList";

function NavBar() {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <LinkContainer to="/admin/member">
          <Nav.Link eventKey="link-1">회원 목록</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/admin/board">
          <Nav.Link eventKey="link-2">게시물 목록</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/admin/comment">
          <Nav.Link eventKey="link-3">댓글 목록</Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  );
}

export default NavBar;
