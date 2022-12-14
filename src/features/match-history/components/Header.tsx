import Button, { ButtonStyle } from "@/components/ui-elements/Button";
import useCancelButtonSound from "@/hooks/sounds/ButtonSounds/useCancelButtonSound";
import React from "react";

const Header = () => {
  const [playCancelButton] = useCancelButtonSound();

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg py-2 relative flex items-center w-full justify-between border-solid border-white border-b-2 bg-black bg-opacity-75">
          <div className="px-10 w-full flex flex-wrap items-center justify-between">
            <h2 className="font-press text-gray-300">INJECTION</h2>
            <div
              className="navbar-collapse collapse grow items-center flex justify-end"
              id="navbarSupportedContentY"
            >
              <Button
                onClick={() => {
                  playCancelButton();
                  window.location.href = "/mypage/match-history";
                }}
                buttonStyle={ButtonStyle.isNomal}
                font={"dot"}
              >
                戻る
              </Button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
