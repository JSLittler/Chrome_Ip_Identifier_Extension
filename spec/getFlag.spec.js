import getFlag from '../components/getFlag.js';

describe("getFlag", () => {
  it("returns correct flag when given a correct country code", () => {
      expect(getFlag('GB')).toBe('🇬🇧');
  });
});