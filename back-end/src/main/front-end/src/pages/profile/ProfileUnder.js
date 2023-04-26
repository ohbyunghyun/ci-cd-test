import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedList from "../Feed/FeedList";

function ProfileUnder(props) {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/boards/auth`)
      .then((response) => setAuth(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div id="feed-main">
      {props.boards.map((board) => (
        <FeedList
          key={board.boardNo}
          item={board}
          auth={auth}
          directModal={
            props.directModal && props.directModal.no === board.boardNo
              ? props.directModal
              : undefined
          }
        />
      ))}
    </div>
  );
}

export default ProfileUnder;
