import React, { Children } from "react";

type Props = {
  children?: React.ReactNode;
  title: string;
};
const SubPage: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="h-screen flex flex-col items-start justify-between z-50 py-20 w-[580px]">
      <div className="w-full">
        <div className="border-white border-solid border-b-4 w-full mb-5">
          <h2 className="text-white text-2xl font-press">INJECTION</h2>
        </div>
        <h3 className="text-white text-4xl font-press leading-normal">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
};

export default SubPage;
