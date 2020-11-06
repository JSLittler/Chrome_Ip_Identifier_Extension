import decoratingManager from './decoratingManager.js';

const config = { attributes: true, childList: true, subtree: true, characterData: true };

const observerCallback = (mutationsList, observer) => {
  for(let mutation of mutationsList) {
      if (mutation.type === 'childList') {
          console.log('a change happened', mutation);
          decoratingManager();
          observer.disconnect();
      }
  }

  observer.observe(document.body, config);
};

export default observerCallback;
