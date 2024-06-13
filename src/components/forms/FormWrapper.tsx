import React, { useState } from "react";
import PopUpWIndow from "../helper/PopUpWindow";
import CloseButton from "../helper/buttons/CloseButton";
import LoadingOverlay from "../helper/LoadingOverlay";

type Props = {
  onFinish: () => void;
  setAlertText: (text: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<boolean>;
  title: string;
  btnText?: string;
  children: React.ReactNode;
};

const inputStyle =
  "shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";

function FormWrapper({
  onFinish,
  handleSubmit,
  title,
  children,
  btnText = "Upload",
}: Props) {
  const [showPopUp, setShowPopUp] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await handleSubmit(e);

    setTimeout(() => {
      setIsLoading(false);
      if (res) {
        setShowQuestions(false);
        setShowPopUp(true);
      }
    }, 200);
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      {showPopUp && (
        <PopUpWIndow
          message="Operation Successful!"
          buttonText="FINISH"
          onClick={() => {
            setIsLoading(false);
            setShowPopUp(false);
            setShowQuestions(true);
            onFinish();
          }}
        />
      )}
      {showQuestions && (
        <div
          className="bg-white px-6 py-4 w-full sm:max-w-md mx-auto rounded-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          <form
            onSubmit={onSubmit}
            className="bg-white rounded px-8 pb-8 mb-4 w-full"
          >
            <b className="text-orange-500 text-center block mb-4">{title}</b>
            <CloseButton onClick={onFinish} />
            {children}
            <input
              className="mt-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
              type="submit"
              value={btnText}
            />
            <b className="text-sm mt-4 text-orange-500 block text-center">
              All sections marked (*) are required
            </b>
          </form>
        </div>
      )}
    </>
  );
}

export default FormWrapper;
