import React from "react";

import { ComponentMeta } from "@storybook/react";

import InputLabel from "./InputLabel";

export default {
  title: "InputLabel",
  component: InputLabel,
} as ComponentMeta<typeof InputLabel>;

export const Regular = () => {
  return (
    <InputLabel
      labelProps={{ label: "label" }}
      inputProps={{ placeholder: "placeholder" }}
    />
  );
};
