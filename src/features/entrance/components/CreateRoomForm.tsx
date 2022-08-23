import Checkbox from "@/components/ui-elements/Checkbox";
import InputForm from "@/components/ui-elements/InputForm";
import React from "react";
import useRoomHandleChange from "../hooks/useRoomHandleChange";
import DemoCheckBox from "./DemoCheckBox";
import SelectLanguageForm from "./SelectLanguageForm";
import SelectMaxPlayerForm from "./SelectMaxPlayerForm";

const CreateRoomForm = () => {
  const { room, handleChange } = useRoomHandleChange();

  return (
    <div>
      <div className="mt-6">
        <InputForm
          label={"RoomName"}
          handleChange={handleChange}
          value={room.name}
        />
      </div>
      <div className="my-6">
        <SelectLanguageForm />
      </div>
      <div className="my-6">
        <SelectMaxPlayerForm />
      </div>
      <div className="mb-6 mt-10">
        <DemoCheckBox />
      </div>
    </div>
  );
};

export default CreateRoomForm;
