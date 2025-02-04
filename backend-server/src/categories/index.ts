import Mustache from "mustache";

function renderPage() {
  const queryParameters = new URLSearchParams(window.location.search);
  const categoryId = queryParameters.get("id");

  const templateData = {
    categoryId: categoryId ?? "Error: Empty category",
  };

  const template = document.getElementById("template").innerHTML;
  const rendered = Mustache.render(template, templateData);
  document.getElementById("target").innerHTML = rendered;
}

window.onload = () => {
  renderPage();
};
