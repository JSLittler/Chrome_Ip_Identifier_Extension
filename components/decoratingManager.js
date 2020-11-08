import runDecorator from './runDecorator.js';

const decoratingManager = async () => {
    await setTimeout(runDecorator, 10000);
};

export default decoratingManager;
