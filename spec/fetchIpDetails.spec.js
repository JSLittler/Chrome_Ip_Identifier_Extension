import fetchIpDetails from '../components/fetchIpDetails.js';

describe("Fetch Ip Details", function() {
  it("returns an array", async () => {
    const data = await fetchIpDetails([], []);
    
    expect(data).toEqual([]);
  });
});