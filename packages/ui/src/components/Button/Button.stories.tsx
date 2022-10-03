// Button.stories.ts|tsx

import React from "react";

import { ComponentMeta } from "@storybook/react";

import Button from "./Button";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const Primary = () => {
  return <Button variant='primary'>Button</Button>;
};

export const PrimaryOutline = () => {
  return (
    <Button variant='primary' outline>
      Button
    </Button>
  );
};

export const Secondary = () => {
  return <Button variant='secondary'>Button</Button>;
};

export const SecondaryOutline = () => {
  return (
    <Button variant='secondary' outline>
      Button
    </Button>
  );
};

export const Danger = () => {
  return <Button variant='danger'>Button</Button>;
};

export const DangerOutline = () => {
  return (
    <Button variant='danger' outline>
      Button
    </Button>
  );
};

export const Disabled = () => {
  return (
    <Button variant='danger' disabled>
      Button
    </Button>
  );
};

export const Small = () => {
  return <Button size='small'>Button</Button>;
};

export const Large = () => {
  return <Button size='large'>Button</Button>;
};
