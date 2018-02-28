// const fadeIn = (element) => {
//   setTimeout(() => {
//     element.style.opacity = 1;
//   }, element.dataset.delay * 1000);
// }

// const emphasize = (element) => {
//   setTimeout(() => {
//     Object.assign(element.style, {
//       'font-size': '1.6rem',
//     });
//   }, element.dataset.delay * 1000);
// }

const typeEffect = (element) => {
  const text = [...element.innerText];
  element.innerHTML = '';
  const delay = element.dataset.delay || 0;
  const speed = element.dataset.speed || 1;
  text.forEach((c, i) => {
    setTimeout(() =>  {
      element.innerHTML = text.slice(0, i+1).join('');
    }, (delay * 1000 + 100* i) / speed);
  })
}

const run = () => {
  // document.querySelectorAll(".fade-in").forEach(fadeIn);
  document.querySelectorAll(".typeEffect").forEach(typeEffect);
};

document.addEventListener("DOMContentLoaded", run);
