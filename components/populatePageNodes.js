import getChildNodes from './getChildNodes.js';

const populatePageNodes = (pageNodes) => {
  for (let i = 0; i < pageNodes.length; i++) {
    pageNodes = [...pageNodes, ...getChildNodes(pageNodes[i])];
  };

  return pageNodes;
};

export default populatePageNodes;
