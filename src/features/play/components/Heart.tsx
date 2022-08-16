import React from "react";
interface Props {
  isTransparent: boolean;
}
const Heart: React.FC<Props> = ({ isTransparent }) => {
  return (
    <i className={`nes-icon heart ${isTransparent && "is-transparent"}`}></i>
  );
};

export default Heart;
