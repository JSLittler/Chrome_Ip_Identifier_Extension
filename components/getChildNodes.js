const getChildNodes = (node) => {
  if (!!node.childNodes.length) {
      return [...node.childNodes];
  }

  return [];
};

export default getChildNodes;
