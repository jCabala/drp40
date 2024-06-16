import React, { useState, useContext } from "react";
import PopUpWIndow from "../helper/PopUpWindow";
import CloseButton from "../helper/buttons/CloseButton";
import { AlertAndLoadingContext } from "../helper/contexts/AlertAndLoadingContext";
import Spinner from "../helper/Spinner";

type Props = {
  onFinish: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<boolean>;
  title: string;
  btnText?: string;
  children: React.ReactNode;
};

function FormWrapper({
  onFinish,
  handleSubmit,
  title,
  children,
  btnText = "Upload",
}: Props) {
  const [showPopUp, setShowPopUp] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const { setIsLoading } = useContext(AlertAndLoadingContext);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowQuestions(false);

    const res = await handleSubmit(e);

    if (res) {
      setShowQuestions(false);
      setShowPopUp(true);
    } else {
      setShowQuestions(true);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
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
              className="mt-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full cursor-pointer"
              type="submit"
              value={btnText}
              onClick={() => setIsLoading(true)}
            />
            <b className="text-sm mt-4 text-orange-500 block text-center">
              All sections marked (*) are required
            </b>
          </form>
        </div>
      )}
      {!showQuestions && !showPopUp && (
        <div className="h-64 w-64 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </>
  );
}

export default FormWrapper;
