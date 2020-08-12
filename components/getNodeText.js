const getNodeText = (pageNodes) => {
  return pageNodes.map(v => v.nodeValue);
};

export default getNodeText;
