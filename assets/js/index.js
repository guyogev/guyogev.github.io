function jumpTo(id) {
  const e = document.getElementById(id);
  const top = e.getBoundingClientRect().top - 32;
  window.scrollBy({
    top: top,
    behavior: "smooth"
  })
};