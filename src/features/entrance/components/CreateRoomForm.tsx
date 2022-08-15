import InputForm from "@/components/ui-elements/InputForm";
import React from "react";
import useRoomHandleChange from "../hooks/useRoomHandleChange";
import SelectLanguageForm from "./SelectLanguageForm";

const CreateRoomForm = () => {
  const { handleChange } = useRoomHandleChange();

  return (
    <div>
      <div className="mt-6">
        <InputForm label={"RoomName"} handleChange={handleChange} />
      </div>
      <div className="my-6">
        <SelectLanguageForm />
      </div>
    </div>
  );
};

export default CreateRoomForm;
