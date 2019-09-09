import { configure, addParameters } from "@storybook/react";
import { create } from "@storybook/theming";
const req = require.context("../stories", true, /\.stories\.tsx$/);

const theme = create({ base: "light" });
addParameters({ options: { theme } });

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
