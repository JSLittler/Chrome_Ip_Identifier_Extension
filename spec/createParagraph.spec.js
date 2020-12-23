import createParagraph from '../components/createParagraph.js';

describe("Testing DOM element", () => {
  const paragraph = createParagraph('some text');

  it("contains correct IP", () => {
      expect(paragraph.innerText).toBe('some text');
  });
});