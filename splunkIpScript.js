let ipArray = [];
let ipDetailsArray = [];



let ipStore = {
    ipStoreArray: [],
    populateIpStoreDetails: (ip) => new Promise ((resolve) => {

        // let getIpFromBestLocationPromise = () => new Promise((resolve) => {
        //     resolve();
        // });



        let ipEntry = ipStore.ipStoreArray.filter((e) => {e.ip == ip})
        if (ipEntry.length > 0) {
            resolve();
        }

        fetch(`https://ipapi.co/${ip}/json/`).then(
            response => {
                response.json().then(
                    data => {
                        console.log('response');
                        ipDetailsArray.push(data);
                        ipStore.addIpDetailsToStore(data);

                        resolve();
                    });
            }
        );


        return null;
    }),
    addIpDetailsToStore : (ipDetails) => {
        ipStore.ipStoreArray.push(ipDetails)
    },
    getIpDetails : (ip) => {
        return ipStore.ipStoreArray.filter((e) => {return e.ip == ip})
    }
}

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

        ipArray.forEach(ip => {
            let ipDetails = ipStore.getIpDetails(ip);
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
        let getAllIps = () => new Promise((resolve) => {
            resolve();
          });
        let previousGetAllIps;
        ipArray.forEach((ip, index) => {


           let getIpFromBestLocationPromise = () => new Promise((resolve) => {
                resolve();
            });

            previousGetAllIps = getAllIps;

            GetAllIps = () => new Promise((resolve) => {

            })

            ipStore.populateIpStoreDetails(ip, ()=>{                            
                if (index == ipArray.length - 1) {
                    pageIpDecoration();
                }
            })

            // fillAllPromise = () => new Promise((resolve) => {
            //     previousFillAllPromise()
            //       .then(page.fill)
            //       .then(nextPage)
            //       // .then(pageDelays.nextPageDelay)
            //       .then(resolve);
            //   });


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

    if (document.readyState === 'complete') {
        runDecorator();
    }
}, 5000);

decoratingManager();