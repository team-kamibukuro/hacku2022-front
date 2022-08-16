import Heart from "@/features/play/components/Heart";
import React from "react";
interface Props {
  name: string;
  heartbeat: number;
}

const UserInfo: React.FC<Props> = ({ name, heartbeat }) => {
  return (
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
  );
};

export default UserInfo;
