import getIpsOnPage from '../components/getIpsOnPage.js';

describe("getIpsOnPage", () => {
  const testNode1 = document.createTextNode("111.111.111.111");
  const testNode2 = document.createTextNode("Not returned");

  it("returns only ips from text nodes", () => {
      expect(getIpsOnPage([testNode1, testNode2])).toEqual(["111.111.111.111"]);
  });
});