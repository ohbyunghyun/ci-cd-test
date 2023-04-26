import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedList from "./FeedList";

function List(props) {
  const [data, setData] = useState([]);
  const [auth, setAuth] = useState(false);
  const [keyState, setKeyState] = useState(true);

  function isScrolledToBottom() {
    return (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    );
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/boards/auth`)
      .then((response) => setAuth(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (isScrolledToBottom()) {
        loadData();
      }
    }

    if (keyState) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data]);

  async function loadData() {
    const currentPage = Math.ceil(data.length / 10) + 1;
    const response = await axios.get("http://localhost:8080/boards", {
      params: {
        currentPage: currentPage,
      },
    });
    setKeyState(response.data.key);

    if (response.data.state) {
      const randomData = response.data.data.sort(() => Math.random() - 0.5);
      setData((prevData) => [...prevData, ...randomData]);
    } else {
      const newData = response.data.data;
      setData((prevData) => [...prevData, ...newData]);
    }
  }

  return (
    <div id="feed-main">
      {data.map((item, index) => (
        <FeedList
          key={index}
          item={item}
          auth={auth}
          loginShow={props.loginShow}
          setLoginShow={props.setLoginShow}
          signupShow={props.signupShow}
          setSignupShow={props.setSignupShow}
          isLoginModal={props.isLoginModal}
          setIsLoginModal={props.setIsLoginModal}
          showExternalLogin={props.showExternalLogin}
          setShowExternalLogin={props.setShowExternalLogin}
        />
      ))}
    </div>
  );
}

export default List;
