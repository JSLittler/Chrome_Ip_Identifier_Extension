import createIpElement from './createIpElement.js';

const pageIpDecoration = (ipArray, allIpDetails, pageNodes) => {
  ipArray.forEach(ip => {
      let ipDetails = allIpDetails.filter((e) => {return e.ip == ip});

      if (!ipDetails.length) {
          return;
      }

      const thisNode = pageNodes.find(node => node.nodeValue == ipDetails[0].ip);

      if (thisNode.parentElement && thisNode.parentElement.className.includes('special-ip')) {
          return;
      }

      const newElement = createIpElement(ipDetails[0]);

      thisNode.replaceWith(newElement);
  });
};

export default pageIpDecoration;
