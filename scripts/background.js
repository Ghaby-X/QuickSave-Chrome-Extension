var accordion = document.getElementById("accordion");

accordion.addEventListener("click", function () {
  this.classList.toggle("active");

  var panel = this.nextElementSibling;
  if (panel.style.display == "flex") {
    panel.style.display = "none";
  } else {
    panel.style.display = "flex";
  }
});
