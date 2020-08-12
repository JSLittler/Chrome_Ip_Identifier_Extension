import getFlag from './getFlag.js';

const createIpElement = (ipDetails) => {
  const newElement = document.createElement("div")

  newElement.classList = "special-ip"
  newElement.style = "color : green";
  newElement.innerText = ipDetails.ip;

  const newSpan = document.createElement("div");

  newSpan.classList = "extra-ip-city";
  newSpan.innerText = ipDetails.city + " " + getFlag(ipDetails.country_code);
  newElement.appendChild(newSpan);

  var toolTipString = '    <div class="ip-tooltip"> ' +
  '<p>Washington, United States 🇺🇸</p>' +
  '<p>Google</p>' +
  '</div>'

  var parser = new DOMParser();
  var toolTip = parser.parseFromString(toolTipString, "text/html")

  newElement.addEventListener("mouseenter", function( event ) {   
    // highlight the mouseenter target
    event.target.style.color = "purple";
    document.body.appendChild(toolTip);
  
    // reset the color after a short delay
    setTimeout(function() {
      event.target.style.color = "";
    }, 500);
  }, false);

  return newElement;

};

export default createIpElement;
