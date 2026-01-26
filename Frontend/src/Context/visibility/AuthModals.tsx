import LoginForm from "../../Components/LoginForm";
import Overlay from "../../Components/Overlay";
import RegisterForm from "../../Components/RegisterForm";
import { useRender } from "./RenderContext";

const AuthModals = () => {
  const { isLoginVisible, isRegisterVisible, isOverlayVisible } = useRender();
  return (
    <>
      {isLoginVisible && <LoginForm />}
      {isRegisterVisible && <RegisterForm />}
      {isOverlayVisible && <Overlay />}
    </>
  );
};

export default AuthModals