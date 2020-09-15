import fetchIpDetails from '../components/fetchIpDetails.js';

describe("Fetch Ip Details", function() {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
    })
  );

  it("returns an array", async () => {
    const data = await fetchIpDetails([], []);
    
    expect(data).toEqual([]);
  }); 
});