// CustomDatePicker.js
import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";

registerLocale("ko", ko); // 한국어 로캘 등록

const CustomDatePicker = ({
  selectedDate,
  onDateChange,
  maxDate,
  handleTodayButtonClick,
}) => {
  useEffect(() => {
    // 날짜가 변경되면 onDateChange 함수를 호출합니다.
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  }, [selectedDate, onDateChange]);

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
        style={{ border: "none" }}
      >
        {"<"}
      </button>
      <span>
        {date.toLocaleDateString("ko-KR", { month: "long", year: "numeric" })}
      </span>
      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        style={{ border: "none" }}
      >
        {">"}
      </button>
      <button onClick={handleTodayButtonClick} style={{ border: "none" }}>
        오늘
      </button>
    </div>
  );

  return (
    <DatePicker
      id="calendar"
      selected={selectedDate}
      onChange={onDateChange}
      dateFormat="yyyy-MM-dd"
      maxDate={maxDate}
      locale="ko"
      renderCustomHeader={(props) => <CustomHeader {...props} />}
    />
  );
};

export default CustomDatePicker;
