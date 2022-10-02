const { setCssVars } = require("../src");

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

setCssVars({
  primaryColor: "#405cf5",
  textColor: "black",
  secondaryColor: "green",
  backgroundColor: "white",
});
