import getNodeText from '../components/getNodeText.js';

describe("getNodeText", () => {
  let testDiv = document.createTextNode("111.111.111.111");

  it("retrieves correct node text", () => {
      expect(getNodeText([testDiv])).toEqual(["111.111.111.111"]);
  });
});