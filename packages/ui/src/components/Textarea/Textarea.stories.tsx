import { ComponentMeta } from "@storybook/react";

import Textarea from "./Textarea";

export default {
  title: "Textarea",
  component: Textarea,
} as ComponentMeta<typeof Textarea>;

export const Regular = () => {
  return <Textarea placeholder='something' />;
};

export const Disabled = () => {
  return <Textarea placeholder='something' disabled />;
};
