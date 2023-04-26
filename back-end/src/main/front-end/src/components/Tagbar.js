import React from "react";

function Tagbar() {
  return (
    <div id="tag-bar">
      <div id="tag">
        HOT
        <div
          id="tag-image"
          style={{
            backgroundImage: `url(/campfire.png)`,
            backgroundSize: "cover",
          }}
        ></div>
      </div>
      <div id="tag">Animal</div>
      <div id="tag">Anime</div>
      <div id="tag">Fashion</div>
      <div id="tag">Food</div>
      <div id="tag">Landscapes</div>
      <div id="tag">Sci-Fi</div>
    </div>
  );
}

export default Tagbar;
