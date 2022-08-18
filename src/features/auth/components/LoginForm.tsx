import Button, { ButtonStyle } from "@/components/ui-elements/Button";
import InputForm from "@/components/ui-elements/InputForm";
import React from "react";
import useAuth from "../hooks/useAuth";

const LoginForm = () => {
  const { credential, handleInputChange, authUser } = useAuth();

  return (
    <div className="flex flex-col">
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
        {"Sign in"}
      </Button>
    </div>
  );
};

export default LoginForm;
