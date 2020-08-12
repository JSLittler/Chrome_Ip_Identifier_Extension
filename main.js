import decoratingManager from './components/decoratingManager.js';
import observerCallback from './components/observerCallback.js';

const targetNode = document.body;
const config = { attributes: true, childList: true, subtree: true, characterData: true };
const observer = new MutationObserver(observerCallback);

decoratingManager();
observer.observe(targetNode, config);
