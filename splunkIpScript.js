let oldIpArray = [];
let ipArray = [];
let ipDetailsArray = [];

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
    };
    
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
            fetch(`https://ipapi.co/${ip}/json/`).then(
                response => {
                    response.json().then(
                        data => {
                            ipDetailsArray.push(data);
                            if (index == ipArray.length - 1) {
                                pageIpDecoration();
                            }
                        }
                    );
                }
            );
        });
    };

    const tracePageIps = () => {
        ipArray = getIpsOnPage();

        if (ipArray.length < 1 || ipArray === oldIpArray) {
            return;
        }

        buildIpDecoration();
        oldIpArray = ipArray;
    };

    tracePageIps();
};

const decoratingManager = () => window.setInterval(() => {
    if (ipDetailsArray.length) {
        clearInterval(decoratingManager);
        return;
    }

    if (document.readyState === 'complete') {
        runDecorator();
    }
}, 1000)
.then(
    document.body.addEventListener("hashchange", runDecorator, false)
);

decoratingManager();
