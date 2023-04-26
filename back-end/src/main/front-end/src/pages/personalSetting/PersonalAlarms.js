import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AlarmInfo from "./AlarmInfo";
import "./PersonalAlarms.css";

function PersonalAlarms() {
  const navigate = useNavigate();
  const [alarms, setAlarms] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/alarm").then((response) => {
      if (response.data.status === "failure") {
        navigate("/");
      }
      setAlarms(response.data);
    });
  }, [navigate]);

  return (
    <div
      id="setting-feild"
      style={{
        cursor: "default !important",
        width: "100%",
        height: "100%",
        overflowY: "auto",
        margintop: "0",
        float: "left",
        color: `var(--aim-text-default)`,
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
        전체 알람
      </div>
      <div
        style={{
          width: "fit-content",
          height: "fit-content",
          margin: "auto",
          display: "flex",
          // backgroundColor: "#2e2e2e",
        }}
      >
        <div
        // style={{ marginTop: "3%" }}
        >
          {alarms.logData &&
            alarms.logData.map((alarm) => {
              return (
                <AlarmInfo
                  key={alarm.log.logNo}
                  data={alarm}
                  receiver={alarms.receiver}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default PersonalAlarms;
