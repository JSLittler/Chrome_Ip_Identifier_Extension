import getIpsOnPage from '../components/getIpsOnPage.js';

describe("getIpsOnPage", () => {
  let testDiv = global.document.createTextNode("111.111.111.111");

  it("finds a child node", () => {
      expect(getIpsOnPage([testDiv])).toEqual(["111.111.111.111"]);
  });
});