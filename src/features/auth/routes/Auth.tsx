import Layout from "@/components/layouts/Layout";
import StainedGlass from "@/components/layouts/StainedGlass";
import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import useAuth from "../hooks/useAuth";

export const Auth = () => {
  const { isLoginView, changeMode } = useAuth();

  return (
    <div>
      <Layout>
        <StainedGlass />
        <div className="flex flex-col justify-center items-center z-50 h-screen w-full">
          <h2 className="text-white text-5xl font-press border-white border-solid border-b-8 mb-5">
            HOGEHOGE
          </h2>
          <div className="nes-container is-rounded is-dark font-press w-[600px]">
            <div className="p-10">
              <div className="flex flex-col">
                <p className="text-lg text-center mb-8">
                  {isLoginView
                    ? "Sign in to your account"
                    : "Create your account"}
                </p>
                {isLoginView ? <LoginForm /> : <RegisterForm />}
                <p className="text-xs text-center text-gray-300 mt-10">
                  {isLoginView
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <span
                    onClick={changeMode}
                    className="text-yellow-500 hover:text-yellow-400"
                  >
                    {isLoginView ? " Sign up" : " Sign in"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
