import decoratingManager from './decoratingManager.js';

const observerCallback = (mutationsList, observer) => {
  for(let mutation of mutationsList) {
      if (mutation.type === 'characterData' ) {
          decoratingManager();
      }
  }
};

export default observerCallback;
