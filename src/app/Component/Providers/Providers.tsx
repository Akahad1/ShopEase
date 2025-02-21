"use client";
import { Provider } from "react-redux";

import React from "react";
import { store } from "../GlobalRedux/Store";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
