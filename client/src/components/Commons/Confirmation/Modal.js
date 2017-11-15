import React from "react";
import ReactDOM from "react-dom";

export const Modal = ({children}) =>
  ReactDOM.createPortal(React.Children.only(children),
    document.querySelector("#modal"));