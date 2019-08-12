function jumpTo(id) {
  const e = document.getElementById(id);
  const top = e.getBoundingClientRect().top - 32;
  window.scrollBy({
    top: top,
    behavior: "smooth"
  })
}

function lazyLoadImages() {
  const deferred = [
    ...document.getElementsByTagName('img'),
    ...document.getElementsByTagName('iframe')
  ];
  for (let i = 0; i<deferred.length; i++) {
    if (deferred[i].getAttribute('data-src')) {
      deferred[i].setAttribute('src',deferred[i].getAttribute('data-src'));
    }
  }
}

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    lazyLoadImages();
  }
});
