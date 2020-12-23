import getFlag from './getFlag.js';

const createIpElement = (ipDetails) => {
  const newElement = document.createElement("div");

  newElement.classList = "special-ip";
  newElement.style = "color : green";
  newElement.innerHTML = ipDetails.ip;

  const newSpan = document.createElement("div");

  newSpan.classList = "extra-ip-city";
  newSpan.innerHTML = ipDetails.city + " " + getFlag(ipDetails.country_code);

  const toolTip = document.createElement("div");

  const locationEl = document.createElement("p");
  const location = document.createTextNode(ipDetails.region);
  locationEl.appendChild(location);

  const countryEl = document.createElement("p");
  const country = document.createTextNode(`${ipDetails.country_name} ${getFlag(ipDetails.country_code)}`);
  countryEl.appendChild(country);

  toolTip.appendChild(locationEl);
  toolTip.appendChild(countryEl);
  toolTip.classList = "ip-tooltip";

  newElement.appendChild(newSpan);

  newElement.addEventListener("mouseenter", function( event ) {   
    // highlight the mouseenter target
    event.target.style.color = "purple";
    newSpan.appendChild(toolTip);
  
    // reset the color after a short delay
    setTimeout(function() {
      event.target.style.color = "";
    }, 500);
  }, false);

  newElement.appendChild(newSpan);

  return newElement;

};

export default createIpElement;
