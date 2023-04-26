// NaverLoginHandler.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const NaverLoginHandler = () => {
  // useHistory 훅을 사용해 history 객체를 가져옵니다. 이 객체를 사용하여 라우터 내에서 리다이렉션을 수행할 수 있습니다.
  const navigate = useNavigate();

  useEffect(() => {
    const processNaverLogin = async () => {
      // URL의 해시 부분에서 query parameter들을 추출합니다. 이 값들은 access_token, state, token_type, expires_in과 같은 인증 관련 정보를 포함합니다.
      const queryParams = window.location.hash.substring(1).split("&");
      const params = {};
      // console.log(window.location); //Location {ancestorOrigins: DOMStringList, href: 'http://localhost:3000/auth/naverLogin#access_token…57-eb93287b5f70&token_type=bearer&expires_in=3600', origin: 'http://localhost:3000', protocol: 'http:', host: 'localhost:3000', …}
      // console.log(window.location.hash); //#access_token=AAAAOJ2B7qXNzafF-7pieNOtmrsMu_Slw5BtRDI4azL1-h0Wfbm_eOIeP3Llz89lpvg8WJYHajKwmnyvJhALXGo90R4&state=4b53e1ff-4b37-44f4-b857-eb93287b5f70&token_type=bearer&expires_in=3600
      // console.log(queryParams); //['access_token=AAAAOJ2B7qXNzafF-7pieNOtmrsMu_Slw5BtR…L1-h0Wfbm_eOIeP3Llz89lpvg8WJYHajKwmnyvJhALXGo90R4', 'state=4b53e1ff-4b37-44f4-b857-eb93287b5f70', 'token_type=bearer', 'expires_in=3600']

      queryParams.forEach((param) => {
        const [key, value] = param.split("=");
        params[key] = value;
      });

      try {
        const response = await axios.post(
          "http://localhost:8080/auth/naverlogin",
          params
        );

        // console.log(response);
        // alert(
        //   `${
        //     response.data?.data.link === "naver" ? "네이버 계정" : ""
        //   } 회원가입이 완료 되었습니다.`
        // );
        Swal.fire({
          title: `${
            response.data?.data.link === "naver" ? "네이버 계정" : ""
          } 회원가입이 완료 되었습니다.`,
          confirmButtonText: "확인",
        });

        if (response.data.status === "failure") {
          if (response.data.errorCode == "502") {
            // alert("Artify 계정으로 로그인 하세요");
            Swal.fire({
              title: "Artify 계정으로 로그인 하세요.",
              confirmButtonText: "확인",
            });
          }
        }
        window.location.href = "/"; // 인덱스 페이지로 이동
      } catch (error) {
        // console.error("서버에서 naverlogin 에러 옴!");
        // console.error(error);
      }
    };

    processNaverLogin();
  }, []);

  return <div>Processing Naver Login...</div>;
};

export default NaverLoginHandler;
