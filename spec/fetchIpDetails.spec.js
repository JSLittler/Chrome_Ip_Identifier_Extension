import fetchIpDetails from '../components/fetchIpDetails.js';

describe("Fetch Ip Details", () => {
  const ipDetails = {
    ip : "111.111.111.111",
    city: "ExampleCity",
    country_code: "GB"
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(ipDetails),
    })
  );

  it("returns an array", async () => {
    const data = await fetchIpDetails([], []);
    
    expect(data).toEqual([]);
  });

  it("returns populated ipDetails array", async () => {
    const data = await fetchIpDetails(["111.111.111.111"], []);
    
    expect(data).toEqual([ipDetails]);
  });

  it("returns only ipDetails that have not been fetched", async () => {
    await fetchIpDetails(["111.111.111.111", "222.222.222.222"], [ipDetails]);
    
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("does not call fetch if ip already mapped", async () => {
    await fetchIpDetails(["111.111.111.111"], [ipDetails]);
    
    expect(global.fetch).not.toHaveBeenCalled();
  });
});