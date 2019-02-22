function jumpTo(id) {
  const e = document.getElementById(id);
  const top = e.getBoundingClientRect().top - 32;
  window.scrollBy({
    top: top,
    behavior: "smooth"
  })
};

function lazyLoadImages() {
  const imgDefer = document.getElementsByTagName('img');
  for (let i = 0; i<imgDefer.length; i++) {
    if (imgDefer[i].getAttribute('data-src')) {
      imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
    }
  }
}

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    lazyLoadImages();
  }
});
