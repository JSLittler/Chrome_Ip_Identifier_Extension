import jsdom from 'jsdom';
import pageIpDecoration from '../components/pageIpDecoration.js';

describe("pageIpDecoration", () => {
  const { JSDOM } = jsdom;  
  const doc = (new JSDOM('<html><body><div id="Test-Div">111.111.111.111</div></body></html>')).window.document;

  Object.defineProperty(window, 'document', {
    writable: true,
    value: doc,
  });
  
  console.log(document.getElementById('Test-Div').innerHTML);
  const ipArray = ["111.111.111.111"];

  const ipDetails = {
    ip : "111.111.111.111",
    city: "ExampleCity",
    country_code: "GB"
  }

  const testDivTwo = document.createElement('div');
  testDivTwo.id = "Test-Div-Two";

  const testPageNodesOne = global.window.document.createTextNode("111.111.111.111");
  testPageNodesOne.id = 'Test-Node-One';

  const testPageNodesTwo = global.window.document.createTextNode("non ip related text");
  testPageNodesTwo.id = 'Test-Node-Two';

  testDivTwo.appendChild(testPageNodesOne);
  testDivTwo.appendChild(testPageNodesTwo);
  document.body.appendChild(testDivTwo);

  console.log(document.getElementById('Test-Div-Two').innerHTML);

  const nodeArray = [testPageNodesOne, testPageNodesTwo];

  it("should replace a text node with an ip address", () => {
    const oldElement = document.getElementById('Test-Div-Two').innerHTML;
    console.log('oldElement', oldElement);

    pageIpDecoration(ipArray, [ipDetails], nodeArray);

    const newElement = document.getElementById('Test-Div-Two').innerHTML;
    console.log('newElement', newElement);

    expect(newElement).not.toEqual(oldElement);
  });
});