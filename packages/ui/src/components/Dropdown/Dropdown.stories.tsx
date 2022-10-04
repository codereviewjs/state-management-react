import { ComponentMeta } from "@storybook/react";

import Dropdown from "./Dropdown";

export default {
  title: "Dropdown",
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

export const Regular = () => {
  return (
    <Dropdown
      placeholder='something'
      value={2}
      options={[
        { value: "1", content: "hello!" },
        { value: "2", content: "Bye" },
        { value: "3", content: "hi" },
      ]}
    />
  );
};

export const Disabled = () => {
  return <Dropdown options={[]} placeholder='something' disabled />;
};
