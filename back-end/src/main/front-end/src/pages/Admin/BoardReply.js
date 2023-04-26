import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsivePie } from "@nivo/pie";
import "./Stats.css";
import "react-datepicker/dist/react-datepicker.css";
import CustomDatePicker from "./CustomDatePicker";

const BoardReply = (props) => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate());
    return yesterday;
  });
  // console.log("selectedDate:", selectedDate);
  const fetchData = async (date) => {
    try {
      const dateString = date.toISOString().split("T")[0];

      // 게시물 요청 정보 출력
      const boardRequestUrl = `http://localhost:8080/boardreply/board/${dateString}`;
      // console.log("게시물 요청 URL:", boardRequestUrl);
      const boardResponse = await axios.get(boardRequestUrl);
      // console.log("게시물 응답 데이터:", boardResponse.data);

      // 댓글 요청 정보 출력
      const replyRequestUrl = `http://localhost:8080/boardreply/reply/${dateString}`;
      // console.log("댓글 요청 URL:", replyRequestUrl);
      const replyResponse = await axios.get(replyRequestUrl);
      // console.log("댓글 응답 데이터:", replyResponse.data);

      const formattedData = [
        {
          id: "게시글",
          label: "게시글",
          value: boardResponse.data.count,
          color: "hsl(186, 70%, 50%)",
        },
        {
          id: "댓글",
          label: "댓글",
          value: replyResponse.data.count,
          color: "hsl(252, 70%, 50%)",
        },
      ];

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    // console.log(
    //   "선택된 날짜:",
    //   date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })
    // );
    setSelectedDate(date);
  };

  // 오늘로 가는 버튼을 누르면 실행되는 함수입니다.
  const handleTodayButtonClick = () => {
    const today = new Date();
    setSelectedDate(today);
  };

  // 오늘 날짜를 maxDate 변수에 저장
  const maxDate = (() => {
    const today = new Date();
    today.setDate(today.getDate());
    return today;
  })();

  return (
    <div
      id="BoardReply"
      style={
        {
          // backgroundColor: "gray",
        }
      }
    >
      <div
        style={{
          width: "fit-content",
          marginBottom: "60px",
          borderBottom: `1px solid var(--aim-border)`,
          color: `var(--aim-text-default)`,
          fontSize: "30px",
        }}
      >
        {props.title}
      </div>
      <CustomDatePicker
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        maxDate={maxDate}
        handleTodayButtonClick={handleTodayButtonClick}
      />
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeInnerRadiusOffset={5}
        activeOuterRadiusOffset={5}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", "0.2"]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={{ theme: "labels.text.fill" }}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color", modifiers: [] }}
        arcLabel="value"
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        tooltip={({ datum }) => {
          // console.log("Tooltip datum:", datum);
          return (
            <div
              style={{
                backgroundColor: "white",
                padding: "12px",
                borderRadius: "4px",
                boxShadow: "0 3px 14px rgba(0, 0, 0, 0.25)",
                color: "black",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              <strong>{datum.id}</strong>
              <br />
              <span>작성: {datum.value}</span>
              <br />
              {/* <span>label: {datum.label}</span>
              <br /> */}
              {/* <span>hidden: {datum.hidden ? "true" : "false"}</span>
              <br /> */}
              {/* <span>formattedValue: {datum.formattedValue}</span> */}
            </div>
          );
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "ruby",
            },
            id: "dots",
          },
          {
            match: {
              id: "c",
            },
            id: "dots",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
          {
            match: {
              id: "python",
            },
            id: "dots",
          },
          {
            match: {
              id: "scala",
            },
            id: "lines",
          },
          {
            match: {
              id: "lisp",
            },
            id: "lines",
          },
          {
            match: {
              id: "게시글",
            },
            id: "lines",
          },
          {
            match: {
              id: "javascript",
            },
            id: "lines",
          },
        ]}
        motionConfig="default"
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 10,
            translateY: 57,
            itemsSpacing: 0,
            itemWidth: 90,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 16,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default BoardReply;
