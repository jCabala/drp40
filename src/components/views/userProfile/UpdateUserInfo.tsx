import Button from "@/components/helper/buttons/Button";
import React from "react";
import Overlay from "@/components/helper/Overlay";
import AddUserInfoForm from "@/components/forms/AddUserInfoForm";
import { useState } from "react";
import Alert from "@/components/helper/Alert";
import LoadingOverlay from "@/components/helper/LoadingOverlay";
import { fetchAndActivate } from "firebase/remote-config";

type Props = {
  userID: string;
  fetchData: () => void;
};

function UpdateUserInfo({ userID, fetchData }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [alertText, setAlertText] = useState<string | undefined>(undefined);

  return (
    <>
      <Button onClick={() => setShowForm(true)}>
        Update and add information!
      </Button>
      {showForm && (
        <Overlay onClick={() => setShowForm(false)}>
          <AddUserInfoForm
            userID={userID}
            onFinish={() => {
              setShowForm(false);
              fetchData();
            }}
            setAlertText={setAlertText}
          />
        </Overlay>
      )}
      {alertText && (
        <Alert exitAction={() => setAlertText(undefined)} text={alertText} />
      )}
    </>
  );
}

export default UpdateUserInfo;
