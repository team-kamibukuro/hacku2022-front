import Layout from "@/components/layouts/Layout";
import SimpleDialog from "@/components/layouts/SimpleDialog";
import StainedGlass from "@/components/layouts/StainedGlass";
import Button, { ButtonStyle } from "@/components/ui-elements/Button";
import useEntranceBackGroundSound from "@/hooks/sounds/BackGroundSounds/useEntranceBackGroundSound";
import useRequireAuth from "@/hooks/useRequireAuth";
import React from "react";
import CreateRoomForm from "../components/CreateRoomForm";
import InputRoomNameForm from "../components/InputRoomNameForm";
import MatchingForm from "../components/MatchingForm";
import useDialog from "../hooks/useDialog";
import useIsDisabled from "../hooks/useIsDisabled";
import useLogout from "../hooks/useLogout";
import useTouchStart from "../hooks/useTouchStart";

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
  const { touchStart, touch } = useTouchStart();
  const { logout } = useLogout();

  const formComponents = {
    0: InputRoomNameForm,
    1: CreateRoomForm,
    2: MatchingForm,
  };
  const Form = formComponents[access];

  useRequireAuth();
  useEntranceBackGroundSound();

  return (
    <div>
      <Layout>
        <StainedGlass />
        {touchStart ? (
          <div
            onClick={touch}
            className="h-screen flex flex-col items-center justify-center z-50"
          >
            <h2 className="text-white text-2xl font-press border-white border-solid border-b-4 mb-10">
              INJECTION
            </h2>
            <p className="text-white text-5xl font-press text-center mb-20 leading-normal">
              TOUCH HERE
              <br />
              <span className="text-4xl">TO START</span>
            </p>
            <p className="text-white font-dot">※このゲームは音楽が流れます</p>
          </div>
        ) : (
          <div className="h-screen flex flex-col items-center justify-center z-50">
            <div className="p-20 border-white border-solid border-8">
              <div className="flex items-center justify-center ">
                <h2 className="text-white text-[80px] font-press mr-10 border-white border-solid border-b-8">
                  INJECTION
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
              <div className="flex mt-10" onClick={() => {}}>
                <span className="font-press text-lg -mt-0.5 text-white hover:text-yellow-400">
                  Mypage &gt;&gt;
                </span>
              </div>
              <div className="flex mt-10" onClick={logout}>
                <span className="font-press text-lg -mt-0.5 text-white hover:text-yellow-400">
                  Logout &gt;&gt;
                </span>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};
