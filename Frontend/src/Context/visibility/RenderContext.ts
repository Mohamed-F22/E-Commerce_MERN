import { createContext, useContext } from "react";

interface RenderContextType {
  isLoginVisible: boolean;
  isRegisterVisible: boolean;
  isOverlayVisible: boolean;
  loginOn: () => void;
  loginOff: () => void;
  registerOn: () => void;
  registerOff: () => void;
  overlayOn: () => void;
  overlayOff: () => void;
}

export const RenderContext = createContext<RenderContextType>({
  isLoginVisible: false,
  isRegisterVisible: false,
  isOverlayVisible: false,
  loginOn: () => {},
  loginOff: () => {},
  registerOn: () => {},
  registerOff: () => {},
  overlayOn: () => {},
  overlayOff: () => {},
});

export const useRender = () => useContext(RenderContext);
