import InputForm from "@/components/ui-elements/InputForm";
import SelectForm from "@/components/ui-elements/SelectForm";
import React from "react";
import useRoomHandleChange from "../hooks/useRoomHandleChange";
import SelectLanguageForm from "./SelectLanguageForm";

const InputRoomNameForm = () => {
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
    </div>
  );
};

export default InputRoomNameForm;
