import getNodeText from './getNodeText.js';

const getIpsOnPage = (pageNodes) => {
  const array = getNodeText(pageNodes).filter(e => { return /\S/.test(e); });
  const cleanArray = array.filter(Boolean);
  const finalCleanArray = cleanArray.filter(e => { return e.search(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/) > -1; });

  return [...new Set(finalCleanArray)];
};

export default getIpsOnPage;
