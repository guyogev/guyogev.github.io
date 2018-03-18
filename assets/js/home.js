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
  const showAnimations = true;
  if (showAnimations) {
    document.querySelectorAll(".typeEffect").forEach(typeEffect);
  } else {
    const overrideStyle = document.createElement('style');
    overrideStyle.type = 'text/css';
    overrideStyle.innerHTML = `
    * {
      animation-delay: 0 !important;
      animation-name: none !important;
      opacity: 1 !important;
    }
    `;
    document.getElementsByTagName('head')[0].appendChild(overrideStyle);  
  }
};

document.addEventListener("DOMContentLoaded", run);
