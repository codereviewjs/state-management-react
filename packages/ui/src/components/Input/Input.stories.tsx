import React from "react";

import { ComponentMeta } from "@storybook/react";

import Input from "./Input";

export default {
  title: "Input",
  component: Input,
} as ComponentMeta<typeof Input>;

export const Regular = () => {
  return <Input placeholder='something' />;
};

export const Disabled = () => {
  return <Input placeholder='something' disabled />;
};
