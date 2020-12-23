import getFlag from './getFlag.js';

const createIpElement = (ipDetails) => {
  const newElement = document.createElement("div");

  newElement.classList = "special-ip";
  newElement.style.color = "green";
  newElement.innerHTML = ipDetails.ip;

  const newSpan = document.createElement("div");

  newSpan.classList = "extra-ip-city";
  const cityEl = document.createElement("p");
  cityEl.innerHTML = `City: ${ipDetails.city} ${getFlag(ipDetails.country_code)}`;
  cityEl.style.color = "green";
  newSpan.appendChild(cityEl);

  const toolTip = document.createElement("div");

  const locationEl = document.createElement("p");
  const location = document.createTextNode(`Region: ${ipDetails.region}`);
  locationEl.appendChild(location);

  const countryEl = document.createElement("p");
  const country = document.createTextNode(`Country: ${ipDetails.country_name}`);
  countryEl.appendChild(country);

  toolTip.appendChild(locationEl);
  toolTip.appendChild(countryEl);
  toolTip.classList = "ip-tooltip";

  newElement.appendChild(newSpan);

  newElement.addEventListener("mouseenter", function( event ) {   
    // highlight the mouseenter target
    event.target.style.color = "purple";
    newSpan.appendChild(toolTip);
  }, false);

  newElement.addEventListener("mouseleave", function( event ) {   
    // highlight the mouseenter target
    event.target.style.color = "green";
    newSpan.removeChild(toolTip);
  }, false);

  newElement.appendChild(newSpan);

  return newElement;

};

export default createIpElement;
