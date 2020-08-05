import runDecorator from './runDecorator.js';

let isDecoratorRunning = false;

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
