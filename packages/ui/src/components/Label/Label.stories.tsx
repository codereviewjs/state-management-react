import React from "react";

import { ComponentMeta } from "@storybook/react";

import Label from "./Label";
import { Input } from "../Input";

export default {
  title: "Label",
  component: Label,
} as ComponentMeta<typeof Label>;

export const Regular = () => {
  return (
    <Label label='Label'>
      <Input placeholder='input' />
    </Label>
  );
};
