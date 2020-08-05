import getFlag from './getFlag.js';

const runDecorator = () => {
  let ipArray = [];
  let ipStore = {
      ipStoreArray: [],
      addIpDetailsToStore : (ipDetails) => {
          ipStore.ipStoreArray.push(ipDetails)
          window.localStorage.setItem('ipStorage', JSON.stringify(ipStore.ipStoreArray) )
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
  }

  let pageNodes = [...document.body.childNodes];

  const getChildNodes = (node) => {
      if (!!node.childNodes.length) {
          pageNodes = [...pageNodes, ...node.childNodes];
      }
  };

  const populatePageNodes = () => {
      for (let i = 0; i < pageNodes.length; i++) {
          getChildNodes(pageNodes[i])
      };
  };

  const getNodeText = () => {
      return pageNodes.map(v => v.nodeValue);
  };

  const getIpsOnPage = () => {
      populatePageNodes();
      const array = getNodeText().filter(e => { return /\S/.test(e); });
      const cleanArray = array.filter(Boolean);
      const finalCleanArray = cleanArray.filter(e => { return e.search(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/) > -1; });

      return [...new Set(finalCleanArray)];
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
      ipArray = getIpsOnPage();

      if (ipArray.length < 1) {
          return;
      }

      buildIpDecoration();
  };

  tracePageIps();
};

export default runDecorator;
