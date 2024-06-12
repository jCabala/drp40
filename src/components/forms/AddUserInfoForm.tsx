import React, { useRef } from "react";
import FormWrapper from "./FormWrapper";

type Props = {
  onFinish: () => void;
  setIsLoading: (loading: boolean) => void;
  setAlertText: (text: string) => void;
};

const inputStyle =
  "shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";

function AddUserInfoForm({ onFinish, setIsLoading, setAlertText }: Props) {
  const handleSubmit = async (e: React.FormEvent) => {};

  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      onFinish={onFinish}
      setIsLoading={setIsLoading}
      setAlertText={setAlertText}
      title="Update your information: *"
      btnText="Register"
    >
      <div className="mb-4">
        <label className="block text-orange-500 mb-2 appearance-none">
          Phone number:
        </label>
        <input
          type="string"
          className={inputStyle}
          placeholder="+91 1234567890"
          required
        />
      </div>

      <h3 className="block text-orange-500 mb-2 font-lg">
        More information about you
      </h3>
      <div className="mb-4">
        <label className="block text-orange-500 mb-2 appearance-none">
          Hobbies (comma separated):
        </label>
        <input
          type="string"
          className={inputStyle}
          placeholder="swimming,running,reading"
          required
        />
      </div>
    </FormWrapper>
  );
}

export default AddUserInfoForm;
