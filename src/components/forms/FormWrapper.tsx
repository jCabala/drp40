import React, { useState } from "react";
import PopUpWIndow from "../helper/PopUpWindow";
import CloseButton from "../helper/buttons/CloseButton";

type Props = {
  onFinish: () => void;
  setIsLoading: (loading: boolean) => void;
  setAlertText: (text: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  title: string;
  btnText?: string;
  children: React.ReactNode;
};

const inputStyle =
  "shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";

function FormWrapper({
  onFinish,
  setIsLoading,
  handleSubmit,
  title,
  children,
  btnText = "Upload"
}: Props) {
  const [showPopUp, setShowPopUp] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await handleSubmit(e);

    setTimeout(() => {
      setIsLoading(false);
      setShowQuestions(false);
      setShowPopUp(true);
    }, 200);
  };

  return (
    <>
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
          className="bg-white px-6 pt-10 pb-4 w-full sm:max-w-md mx-auto rounded-lg shadow-md relative"
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
          </form>
        </div>
      )}
    </>
  );
}

export default FormWrapper;
