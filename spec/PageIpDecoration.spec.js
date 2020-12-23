import setupMockDocument from './setupMockDocument.js';
import pageIpDecoration from '../components/pageIpDecoration.js';

describe("pageIpDecoration", () => {
  setupMockDocument();

  const testDiv = document.createElement('div');
  testDiv.id = "Test-Div";

  const testPageNodesOne = global.window.document.createTextNode("111.111.111.111");
  testPageNodesOne.id = 'Test-Node-One';

  const testPageNodesTwo = global.window.document.createTextNode("non ip related text");
  testPageNodesTwo.id = 'Test-Node-Two';

  testDiv.appendChild(testPageNodesOne);
  testDiv.appendChild(testPageNodesTwo);
  document.body.appendChild(testDiv);

  const ipArray = ["111.111.111.111"];

  const ipDetails = [{
    ip : "111.111.111.111",
    city: "ExampleCity",
    country_code: "GB"
  },];

  const nodeArray = [testPageNodesOne, testPageNodesTwo];

  it("should replace old text node with a new re-formatted node without altering non ip text", () => {
    const oldElement = document.getElementById('Test-Div').innerHTML;

    pageIpDecoration(ipArray, ipDetails, nodeArray);

    const newElement = document.getElementById('Test-Div').innerHTML;

    expect(newElement).not.toEqual(oldElement);
    expect(newElement.includes("111.111.111.111")).toBe(true);
    expect(newElement.includes("non ip related text")).toBe(true);
  });
});