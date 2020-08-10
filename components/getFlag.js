const getFlag = (cc) => {
  const CC_REGEX = /^[a-z]{2}$/i;

  const OFFSET = 127397;

  if (!CC_REGEX.test(cc)) {
      const type = typeof cc;
      throw new TypeError(
        `cc argument must be an ISO 3166-1 alpha-2 string, but got '${
          type === 'string' ? cc : type
        }' instead.`,
      );
  }
  
  const chars = [...cc.toUpperCase()].map(c => c.charCodeAt() + OFFSET);
  return String.fromCodePoint(...chars);
}

export default getFlag;
