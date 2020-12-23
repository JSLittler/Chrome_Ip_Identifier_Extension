import createIpElement from '../components/createIpElement.js';

const ipDetails = {
    ip : "111.111.111.111",
    city: "ExampleCity",
    country_code: "GB",
    region: "ExampleRegion",
    country: "ExampleCountry"
}

describe("Testing DOM element", () => {
    const ipElement = createIpElement(ipDetails);

    it("contains correct IP", () => {
        expect(ipElement.innerHTML.includes("111.111.111.111")).toBe(true);
    }); 

    it("contains correct City", () => {
        expect(ipElement.innerHTML.includes("ExampleCity, ExampleRegion, ExampleCountry 🇬🇧")).toBe(true);
    }); 
});

