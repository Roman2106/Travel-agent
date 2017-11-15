import React from "react";
import {Modal} from "./Modal";

export const ConfirmationDelete = ({onYes, onNo, item}) => (
  <Modal>
    <div className="containerConfirmation">
      <div className="confirmationDelete">

          <span>Shure you want to delete {item} ?</span>
        <div className = "confButtons">
          <button className="confirmationButtons" onClick={onYes}>Yes</button>
          <button className="confirmationButtons" onClick={onNo}>No</button>
        </div>
      </div>
    </div>
  </Modal>
);