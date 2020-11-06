import jsdom from 'jsdom';

const setupMockDocument = () => {
  const { JSDOM } = jsdom;  
  const { document } = (new JSDOM('<html><body></body></html>')).window;

  Object.defineProperty(window, 'document', {
    writable: true,
    value: document,
  });
};

export default setupMockDocument;
