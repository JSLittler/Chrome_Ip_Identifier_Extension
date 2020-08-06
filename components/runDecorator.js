import getFlag from './getFlag.js';
import ipStore from './ipStore.js';
import populatePageNodes from './populatePageNodes.js';
import getIpsOnPage from './getIpsOnPage.js';

const runDecorator = () => {
  let ipArray = [];
  let pageNodes = [...document.body.childNodes];

  const pageIpDecoration = () => {
      ipArray.forEach(ip => {
          let ipDetails = ipStore.getIpDetails(ip)[0];
          if (!ipDetails) {
              return;
          }

          const thisNode = pageNodes.find(node => node.nodeValue == ipDetails.ip);

          if (thisNode.parentElement && thisNode.parentElement.className.includes('special-ip')) {
              return;
          }

          const newElement = document.createElement("div")
          newElement.classList = "special-ip"
          newElement.style = "color : green";
          newElement.innerText = ipDetails.ip;
          const newSpan = document.createElement("div");
          newSpan.classList = "extra-ip-city";
          newSpan.innerText = ipDetails.city + " " + getFlag(ipDetails.country_code);
          newElement.appendChild(newSpan);

          thisNode.replaceWith(newElement);
      });
  };

  const buildIpDecoration = async () => {
      for (let index = 0; index < ipArray.length; index++) {
          const ip = ipArray[index];

          if (!!ipStore.getIpDetails(ip).length) {
              continue;
          } else {
              let response = await fetch((`https://ipapi.co/${ip}/json/`));
              let data = await response.json();
              
              ipStore.addIpDetailsToStore(data);                   
          }; 
      }
      
      pageIpDecoration();
  };

  const tracePageIps = () => {
      ipStore.setupStoreArray();
      pageNodes = populatePageNodes(pageNodes);
      ipArray = getIpsOnPage(pageNodes);

      if (ipArray.length < 1) {
          return;
      }

      buildIpDecoration();
  };

  tracePageIps();
};

export default runDecorator;
