import { useState, type FC, type PropsWithChildren } from "react";
import { RenderContext } from "./RenderContext";

const RenderProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const loginOn = () => {
    setIsLoginVisible(true);
  };
  const loginOff = () => {
    setIsLoginVisible(false);
  };
  const registerOn = () => {
    setIsRegisterVisible(true);
  };
  const registerOff = () => {
    setIsRegisterVisible(false);
  };
  const overlayOn = () => {
    setIsOverlayVisible(true);
  };
  const overlayOff = () => {
    setIsOverlayVisible(false);
  };

  return (
    <RenderContext.Provider
      value={{
        isLoginVisible,
        isRegisterVisible,
        isOverlayVisible,
        loginOn,
        loginOff,
        registerOn,
        registerOff,
        overlayOn,
        overlayOff,
      }}
    >
      {children}
    </RenderContext.Provider>
  );
};

export default RenderProvider;
