import Heart from "@/features/play/components/Heart";
import React from "react";
interface Props {
  name: string;
  heartbeat: number;
  finished: boolean;
  serverdown?: boolean;
  firewall: boolean;
}

const UserInfo: React.FC<Props> = ({
  name,
  heartbeat,
  finished,
  serverdown = false,
  firewall,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <p className="font-dot text-white text-base mr-2 mb-1">{name}</p>
        {heartbeat < 1 ? (
          <Heart isTransparent={true} />
        ) : (
          <Heart isTransparent={false} />
        )}
        {heartbeat < 2 ? (
          <Heart isTransparent={true} />
        ) : (
          <Heart isTransparent={false} />
        )}
        {heartbeat < 3 ? (
          <Heart isTransparent={true} />
        ) : (
          <Heart isTransparent={false} />
        )}
      </div>
      {firewall && (
        <div className="nes-badge m-0 -mb-1">
          <span className="is-error font-press text-xs">FIREWALL</span>
        </div>
      )}
      {serverdown && (
        <div className="nes-badge m-0 -mb-1">
          <span className="is-dark font-press text-xs">500ERROR</span>
        </div>
      )}
      {finished && (
        <div className="bg-white px-1 border-solid border-red-700 border-2">
          <p className="font-press text-sm text-red-500 ml-2">
            FNISHED!!<span className="text-lg">🎉</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
