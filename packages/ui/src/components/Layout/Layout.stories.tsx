// Layout.stories.ts|tsx

import React from "react";

import { ComponentMeta } from "@storybook/react";

import Layout from "./Layout";

export default {
  title: "Layout",
  component: Layout,
} as ComponentMeta<typeof Layout>;

export const Basic = () => {
  return (
    <Layout title='Hello'>
      <h2>layout</h2>
    </Layout>
  );
};
