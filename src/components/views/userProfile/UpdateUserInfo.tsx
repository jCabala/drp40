import Button from "@/components/helper/buttons/Button";
import React from "react";
import Overlay from "@/components/helper/Overlay";
import AddUserInfoForm from "@/components/forms/AddUserInfoForm";
import { useState } from "react";
import Alert from "@/components/helper/Alert";
import LoadingOverlay from "@/components/helper/LoadingOverlay";

type Props = {
  userID: string;
};

function UpdateUserInfo({ userID }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [alertText, setAlertText] = useState<string | undefined>(undefined);

  return (
    <>
      <Button onClick={() => setShowForm(true)}>Update User Information</Button>
      {showForm && (
        <Overlay onClick={() => setShowForm(false)}>
          <AddUserInfoForm
            onFinish={() => setShowForm(false)}
            setIsLoading={setIsFormLoading}
            setAlertText={setAlertText}
          />
        </Overlay>
      )}
      {isFormLoading && <LoadingOverlay />}
      {alertText && (
        <Alert exitAction={() => setAlertText(undefined)} text={alertText} />
      )}
    </>
  );
}

export default UpdateUserInfo;
