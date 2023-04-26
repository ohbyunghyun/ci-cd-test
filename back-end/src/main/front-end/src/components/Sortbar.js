import React, { useEffect, useState } from "react";
import axios from "axios";

function Sortbar() {
  const [auth, setAuth] = useState(false);
  const Click = (param) => {
    console.log(param);
    axios
      .post(
        "http://localhost:8080/boards/sort",
        {},
        {
          params: {
            sort: param,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          if (window.location.pathname === "/Feed") {
            window.location.reload();
          } else {
            // Navigate("/Feed");
            window.location.href = "/Feed";
          }
        } else {
          console.log("에러");
        }
      })
      .catch((error) => {});
  };

  function handleClick(event) {
    event.preventDefault();
    window.location.reload();
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/boards/auth`)
      .then((response) => setAuth(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div id="tag-bar">
      <div id="tag" onClick={handleClick}>
        Random
      </div>
      <div id="tag" onClick={() => Click("hot")}>
        HOT
        <div
          id="tag-image"
          style={{
            backgroundImage: `url(/campfire.png)`,
            backgroundSize: "cover",
          }}
        ></div>
      </div>
      <div id="tag" onClick={() => Click("recent")}>
        Recently
        {/* <div
          id="tag-image"
          style={{
            backgroundImage: `url(/history.png)`,
            backgroundSize: "cover",
          }}
        ></div> */}
      </div>
      {auth && (
        <div id="tag" onClick={() => Click("follow")}>
          Follow
          {/* <div
          id="tag-image"
          style={{
            backgroundImage: `url(/follower.png)`,
            backgroundSize: "cover",
          }}
        ></div> */}
        </div>
      )}
    </div>
  );
}

export default Sortbar;
