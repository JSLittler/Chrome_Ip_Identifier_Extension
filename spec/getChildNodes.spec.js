import getChildNodes from '../components/getChildNodes.js';

describe("Testing DOM element", () => {
  let testDiv = global.document.createElement('div');
  const testChildDiv = global.document.createElement('div');
  testChildDiv.innerText = "111.111.111.111";
  testDiv.appendChild(testChildDiv);

  it("finds a child node", () => {
      expect(getChildNodes(testDiv).length).toEqual(1);
      expect(getChildNodes(testDiv)[0].innerText).toEqual("111.111.111.111");
  });

  it("finds multiple child nodes", () => {
    const childDivTwo = global.document.createElement('div');
    childDivTwo.innerText = "222.222.222.222"
    testDiv.appendChild(childDivTwo);
    expect(getChildNodes(testDiv).length).toEqual(2);
    expect(getChildNodes(testDiv)[1].innerText).toEqual("222.222.222.222");
  });

  it("returns empty array if no children present", () => {
    testDiv = global.document.createElement('div');
    expect(getChildNodes(testDiv).length).toEqual(0);
  });
});