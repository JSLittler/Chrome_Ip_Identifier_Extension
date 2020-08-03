let ipArray = [];
let isDecoratorRunning = false;

let ipStore = {
    ipStoreArray: [],
    addIpDetailsToStore : (ipDetails) => {
        ipStore.ipStoreArray.push(ipDetails)
    },
    getIpDetails : (ip) => {
        return ipStore.ipStoreArray.filter((e) => {return e.ip == ip})
    },
    getAllIpDetails : () => {
        return ipStore.ipStoreArray;
    }
}

const GetFlag = (cc) => {
    const CC_REGEX = /^[a-z]{2}$/i;

    const OFFSET = 127397;

    if (!CC_REGEX.test(cc)) {
        const type = typeof cc;
        throw new TypeError(
          `cc argument must be an ISO 3166-1 alpha-2 string, but got '${
            type === 'string' ? cc : type
          }' instead.`,
        );
    }
    
    const chars = [...cc.toUpperCase()].map(c => c.charCodeAt() + OFFSET);
    return String.fromCodePoint(...chars);
}

runDecorator = () => {
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
        return nodeText = pageNodes.map(v => v.nodeValue);
    };

    const getIpsOnPage = () => {
        populatePageNodes();
        const array = getNodeText().filter(e => { return /\S/.test(e); });
        const cleanArray = array.filter(Boolean);
        const finalCleanArray = cleanArray.filter(e => { return e.search(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/) > -1; });

        return [...new Set(finalCleanArray)];
    };

    pageIpDecoration = () => {
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
            newSpan.innerText = ipDetails.city + " " + GetFlag(ipDetails.country_code);
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
        ipArray = getIpsOnPage();

        if (ipArray.length < 1) {
            return;
        }

        buildIpDecoration();
    };

    tracePageIps();
};

const decoratingManager = () => {
    isDecoratorRunning = true;

    if (document.readyState === 'complete') {
        runDecorator();
        return isDecoratorRunning = false;
    }

    if (document.readyState !== 'complete') {
        setTimeout(runDecorator, 1500);
        isDecoratorRunning = false;
    }
};

const targetNode = document.body;

const config = { attributes: true, childList: true, subtree: true, characterData: true };

const callback = (mutationsList, observer) => {
    for(let mutation of mutationsList) {
        if (mutation.type === 'characterData' ) {
            decoratingManager();
        }
    }
};

const observer = new MutationObserver(callback);

observer.observe(targetNode, config);

decoratingManager();
