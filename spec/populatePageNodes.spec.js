import setupMockDocument from './setupMockDocument.js';
import populatePageNodes from '../components/populatePageNodes.js';

describe('populatePageNodes', () => {
  setupMockDocument()

  const testDiv = document.createElement('div');
  testDiv.id = "Test-Div";

  const testPageNodesOne = global.window.document.createTextNode("111.111.111.111");
  testPageNodesOne.id = 'Test-Node-One';

  const testPageNodesTwo = global.window.document.createTextNode("non ip related text");
  testPageNodesTwo.id = 'Test-Node-Two';

  testDiv.appendChild(testPageNodesOne);
  testDiv.appendChild(testPageNodesTwo);
  document.body.appendChild(testDiv);

  it('returns an array of nodes on the page, poulated from and including the parent node and containing child nodes', async () => {
    const parentNode = document.body.childNodes;
    const polulatedPageNodes = await populatePageNodes(parentNode);

    expect(parentNode.length).toEqual(1);
    expect(polulatedPageNodes.length).toEqual(3);
  });
});