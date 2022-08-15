import InputForm from "@/components/ui-elements/InputForm";
import React from "react";
import useAuth from "../hooks/useAuth";

const RegisterForm = () => {
  const { handleInputChange } = useAuth();

  return (
    <div>
      <div className="mb-5">
        <InputForm
          label={"nickname"}
          handleChange={handleInputChange}
          isInline={false}
        />
      </div>
      <div className="mb-5">
        <InputForm
          label={"email"}
          handleChange={handleInputChange}
          type="email"
          isInline={false}
        />
      </div>
      <div className="mb-10">
        <InputForm
          label={"password"}
          handleChange={handleInputChange}
          type="password"
          isInline={false}
        />
      </div>
    </div>
  );
};

export default RegisterForm;
