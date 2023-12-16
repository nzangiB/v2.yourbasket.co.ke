import { Router } from "@wearearchangel/handcrafted";
import { Home } from "../pages/Home";

Router({
  home: {
    path: '/',
    async template (props) {
      return `
        ${await Home(props)}
      `
    },
  },
});
