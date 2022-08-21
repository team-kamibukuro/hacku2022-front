import Button, { ButtonStyle } from "@/components/ui-elements/Button";
import CustomCountdown from "@/features/play/components/CustomCountdown";
import React from "react";
import useExit from "../hooks/useExit";

const Header = () => {
  const { exit } = useExit();

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg py-2 relative flex items-center w-full justify-between border-solid border-white border-b-2 bg-black bg-opacity-75">
          <div className="px-10 w-full flex flex-wrap items-center justify-between">
            <h2 className="font-press text-gray-300">INGECTION</h2>
            <div
              className="navbar-collapse collapse grow items-center flex justify-end"
              id="navbarSupportedContentY"
            >
              <div>
                <p className="font-dot text-white mr-10 flex">
                  制限時間 残り
                  <CustomCountdown time={1200000} />
                </p>
              </div>
              <Button
                onClick={exit}
                buttonStyle={ButtonStyle.isError}
                font={"dot"}
              >
                退出する
              </Button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
