import React, { useState, useEffect } from "react";
import Overlay from "../helper/Overlay";
import AddFlatForm from "./AddFlatForm";
import Alert from "../helper/Alert";
import QuickAccessButton from "../helper/buttons/QuickAccessButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type Props = {
    onFinish: () => void;
}

function AddFlatFormButton({onFinish}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [alertText, setAlertText] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    if (alertText) {
      setTimeout(() => setAlertText(undefined), 3000);
    }
  }, [alertText]);

  return (
    <>
      <QuickAccessButton
        onClick={() => setShowForm(true)}
      >
        <FontAwesomeIcon icon={faPlus} className="text-white text-6xl" />
      </QuickAccessButton>
      {showForm && (
        <Overlay onClick={() => setShowForm(false)}>
          <AddFlatForm
            setAlertText={setAlertText}
            onFinish={() => {
              onFinish();
              setShowForm(false);
            }}
          />
        </Overlay>
      )}{" "}
      {alertText && (
        <Alert exitAction={() => setAlertText(undefined)} text={alertText} />
      )}
    </>
  );
}

export default AddFlatFormButton;
