import decoratingManager from './components/decoratingManager.js';
import observerCallback from './components/observerCallback.js';

const config = { attributes: true, childList: true, subtree: true, characterData: true };
const observer = new MutationObserver(observerCallback);

decoratingManager();
observer.observe(document.body, config);
