console.log('now');
let ipDetailsArray = [];


runDecorator = () => {

    console.log('runDecorator');

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
    }
    const getNodeText = () => {
        return nodeText = pageNodes.map(v => v.nodeValue);
    };
    const getIpsOnPage = () => {
        populatePageNodes();
        const array = getNodeText().filter(e => { return /\S/.test(e); });
        const cleanArray = array.filter(Boolean);
        return cleanArray.filter(e => { return e.search(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/) > -1; });
    };
    const ipArray = getIpsOnPage();

    console.log(ipArray);

    if (ipArray.length < 1) {
        return;
    }

    

    ipArray.forEach((ip, index) => {
        console.log('request');
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
    })

    pageIpDecoration = () => {

        ipDetailsArray.forEach(ipDetails => {
            const newElement = document.createElement("div")
            newElement.classList = "special-ip"
            newElement.style = "color : green";
            newElement.innerText = ipDetails.ip + " " + ipDetails.country_code;

            const thisNode = pageNodes.find(node => node.nodeValue == ipDetails.ip);

            thisNode.replaceWith(newElement);

        })



        console.log(ipDetailsArray)

    };

};

// window.addEventListener('DOMContentLoaded', runDecorator);

// // document.addEventListener('readystatechange', () => {    
// //     if (document.readyState == 'complete') runDecorator();
// //   });

// window.addEventListener("load", runDecorator);

//  window.onload = () => {
//     let newBody = document.createElement("body")
//     newBody.onload="() => {runDecorator()}"
//     document.querySelector('html').appendChild(newBody);


//  };

const timer = window.setInterval(() => {

    if (ipDetailsArray.length) {
        clearInterval(timer);
        return;
    }

    if (document.readyState === 'complete') {
        runDecorator();
    }
}, 1000)

timer();

//document.addEventListener('change', runDecorator);

// // Select the node that will be observed for mutations
// const targetNode = document.getElement('body');

// // Options for the observer (which mutations to observe)
// const config = { attributes: true, childList: true, subtree: true };

// // Callback function to execute when mutations are observed
// const callback = function(mutationsList, observer) {
//     // Use traditional 'for loops' for IE 11
//     for(let mutation of mutationsList) {
//         if (mutation.type === 'childList') {
//             console.log('A child node has been added or removed.');
//         }
//         else if (mutation.type === 'attributes') {
//             console.log('The ' + mutation.attributeName + ' attribute was modified.');
//         }

//         runDecorator();
//     }
// };

// // Create an observer instance linked to the callback function
// const observer = new MutationObserver(callback);

// // Start observing the target node for configured mutations
// observer.observe(targetNode, config);

// // // Later, you can stop observing
// // observer.disconnect();

//https://splunk.meer-spacestation.co.uk/en-US/app/Home/report?s=%2FservicesNS%2Fnobody%2FHome%2Fsaved%2Fsearches%2FIP%2520-%2520Top%2520requests%2520in%2520IIS%2520logs&sid=_a2FybC5uZXdhcmtAYmdsZ3JvdXAuY28udWs_ZHVuY2FuLnNhbXBsZUBiZ2xncm91cC5jby51aw__Home__RMD56b0f9e1951b21b81_at_1594133413_90601&display.page.search.mode=verbose&dispatch.sample_ratio=1&q=search%20index%3Daws_home_prod%20sourcetype%3Diis%20x_forward_for_client_ip%3D*%20%7C%20timechart%20count%20by%20x_forward_for_client_ip%20limit%3D10%20useother%3Df&earliest=-60m%40m&latest=now