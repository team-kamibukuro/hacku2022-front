import React from "react";

const Finish = () => {
  // TODO: 順位の名前を動的に変える
  return (
    <div>
      <div className="text-center px-10 w-80">
        <div className="mb-2">
          <i className="nes-icon trophy is-large"></i>
        </div>
        <div className="text-left">
          <p className="font-dot text-xl">1位 {"めいちゃん"}</p>
          <p className="font-dot text-base">2位 {"かずきくん"}</p>
          <p className="font-dot text-base">3位 {"はまだ"}</p>
          <p className="font-dot text-base">4位 {"めいちゃん"}</p>
        </div>
      </div>
    </div>
  );
};

export default Finish;
