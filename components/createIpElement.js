import getFlag from './getFlag.js';

const createIpElement = (ipDetails) => {
  const createParagraph = innerText => {
    const element = document.createElement("p");
    element.innerText = innerText;
    element.style.color = "green";

    return element;
  }

  const newElement = document.createElement("div");

  newElement.classList = "special-ip";
  newElement.style.color = "green";
  newElement.innerHTML = ipDetails.ip;

  const newSpan = document.createElement("div");

  newSpan.classList = "extra-ip-city";
  const city = createParagraph(`City: ${ipDetails.city} ${getFlag(ipDetails.country_code)}`);
  newSpan.appendChild(city);

  const toolTip = document.createElement("div");

  const region = createParagraph(`Region: ${ipDetails.region}`);
  const country = createParagraph(`Country: ${ipDetails.country_name}`);

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
