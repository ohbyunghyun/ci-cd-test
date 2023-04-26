import React, { useState, useEffect } from "react";
import SSEContext from "./SSEContext";

const SSEProvider = ({ children }) => {
  const [sseMessage, setSseMessage] = useState("");

  useEffect(() => {
    let eventSource;

    // Create a new EventSource instance to connect to the server
    const setupEventSource = () => {
      eventSource = new EventSource("http://localhost:8080/sse", {
        withCredentials: true,
      });

      // Set up the event listener for the 'message' event
      eventSource.onmessage = (event) => {
        // console.log("Received SSE message:", event.data);
        const parsedData = JSON.parse(event.data);
        setSseMessage(parsedData);
      };

      // Set up the event listener for the 'error' event
      eventSource.onerror = (error) => {
        // console.error("SSE error:", error);
        setTimeout(() => {
          setupEventSource();
        }, 5000); // 에러 발생시 재연결에 걸리는 시간
      };
    };

    setupEventSource();

    // Clean up the connection when the component is unmounted
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  return (
    <SSEContext.Provider value={sseMessage}>{children}</SSEContext.Provider>
  );
};

export default SSEProvider;
