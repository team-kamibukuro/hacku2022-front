import Layout from "@/components/layouts/Layout";
import SimpleDialog from "@/components/layouts/SimpleDialog";
import StainedGlass from "@/components/layouts/StainedGlass";
import Button, { ButtonStyle } from "@/components/ui-elements/Button";
import Link from "next/link";
import React from "react";
import CreateRoomForm from "../components/CreateRoomForm";
import InputRoomNameForm from "../components/InputRoomNameForm";
import MatchingForm from "../components/MatchingForm";
import useDialog from "../hooks/useDialog";
import useIsDisabled from "../hooks/useIsDisabled";

export const Entrance = () => {
  const {
    open,
    access,
    dialogTitle,
    input,
    create,
    matching,
    handleClick,
    handleClickClose,
  } = useDialog();
  const { isDisabled } = useIsDisabled(access);

  const formComponents = {
    0: InputRoomNameForm,
    1: CreateRoomForm,
    2: MatchingForm,
  };
  const Form = formComponents[access];

  return (
    <Layout>
      <StainedGlass />
      <div className="h-screen flex flex-col items-center justify-center z-50">
        <div className="p-20 border-white border-solid border-8">
          <div className="flex items-center justify-center ">
            <h2 className="text-white text-[80px] font-press mr-10 border-white border-solid border-b-8">
              HOGEHOGE
            </h2>
            <div className="flex flex-col">
              <Button
                onClick={input}
                buttonStyle={ButtonStyle.isWarning}
                font={"press"}
              >
                Input room name
              </Button>
              <div className="my-2"></div>
              <Button
                onClick={create}
                buttonStyle={ButtonStyle.isWarning}
                font={"press"}
              >
                Create room
              </Button>
              <div className="my-2"></div>
              <Button
                onClick={matching}
                buttonStyle={ButtonStyle.isWarning}
                font={"press"}
              >
                Matching
              </Button>
              <SimpleDialog
                handleClose={handleClickClose}
                handleClick={handleClick}
                open={open}
                dialogTitle={dialogTitle}
                submitTitle={"Enter"}
                isDisabled={isDisabled}
              >
                <Form />
              </SimpleDialog>
            </div>
          </div>
          <Link href="/mypage">
            <div className="flex mt-10 group">
              <span className="font-press text-lg -mt-0.5 text-white group-hover:text-yellow-400">
                Mypage
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white text-lg group-hover:text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
          <div className="flex mt-10 group">
            <span className="font-press text-lg -mt-0.5 text-white group-hover:text-yellow-400">
              Logout
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white group-hover:text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </Layout>
  );
};
