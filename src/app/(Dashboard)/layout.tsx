/* eslint-disable react/no-children-prop */
import React, { ReactNode } from "react";
import Sidebar from "../Component/Sideber/Sidebar";
type LayoutProps = {
  children: ReactNode;
};
const layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default layout;
