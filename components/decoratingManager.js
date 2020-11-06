import runDecorator from './runDecorator.js';

const decoratingManager = () => {
    if (document.readyState === 'complete') {
        runDecorator();
        return;
    }

    if (document.readyState !== 'complete') {
        setTimeout(runDecorator, 1500);
    }
};

export default decoratingManager;
