import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Verify() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios("http://localhost:8080/auth/verify", {
      params: {
        token: token,
      },
    })
      .then((response) => {
        if (response.data.status === "success") {
          setMessage("메일 인증이 완료 되었습니다.");
        } else {
          setMessage("유효하지 않은 링크입니다.");
        }
      })
      .catch((error) => {
        setMessage("메일 인증 중 오류 발생!");
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    if (message) {
      // alert(message);
      Swal.fire({
        title: message,
        confirmButtonText: "확인",
      });
      window.location.href = "../../";
    }
  }, [message]);

  return <></>;
}

export default Verify;
