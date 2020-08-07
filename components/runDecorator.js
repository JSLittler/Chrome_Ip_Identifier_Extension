import populatePageNodes from './populatePageNodes.js';
import getIpsOnPage from './getIpsOnPage.js';
import createIpElement from './createIpElement.js';

const runDecorator = () => {
  let ipArray = [];
  let pageNodes = [...document.body.childNodes];
  let ipStore = {
    ipStoreArray: [],
    addIpDetailsToStore : (ipDetails) => {
        ipStore.ipStoreArray.push(ipDetails);
        window.localStorage.setItem('ipStorage', JSON.stringify(ipStore.ipStoreArray) );
    },
    getIpDetails : (ip) => {
        console.log('Ip', ip);
        console.log('ipStoreArray', ipStore.ipStoreArray);
        console.log('matchedIp', ipStore.ipStoreArray.filter((e) => {return e.ip == ip}));
        return ipStore.ipStoreArray.filter((e) => {return e.ip == ip})
    },
    getAllIpDetails : () => {
        return ipStore.ipStoreArray;
    },
    setupStoreArray : () => {
        let fromStorage = window.localStorage.getItem('ipStorage');
        if(fromStorage){
            fromStorage = JSON.parse(fromStorage);
            ipStore.ipStoreArray = fromStorage;
        }
    }
  };

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

          const newElement = createIpElement(ipDetails);

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
  };

  const tracePageIps = () => {
      ipStore.setupStoreArray();
      pageNodes = populatePageNodes(pageNodes);
      ipArray = getIpsOnPage(pageNodes);
      buildIpDecoration();

      if (ipArray.length < 1) {
          return;
      }
      
      pageIpDecoration();
  };

  tracePageIps();
};

export default runDecorator;
