import pageIpDecoration from '../components/pageIpDecoration.js';

describe("pageIpDecoration", () => {
  const ipArray = ["111.111.111.111"];

  const ipDetails = {
    ip : "111.111.111.111",
    city: "ExampleCity",
    country_code: "GB"
  }

  const testDiv = document.createElement('div');
  testDiv.id = 'Test-Div';

  const testPageNodesOne = document.createTextNode("111.111.111.111");
  testPageNodesOne.id = 'Test-Node-One';

  const testPageNodesTwo = document.createTextNode("non ip related text");
  testPageNodesTwo.id = 'Test-Node-Two';

  testDiv.appendChild(testPageNodesOne);
  testDiv.appendChild(testPageNodesTwo);

  global.window.document.body.appendChild(testDiv);

  const nodeArray = [testPageNodesOne, testPageNodesTwo];

  it("should replace a text node with an ip address", () => {
    const oldElement = global.window.document.getElementById('Test-Div');
    console.log('oldElement', oldElement);

    pageIpDecoration(ipArray, [ipDetails], nodeArray);

    const newElement = global.window.document.getElementsByClassName("special-ip");
    console.log('newElement', newElement);

    expect(newElement).not.toEqual(oldElement);
  });
});