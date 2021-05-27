import { act } from "react-dom/test-utils";
import { coins } from "../utils/variables";
import StakingCard from "./StakingCard";
import * as ReactDOM from "react-dom";
import { expect } from "chai";

const jsdom = require("mocha-jsdom");

global.document = jsdom({
  url: "http://localhost:3000/",
});

let rootContainer: HTMLDivElement | null;

beforeEach(() => {
  rootContainer = document.createElement("div");
  document.body.appendChild(rootContainer);
});

afterEach(() => {
  if (!!rootContainer) {
    document.body.removeChild(rootContainer);
    rootContainer = null;
  }
});

describe("testing StakingCard component", () => {
  it("render with coin list", () => {
    act(() => {
      if (!!rootContainer) {
        ReactDOM.render(<StakingCard />, rootContainer);
      }
    });
    if (!!rootContainer) {
      const options = rootContainer.querySelectorAll("option");
      const optionCoins = options
        ? Array.from(options).map((x) => {
            return x.value;
          })
        : null;
      console.log(optionCoins);
      if (optionCoins) {
        for (let i = 0; i < optionCoins?.length; i++) {
          expect(optionCoins[i], coins[i]);
        }
      }
    }
  });
});
