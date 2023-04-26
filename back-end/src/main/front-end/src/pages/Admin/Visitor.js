import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveLine } from "@nivo/line";
import "./Stats.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";

registerLocale("ko", ko); // 한국어 로캘 등록

const Visitor = (props) => {
  const [chartData, setChartData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate());
    return yesterday;
  });

  const fetchData = async (date = new Date()) => {
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - 6);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    try {
      const response = await axios.get("http://localhost:8080/visitors", {
        params: {
          start_date: startDate.toISOString().split("T")[0],
          end_date: endDate.toISOString().split("T")[0],
        },
      });
      // console.log("endDate:", endDate.toISOString().split("T")[0]); 서버에서 받아온 데이터
      // console.log("Response data:", response.data); // 응답 데이터 출력
      const formattedData = formatData(response.data);
      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatData = (data) => {
    const aggregatedData = data.reduce((acc, item) => {
      const dateObj = new Date(item.visitorDt);
      const date = `${dateObj.getFullYear()}-${String(
        dateObj.getMonth() + 1
      ).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;

      if (!acc[date]) {
        acc[date] = 1;
      } else {
        acc[date]++;
      }
      return acc;
    }, {});

    const chartData = [
      {
        id: "방문자",
        color: "hsl(36, 70%, 50%)",
        data: Object.entries(aggregatedData).map(([x, y]) => ({ x, y })),
      },
    ];

    return chartData;
  };

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  const handleVisitorDateChange = (date) => {
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

  const CustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className="custom-datepicker-header">
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        style={{ color: "black", border: "none" }}
      >
        {"<"}
      </button>
      <span
        style={{
          color: "black",
          border: "none",
        }}
      >
        {date.toLocaleDateString("ko-KR", { month: "long", year: "numeric" })}
      </span>
      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        style={{
          color: "black",
          border: "none",
        }}
      >
        {">"}
      </button>
      <button
        onClick={handleTodayButtonClick}
        style={{ color: "black", border: "none" }}
      >
        오늘
      </button>
    </div>
  );

  return (
    <div
      id="Visitor"
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
          // backgroundColor: "gray",
        }}
      >
        {props.title}
      </div>
      <DatePicker
        id="calendar"
        selected={selectedDate}
        onChange={handleVisitorDateChange}
        dateFormat="yyyy-MM-dd"
        maxDate={maxDate}
        locale="ko"
        renderCustomHeader={(props) => <CustomHeader {...props} />}
      />

      <ResponsiveLine
        data={chartData}
        margin={{ top: 30, right: 55, bottom: 70, left: 80 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2c"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 15,
          tickPadding: 5,
          tickRotation: 0,
          legend: "날짜",
          legendOffset: 60,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickValues: 2, // 조회수 y축 셋팅값
          orient: "left",
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legend: "조회수",
          legendOffset: -50,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        enableSlices="x"
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        enableArea={false}
        useMesh={true}
      />
    </div>
  );
};
export default Visitor;
