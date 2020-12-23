import getFlag from './getFlag.js';

const createIpElement = (ipDetails) => {
  const newElement = document.createElement("div");

  newElement.classList = "special-ip";
  newElement.style.color = "green";
  newElement.innerHTML = ipDetails.ip;

  const newSpan = document.createElement("div");

  newSpan.classList = "extra-ip-city";
  const city = document.createElement("p");
  city.innerText = `City: ${ipDetails.city} ${getFlag(ipDetails.country_code)}`;
  city.style.color = "green";
  newSpan.appendChild(city);

  const toolTip = document.createElement("div");

  const region = document.createElement("p");
  region.innerText = `Region: ${ipDetails.region}`;
  region.style.color = "green";

  const country = document.createElement("p");
  country.innerText = `Country: ${ipDetails.country_name}`;
  country.style.color = "green";

  toolTip.appendChild(region);
  toolTip.appendChild(country);
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
