import Button, { ButtonStyle } from "@/components/ui-elements/Button";
import InputForm from "@/components/ui-elements/InputForm";
import React from "react";
import useAuth from "../hooks/useAuth";

const RegisterForm = () => {
  const { credential, handleInputChange, authUser } = useAuth();

  return (
    <div className="flex flex-col">
      <div className="mb-5">
        <InputForm
          label={"nickname"}
          handleChange={handleInputChange}
          isInline={false}
          value={credential.nickname}
        />
      </div>
      <div className="mb-5">
        <InputForm
          label={"email"}
          handleChange={handleInputChange}
          type="email"
          isInline={false}
          value={credential.email}
        />
      </div>
      <div className="mb-10">
        <InputForm
          label={"password"}
          handleChange={handleInputChange}
          type="password"
          isInline={false}
          value={credential.password}
        />
      </div>
      <Button buttonStyle={ButtonStyle.isPrimary} onClick={authUser}>
        {"Sign up"}
      </Button>
    </div>
  );
};

export default RegisterForm;
