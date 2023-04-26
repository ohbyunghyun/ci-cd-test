import NaverLogin from "./NaverLogin";

function ExternalLogin(props) {
  return (
    <>
      <NaverLogin isLoginModal={props.isLoginModal} />
    </>
  );
}

export default ExternalLogin;
