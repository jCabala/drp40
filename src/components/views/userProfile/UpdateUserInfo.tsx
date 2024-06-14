import Button from "@/components/helper/buttons/Button";
import React from "react";
import Overlay from "@/components/helper/Overlay";
import AddUserInfoForm from "@/components/forms/AddUserInfoForm";
import { useState } from "react";

type Props = {
  userID: string;
  fetchData: () => void;
};

function UpdateUserInfo({ userID, fetchData }: Props) {
  const [showForm, setShowForm] = useState(false);

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
          />
        </Overlay>
      )}
    </>
  );
}

export default UpdateUserInfo;
