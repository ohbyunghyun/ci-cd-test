import React, {useState, useEffect} from "react";
import axios from "axios";
import "./SettingPrompt.css"

function SettingPrompt(props) {
  const {classKey, data, stateArray, settingType, requestBody, settingIcon} = props;
  const [selectedValue, setSelectedValue] = useState(data.rangeState === 0 ? 1 : data.rangeState);
  const [hideState, setHideState] = useState(selectedValue === 1 ? false : true);
  const root = document.querySelector(':root');
  const controlClass = "selected-setting" + classKey
  const [ajaxFlag, setAjaxFlag] = useState(true);
  useEffect(() => {
    document.querySelector(`.${controlClass}`).style.left = `${((data.rangeState === 0 ? 1 : data.rangeState ) - 1) * 30}px`;
  }, [controlClass, data.rangeState]);

  const handleButtonClick = (target) => {
    const selectedNo = target.getAttribute("data-select-value");

    const moveValue = selectedNo === '1' ? 1 : -1;
    selectedNo === '1' ? setHideState(true) : setHideState(false);
    let movePx = 30 * parseInt(moveValue);
    root.style.setProperty('--slide-side-distance', `${movePx}px`);
    
    const selectedPosition = target.parentNode.querySelector(`.${controlClass}`);
    selectedPosition.classList.add("slide-side");

    setTimeout(()=> {
      selectedPosition.classList.remove("slide-side");
      selectedPosition.style.left = `${parseInt(getComputedStyle(selectedPosition).left.replace(/\D/g, "")) + movePx}px`;
      setAjaxFlag(true);
    }, 200);

    target.setAttribute("data-select-value", selectedNo === 1 ? 2 : 1);
    requestBody[Object.keys(requestBody)[0]] = data.typeNo;
    requestBody[Object.keys(requestBody)[1]] = selectedNo === '1' ? 2 : 1;
    //요기서 패치
    data.memberNo === 0 ?
    axios.post(`http://localhost:8080/${settingType}`, requestBody) :
    (props.isFlag ? axios.delete(`http://localhost:8080/${settingType}/${requestBody[Object.keys(requestBody)[0]]}`)
    : axios.put(`http://localhost:8080/${settingType}`, requestBody));
    
    setSelectedValue(selectedNo === '1' ? 2 : 1);  //이거 왜이렇게 늦게들어감?
  };


  return (
    <div id="setting-prompt" style={{
      position: "relative", marginBottom: "20px",
      boxSizing: "border-box", borderBottom: "1px solid"
    }}>
      <div style={{width: "400px"}}>
        <div style={{fontSize: "x-large"}}><b>{data.title}</b></div>
        <div style={{fontSize: "small", color:`var(--aim-text-sub)`}}>{data.description}</div>
      </div>

      <div id="setting-type-btn" data-select-value={selectedValue} 
        onClick={(event) => {
          if (ajaxFlag === true) {
            setAjaxFlag(false);
            handleButtonClick(event.currentTarget);
          }
        }}
        style={{position: "absolute", top: "5px", right: "0",
        backgroundColor : hideState ? `var(--aim-emphasis-red)` : `var(--aim-fill-green)`
        }}>
        {stateArray.map((value) => (
          <div key={value} data-value={value}></div>
        ))}
      <div className={controlClass}>
        {hideState ? settingIcon[0] : settingIcon[1]}
      </div>
      </div>

    </div>
  );
}

export default SettingPrompt;
