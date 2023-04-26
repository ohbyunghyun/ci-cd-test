import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import "./Faq.css";

function FaqTitleContent({ selectedType, title }) {
  const [dbData, setDbData] = useState([]);

  useEffect(() => {
    if (selectedType) {
      axios
        .get(
          `http://localhost:8080/faqTitleContent?faq_type_no=${selectedType}`
        )
        .then((response) => {
          // console.log(response.data);
          setDbData(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedType]);

  if (dbData.length === 0) {
    // return <div>No data</div>;
  }

  return (
    <div id="FaqTitleContent">
      <div
        style={{
          width: "fit-content",
          marginBottom: "60px",
          borderBottom: `1px solid var(--aim-border)`,
          color: `var(--aim-text-default)`,
          fontSize: "30px",
        }}
      >
        {title}
      </div>
      <Accordion
        style={{
          width: "100%",
          color: `var(--aim-text-default)`,
          backgroundColor: `var(--aim-base-alpa)`,
          fontSize: "16px",
        }}
        defaultActiveKey="0"
        flush
      >
        {dbData.map((data, index) => (
          <Accordion.Item
            style={{
              color: `var(--aim-text-default)`,
              backgroundColor: `var(--aim-base-alpa)`,
              fontSize: "16px",
            }}
            key={index}
            eventKey={index.toString()}
          >
            <Accordion.Header>{data.title}</Accordion.Header>
            <Accordion.Body
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default FaqTitleContent;
