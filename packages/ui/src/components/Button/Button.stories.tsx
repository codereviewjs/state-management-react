// Button.stories.ts|tsx

import React from "react";

import { ComponentMeta } from "@storybook/react";

import Button from "./Button";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const Primary = () => {
  return <Button variant='primary' />;
};

export const Secondary = () => {
  return <Button variant='secondary' />;
};
