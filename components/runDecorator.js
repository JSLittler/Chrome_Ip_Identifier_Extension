import populatePageNodes from './populatePageNodes.js';
import getIpsOnPage from './getIpsOnPage.js';
import pageIpDecoration from './pageIpDecoration.js';

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

  const buildIpDecoration = async () => {
      for (let index = 0; index < ipArray.length; index++) {
          const ip = ipArray[index];

          if (!!ipStore.getIpDetails(ip).length) {
              continue;
          } else {
              let response = await fetch((`https://ipapi.co/${ip}/json/`));
              let data = await response.json()
              
              ipStore.addIpDetailsToStore(data);                 
          }; 
      }
  };

  const tracePageIps = async () => {
      ipStore.setupStoreArray();
      pageNodes = await populatePageNodes(pageNodes);
      ipArray = await getIpsOnPage(pageNodes);
      await buildIpDecoration();

      if (ipArray.length < 1) {
          return;
      }
      
      let allIpDetails = ipStore.getAllIpDetails();
      pageIpDecoration(ipArray, allIpDetails, pageNodes);
  };

  tracePageIps();
};

export default runDecorator;
