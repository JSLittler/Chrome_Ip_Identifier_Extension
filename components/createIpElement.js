import getFlag from './getFlag.js';

const createIpElement = (ipDetails) => {
  const newElement = document.createElement("span")

  newElement.classList = "special-ip"
  newElement.style.color = "green";
  newElement.innerHTML = ipDetails.ip;

  const newSpan = document.createElement("span");

  var toolTipString = `<div class="ip-tooltip"><table><tr><td>Location</td><td>${ipDetails.city}, ${ipDetails.region}, ${ipDetails.country} ${getFlag(ipDetails.country_code)} </td></tr><tr><td>Provider</td><td>${ipDetails.org}</td></tr></table></div>`;

  newSpan.classList = "extra-ip-city";
  newSpan.innerHTML = '   ' + getFlag(ipDetails.country_code) + toolTipString;
  newElement.appendChild(newSpan);

  return newElement;

};

export default createIpElement;
