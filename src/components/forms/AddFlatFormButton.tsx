import React, { useState, useEffect } from "react";
import Overlay from "../helper/Overlay";
import AddFlatForm from "./AddFlatForm";
import Alert from "../helper/Alert";
import LoadingOverlay from "../helper/LoadingOverlay";

type Props = {
    onFinish: () => void;
}

function AddFlatFormButton({onFinish}: Props) {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [alertText, setAlertText] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    if (alertText) {
      setTimeout(() => setAlertText(undefined), 3000);
    }
  }, [alertText]);

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="fixed w-20 h-20 bottom-4 right-4 bg-orange-500 pt-3 pb-6 px-3 rounded-full shadow-lg z-40 duration-200 hover:scale-110 flex justify-center items-center"
      >
        <span className="text-white text-center text-8xl">+</span>
      </button>
      {showForm && (
        <Overlay onClick={() => setShowForm(false)}>
          <AddFlatForm
            setIsLoading={setIsFormLoading}
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
      {isFormLoading && <LoadingOverlay />}
    </>
  );
}

export default AddFlatFormButton;
