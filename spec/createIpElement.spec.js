import createIpElement from '../components/createIpElement.js';

const ipDetails = {
    ip : "111.111.111.111",
    city: "ExampleCity",
    country_code: "GB"
}

describe("Testing DOM element", () => {
    const ipElement = createIpElement(ipDetails);

    it("contains correct IP", () => {
        expect(ipElement.innerHTML.includes("111.111.111.111")).toBe(true);
    }); 

    it("contains correct City", () => {
        expect(ipElement.children[0].childNodes[0].innerText.includes("ExampleCity 🇬🇧")).toBe(true);
    }); 
});

