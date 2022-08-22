import Layout from "@/components/layouts/Layout";
import SimpleDialog from "@/components/layouts/SimpleDialog";
import StainedGlass from "@/components/layouts/StainedGlass";
import Button, { ButtonStyle } from "@/components/ui-elements/Button";
import useEntranceBackGroundSound from "@/hooks/sounds/BackGroundSounds/useEntranceBackGroundSound";
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

  useEntranceBackGroundSound();

  return (
    <Layout>
      <StainedGlass />
      <div className="h-screen flex flex-col items-center justify-center z-50">
        <div className="p-20 border-white border-solid border-8">
          <div className="flex items-center justify-center ">
            <h2 className="text-white text-[80px] font-press mr-10 border-white border-solid border-b-8">
              INGECTION
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
              <span className="font-press text-lg -mt-0.5 text-white hover:text-yellow-400">
                Mypage
              </span>
            </div>
          </Link>
          <div className="flex mt-10 group">
            <span className="font-press text-lg -mt-0.5 text-white hover:text-yellow-400">
              Logout
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};
