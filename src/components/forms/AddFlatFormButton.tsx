import React, { useState, useEffect } from "react";
import Overlay from "../helper/Overlay";
import AddFlatForm from "./AddFlatForm";
import QuickAccessButton from "../helper/buttons/QuickAccessButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onFinish: () => void;
};

function AddFlatFormButton({ onFinish }: Props) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <QuickAccessButton onClick={() => setShowForm(true)}>
        <FontAwesomeIcon icon={faPlus} className="text-white text-6xl" />
      </QuickAccessButton>
      {showForm && (
        <Overlay onClick={() => setShowForm(false)}>
          <AddFlatForm
            onFinish={() => {
              onFinish();
              setShowForm(false);
            }}
          />
        </Overlay>
      )}{" "}
    </>
  );
}

export default AddFlatFormButton;
