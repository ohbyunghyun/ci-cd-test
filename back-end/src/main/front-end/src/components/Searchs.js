import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

function Searchs(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log("검색어: ", searchTerm);
    axios
      .post(
        "http://localhost:8080/boards/keyword",
        {},
        {
          params: {
            keyword: searchTerm,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          if (window.location.pathname === "/Feed") {
            window.location.reload();
          } else {
            window.location.href = "/Feed";
          }
        } else {
          console.log("에러");
        }
      })
      .catch((error) => {});
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Form className="d-flex ms-3">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        style={{
          borderRadius: "0",
          backgroundColor: `var(--aim-base-tone)`,
          color: `var(--aim-text-default)`,
        }}
        aria-label="Search"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant="success"
        style={{
          borderRadius: "0",
        }}
        onClick={handleSearch} // 버튼 클릭 이벤트에 handleSearch 함수 등록
      >
        Search
      </Button>
    </Form>
  );
}

export default Searchs;
