const createParagraph = innerText => {
  const element = document.createElement("p");
  element.innerText = innerText;
  element.style.color = "green";
  element.style.fontSize = "x-small";

  return element;
}

export default createParagraph;
