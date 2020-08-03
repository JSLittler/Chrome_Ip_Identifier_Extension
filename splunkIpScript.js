let isDecoratorRunning = false;
let ipArray = [];
let ipDetailsArray = [];

const isDocumentReady = () => {
    return !ipDetailsArray.length && document.readyState === 'complete';
};

const isNewIp = () => {
    const oldIpArray = ipDetailsArray.filter(ip => ipArray.includes(ip.ip) )
    return (!!ipDetailsArray && oldIpArray.length !== ipArray.length);
};

const isNotReady = () => {
    return !ipDetailsArray.length && document.readyState !== 'complete';
};

const GetFlag = (cc) => {

    // country code regex
    const CC_REGEX = /^[a-z]{2}$/i;

    // offset between uppercase ascii and regional indicator symbols
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
        ipDetailsArray.forEach(ipDetails => {
            const newElement = document.createElement("div")
            newElement.classList = "special-ip"
            newElement.style = "color : green";
            newElement.innerText = ipDetails.ip;
            const newSpan = document.createElement("div");
            newSpan.classList = "extra-ip-city";
            newSpan.innerText = ipDetails.city + " " + GetFlag(ipDetails.country_code);
            newElement.appendChild(newSpan);

            const thisNode = pageNodes.find(node => node.nodeValue == ipDetails.ip);

            thisNode.replaceWith(newElement);
        });
    };

    const buildIpDecoration = () => {
        ipArray.forEach((ip, index) => {
            if(ipDetailsArray.includes(ip)) {
                return;
            }

            fetch(`https://ipapi.co/${ip}/json/`).then(
                response => {
                    response.json().then(
                        data => {
                            console.log('response');
                            ipDetailsArray.push(data);
                            isNewIp && (ipArray = ipDetailsArray.filter(ip => !ipArray.includes(ip.ip)));
                            setTimeout(pageIpDecoration(), 1500);
                        }
                    );
                }
            );
        });
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
    console.log('in Decorating Manager');

    if (isDocumentReady() || isNewIp()) {
        console.log('*** runDecorator() is ready or newIp');
        runDecorator();
        return isDecoratorRunning = false;
    }
    
    if (isNotReady()) {
        console.log('*** runDecorator() is not ready');
        setTimeout(runDecorator, 1500);
        isDecoratorRunning = false;
    } 
};

const targetNode = document.body;

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true, characterData: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {

    for(let mutation of mutationsList) {
        if (mutation.type === 'characterData' && !isDecoratorRunning) {
            console.log('*** ', mutation.type, ' ***', ' A page element has been changed');
            decoratingManager();
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

decoratingManager();
