import React from "react";

const ConnectionError = () => {
  return (
    <div>
      <div className="text-center w-80">
        <div className="text-center">
          <p className="font-dot">
            接続が切断されました。
            <br />
            エントランスへ戻ります。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectionError;
