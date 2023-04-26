import React from "react";


function StyleButton(props) {

return (
  <div 
  onMouseDown={(event)=>{props.handleClick(event, props.setStyle)}}
  style={{width: '50px', height: '50px', backgroundColor: 'white'
  }}>
  </div>
);

}

export default StyleButton;