import React from "react";
import {Modal} from "./Modal";

export const ConfirmationDelete = ({onYes, onNo, item}) => (
  <Modal>
    <div style={{position: "absolute", left: "50%", top: "50%"}}>
      <span>Shure you want to delete {item}?</span>
      <button onClick={onYes}>Yes</button>
      <button onClick={onNo}>No</button>
    </div>
  </Modal>
);