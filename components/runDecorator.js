import populatePageNodes from './populatePageNodes.js';
import getIpsOnPage from './getIpsOnPage.js';
import fetchIpDetails from './fetchIpDetails.js';
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
            if(!!fromStorage){
                ipStore.ipStoreArray = JSON.parse(fromStorage);
            }
        }
    }; 

    const decoratePage = async () => {
        ipStore.setupStoreArray();
        pageNodes = await populatePageNodes(pageNodes);
        ipArray = await getIpsOnPage(pageNodes);
        let allIpDetails = ipStore.getAllIpDetails();
        let ipDetailsArray = await fetchIpDetails(ipArray, allIpDetails);
        await ipDetailsArray.forEach(ipD => ipStore.addIpDetailsToStore(ipD));

        if (ipArray.length < 1) {
            return;
        }
        
        allIpDetails = ipStore.getAllIpDetails();
        await pageIpDecoration(ipArray, allIpDetails, pageNodes);
        return;
    };

    decoratePage();
    return;
};

export default runDecorator;
