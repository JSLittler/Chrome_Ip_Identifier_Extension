import getFlag from './getFlag.js';

const createIpElement = (ipDetails) => {
  console.log(ipDetails);
  const newElement = document.createElement("div")

  newElement.classList = "special-ip"
  newElement.style = "color : green";
  newElement.innerText = ipDetails.ip;

  const newSpan = document.createElement("div");

  newSpan.classList = "extra-ip-city";
  newSpan.innerText = ipDetails.city + " " + getFlag(ipDetails.country_code);
  newElement.appendChild(newSpan);

  return newElement;

};

export default createIpElement;
