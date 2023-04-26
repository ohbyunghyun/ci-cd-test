import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PencilSquare, Save2Fill } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import "./SweetAlert.css";
import ImageResizer from "react-image-file-resizer";
import SettingInput from "./SettingInput";
import SettingRadio from "./SettingRadio";

Modal.setAppElement("#root");

function ModifyProfile(props) {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");

  const [memberData, setMemberData] = useState({});
  const [beforeNick, setBeforeNick] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameChageState, setNicknameChageState] = useState(false);
  const [nickCheckState, setNickCheckState] = useState(false);
  const [isNickDuplication, setIsNickDuplication] = useState(true);

  const [information,setInformation] = useState("");
  const [informationChageState,setInformationChageState] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [condition, setCondition] = useState(true);

  const divStyle = {
    width: "300px",
    height: "300px",
    backgroundColor: `var(--aim-img-background)`,
    position: "relative",
    cursor: "pointer",
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "20%",
  };

  useEffect(() => {
    axios.get("http://localhost:8080/auth/user").then((response) => {
      if (response.data.status === "failure") {
        navigate("/");
      }
      setMemberData(response.data.data);
      setBeforeNick(response.data.data.nickname);
      setNickname(response.data.data.nickname);
      setInformation(response.data.data.information === null ?
         "" : response.data.data.information);
      setImageUrl(response.data.data.profilePhoto);
      setGender(response.data.data.gender);
      setBirthdate(response.data.data.birthDate);
      setPhone(response.data.data.tel);
      setAddress(response.data.data.basicAddress);
    });
  }, [navigate]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("profilePhoto", file);
    if (file) {
      ImageResizer.imageFileResizer(
        file,
        100,
        100,
        "JPEG",
        100,
        0,
        (uri) => {
          setImageUrl(uri);
        },
        "base64"
      );
      try {
        const response = await axios.put(
          "http://localhost:8080/member/upload/profileImg",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data;",
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleNickNameChage = () => {
    setNicknameChageState(false);
  };

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      // 엔터키가 눌렸을 때
      console.log("엔터키 입력됨");
      // 원하는 동작을 수행합니다.
      handleNickNameChage(event);
    }
  }

  return (
    <>
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
        }}
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

        <div
          style={{
            width: "660px",
            height: "fit-content",
            margin: "auto",
            display: "flex",
            flexDirection: props.flexDirection,
            overflow: "auto",
          }}
        >
          <div
            style={{
              width: "400px",
              height: "fit-content",
              display: "flex",
              flexDirection: "column",
              minWidth: "400px",
            }}
          >
            <div
              style={divStyle}
              onClick={() => {
                document
                  .querySelector("input[type=file]#profile-photo")
                  .click();
              }}
            >
              <input
                id="profile-photo"
                type="file"
                accept="image/*"
                name="profilePhoto"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </div>
            <div style={{ width: "300px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  height: "50px",
                  marginTop: "10px",
                }}
              >
                <span
                  style={{
                    fontWeight: "bolder",
                    fontSize: `var(--aim-nomal-font-size)`,
                  }}
                >
                  {beforeNick}
                </span>
                <PencilSquare
                  className="profile-edit-nickname-icon"
                  onClick={() => {
                    setIsNickDuplication(true);
                    setNicknameChageState(true);
                    setNickCheckState(false);
                  }}
                  style={{
                    width: "25px",
                    height: "25px",
                    paddingBottom: "5px",
                  }}
                />
              </div>
              <div style={{ textAlign: "right" }}>{memberData.email}</div>
              <div style={{ marginTop: "10px"}}>
                {informationChageState 
                ? <div style={{position: "relative"}}>
                  <textarea placeholder="소개를 입력해주세요!"
                    value={information}
                    onChange={(e) => {setInformation(e.target.value)}}
                    style={{
                      appearance: "none",
                      WebkitAppearance : "none",
                      MozAppearance: "none",
                      outline: "none",
                      resize: "none",
                      width: "100%",
                      height: "110px",
                      backgroundColor: `var(--aim-base-tone)`,
                      border: `1px solid var(--aim-border)`,
                      borderRadius: "0.375rem",
                      padding: "0.375rem 0.75rem",
                      color: `var(--aim-text-default)`,
                    }}></textarea>
                  <Save2Fill onClick={() => {setInformationChageState(false)}}
                    style={{
                      position: "absolute",
                      right : "5px",
                      bottom : "15px",
                      width: "25px",
                      height: "25px",                    
                    }}/> 
                </div> 
                : <div style={{
                    position: "relative",
                    width: "100%",
                    height: "110px",
                    backgroundColor: `var(--aim-base-tone)`,
                    border: `1px solid var(--aim-border)`,
                    borderRadius: "0.375rem",
                    padding: "0.375rem 0.75rem",
                    color: `var(--aim-text-default)`,
                  }}>
                    <p>{information}</p>
                    <PencilSquare
                    className="profile-edit-nickname-icon"
                    onClick={() => {
                      setInformationChageState(true);
                    }}
                    style={{
                      position: "absolute",
                      right : "5px",
                      bottom : "5px",
                      width: "25px",
                      height: "25px",                    
                    }}/></div>}
              </div>


            </div>
          </div>
          <div
            style={{
              width: "60%",
              height: "90%",
              display: "flex",
              flexDirection: "column",
              minWidth: "500px",
              paddingTop: props.flexDirection === "column" ? "30px" : "",
              borderTop:
                props.flexDirection === "column"
                  ? `1px solid var(--aim-border)`
                  : "",
            }}
          >
            <SettingInput
              title={"비밀번호 수정"}
              placeholder={"******"}
              value={password}
              setValue={setPassword}
              type={"password"}
            />
            <SettingInput
              title={"비밀번호 확인"}
              placeholder={"******"}
              value={passwordConfirm}
              setValue={setPasswordConfirm}
              type={"password"}
              setCondition={setCondition}
              check={(value) => {
                if (value === password) {
                  setCondition(true);
                  return true;
                }
                setCondition(false);
                return false;
              }}
              comment={"비밀번호가 다릅니다."}
            />
            <SettingRadio
              title={"성별"}
              options={["미정", "남", "여"]}
              value={gender}
              setValue={setGender}
              check={() => {
                return true;
              }}
              comment={""}
            />
            <SettingInput
              title={"생년월일"}
              placeholder={"ex) 990101"}
              value={birthdate}
              setValue={setBirthdate}
              check={(value) => {
                const regex = /^\d{6}$/;
                if (regex.test(value)) {
                  setCondition(true);
                  return true;
                }
                setCondition(false);
                return false;
              }}
              comment={"6자리 숫자 입력 ex) 990101"}
              setCondition={setCondition}
            />
            <SettingInput
              title={"전화번호"}
              placeholder={"010-1234-5678"}
              value={phone}
              setValue={setPhone}
              check={() => {
                return true;
              }}
              comment={""}
            />
            <SettingInput
              title={"주소"}
              placeholder={"서울특별시 강남구"}
              value={address}
              setValue={setAddress}
              check={() => {
                return true;
              }}
              comment={""}
            />

            <div
              style={{}}
              onClick={() => {
                if (password !== passwordConfirm) {
                  // alert("비밀번호 확인");
                  Swal.fire({
                    title: "비밀번호가 일치하지 않습니다.",
                    confirmButtonText: "확인",
                  });
                  return;
                }
                if (!condition) {
                  // alert("뭔가 잘못됨");
                  Swal.fire({
                    title:
                      "처리 중 이상 발생 했습니다. 잠시 후 다시 시도해 주세요.",
                    confirmButtonText: "확인",
                  });
                  return;
                }

                Swal.fire({
                  title: "수정하시겠습니까?",
                  showCancelButton: true,
                  confirmButtonText: "수정",
                  cancelButtonText: "취소", //취소하면 초기값으로?
                }).then((result) => {
                  if (result.isConfirmed) {
                    // 확인 버튼을 클릭하면 아래 코드 실행
                    axios.put("http://localhost:8080/member", {
                      password: password,
                      gender: gender,
                      birthDate: birthdate,
                      tel: phone,
                      basicAddress: address,
                      information: information,
                    });
                  }
                });
              }}
            >
              <div
                style={{
                  width: "150px",
                  height: "30px",
                  backgroundColor: `var(--aim-base-tone)`,
                  borderRadius: "50px",
                  textAlign: "center",
                  lineHeight: "30px",
                  color: `var(--aim-text-default)`,
                  fontWeight: "bolder",
                }}
              >
                개인정보 수정
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={nicknameChageState}
        onRequestClose={() => setNicknameChageState(false)}
        style={{
          overlay: { backgroundColor: `var(--aim-harf-alpa)` },
          content: {
            width: "350px",
            height: "180px",
            margin: "auto",
            backgroundColor: `var(--aim-base-tone)`,
            border: "none",
            boxShadow: `0 2px 8px var(--aim-harf-alpa)`,
            color: `var(--aim-text-default)`,
          },
        }}
      >
        <div
          style={{
            width: "100%",
            height: "45%",
            borderBottom: `1px solid var(--aim-border)`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: `var(--aim-text-default)`,
              fontSize: `var(--aim-nomal-font-size)`,
              fontWeight: "bolder",
            }}
          >
            닉네임 변경
          </span>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            marginTop: "2%",
          }}
        >
          <input
            defaultValue={memberData.nickname}
            onChange={(e) => {
              const newValue = e.target.value.trim();
              setNickname(newValue);
              setNickCheckState(false);
            }}
            style={{
              width: "220px",
              height: "50px",
              marginTop: "10px",
              backgroundColor: `var(--aim-base-tone)`,
              border: `1px solid var(--aim-border)`,
              borderRadius: "0.375rem",
              padding: "0.375rem 0.75rem",
              color: `var(--aim-text-default)`,
              fontSize: `var(--aim-nomal-font-size)`,
              fontWeight: "bolder",
            }}
          />
          <div
            onClick={() => {
              if (nickCheckState && !isNickDuplication) {
                axios
                  .put(
                    "http://localhost:8080/member/nickname",
                    {},
                    {
                      params: {
                        nickname: nickname,
                      },
                    }
                  )
                  .then((response) => {
                    if (response.data.status === "success") {
                      setBeforeNick(nickname);
                    }
                    setNicknameChageState(false);
                    window.location.reload();
                  });
                return;
              } else {
                axios
                  .get(
                    `http://localhost:8080/member/check/nickname/${nickname}`
                  )
                  .then((response) => {
                    if (response.data.status === "failure") {
                      setIsNickDuplication(true);
                    } else if (response.data.status === "success") {
                      setIsNickDuplication(false);
                    }
                    setNickCheckState(true);
                  });
              }
            }}
            style={{
              marginLeft: "20px",
              marginTop: "20px",
              backgroundColor:
                nickCheckState && !isNickDuplication
                  ? `var(--aim-base-tone-sub)`
                  : `var(--aim-base-tone-down)`,
              color:
                nickCheckState && !isNickDuplication
                  ? `var(--aim-text-default)`
                  : `var(--aim-text-default)`,
              padding: "8px 8px",
              textAlign: "center",
              fontSize: `var(--aim-small-font-size)`,
              cursor: "pointer",
              borderRadius: "6px",
            }}
          >
            {nickCheckState && !isNickDuplication ? (
              <span>변경하기</span>
            ) : (
              <span>중복확인</span>
            )}
          </div>
        </div>
        {nickCheckState ? (
          isNickDuplication ? (
            <div
              style={{
                marginLeft: "5px",
                fontSize: `var(--aim-small-font-size)`,
              }}
            >
              사용 불가능한 닉네임입니다.
            </div>
          ) : (
            <div
              style={{
                marginLeft: "5px",
                fontSize: `var(--aim-small-font-size)`,
              }}
            >
              사용 가능한 닉네임입니다.
            </div>
          )
        ) : (
          ""
        )}
      </Modal>
    </>
  );
}

export default ModifyProfile;
