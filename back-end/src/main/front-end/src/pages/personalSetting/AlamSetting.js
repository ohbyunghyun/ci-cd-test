import React, { useState, useEffect } from "react";
import axios from "axios";
import SettingPrompt from "./SettingPrompt";
import { BellFill, BellSlashFill } from "react-bootstrap-icons";

function AlamSetting(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/alarmSetting").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div
      id="setting-feild"
      style={{
        cursor: "default !important",
        display: "block",
        fontsize: "16px",
        float: "left",
        // justifycontent: "center ",
        // margin: "auto",
        margintop: "0",
        width: "100%",
        height: "100%",
        color: `var(--aim-text-default)`,
        // backgroundColor: `#2e2e2e`,
      }}
    >
      <div
        style={{
          width: "fit-content",
          marginBottom: "60px",
          borderBottom: `1px solid var(--aim-border)`,
          color: `var(--aim-text-default)`,
          fontSize: "30px",
          // backgroundColor: `yellow`,
        }}
      >
        {props.title}
      </div>

      <div
        style={{
          width: "fit-content",
          height: "fit-content",
          margin: "auto",
          display: "flex",
          // backgroundColor: "gray",
        }}
      >
        <div
        // style={{ marginTop: "3%" }}
        >
          {data.length > 0 &&
            data.map((settingList) => (
              <SettingPrompt
                key={settingList.typeNo}
                classKey={settingList.typeNo}
                data={{
                  typeNo: settingList.typeNo,
                  title: settingList.typeName,
                  description: settingList.description,
                  rangeState: settingList.memberNo === 0 ? 1 : 2,
                  memberNo: settingList.memberNo,
                }}
                settingType={"alarmSetting"}
                isFlag={true}
                requestBody={{ typeNo: "", memberNo: "" }}
                stateArray={[1, 2]}
                settingIcon={[<BellSlashFill />, <BellFill />]}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default AlamSetting;
