import Mustache from "mustache";

function renderPage() {
  const templateData = {
    name: "Thijmen",
    categories: [
      { name: "Action", id: 13 },
      { name: "Disney", id: 36 },
      { name: "Documentaries", id: 42 },
    ],
  };

  const template = document.getElementById("template").innerHTML;
  const rendered = Mustache.render(template, templateData);
  document.querySelector("main").innerHTML = rendered;
}

window.onload = () => {
  renderPage();
};
