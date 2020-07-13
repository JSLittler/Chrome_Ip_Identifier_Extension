let ipArray = [];
let ipDetailsArray = [];

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
            newElement.innerText = ipDetails.ip + " " + ipDetails.country_code;

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
                            console.log('response');
                            ipDetailsArray.push(data);
                            if (index == ipArray.length - 1) {
                                pageIpDecoration();
                            }
                        });
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

const decoratingManager = () => window.setInterval(() => {
    if (ipDetailsArray.length) {
        clearInterval(decoratingManager);
        return;
    }

    // if (ipArray.length > ipDetailsArray.length) {
    //     runDecorator();
    // }

    if (document.readyState === 'complete') {
        runDecorator();
    }
}, 1000);

decoratingManager();