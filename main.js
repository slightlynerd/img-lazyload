// update connectivity status
const updateConnectivityStatus = (status) => {
  if (status === 'online') {
    const onlineMsg = document.querySelector('.online-msg');
    onlineMsg.style.display = 'block';
    onlineMsg.style.height = '30px';
    setTimeout(() => {
      const onlineMsg = document.querySelector('.online-msg');
      onlineMsg.style.display = 'none';
      onlineMsg.style.height = '0';
    }, 3000);
    const offlineMsg = document.querySelector('.offline-msg');
    offlineMsg.style.display = 'none';
    offlineMsg.style.height = '0';
  }
  else {
    const offlineMsg = document.querySelector('.offline-msg');
    offlineMsg.style.display = 'block';
    offlineMsg.style.height = '30px';
    const onlineMsg = document.querySelector('.online-msg');
    onlineMsg.style.display = 'none';
    onlineMsg.style.height = '0';
  }
};

// detect browser connectivity
const checkConnectivity = (img, src) => {
  // try to load the image again if the user is online
  window.addEventListener('online', () => {
    updateConnectivityStatus('online');
    img.style.opacity = 0;
    img.src = src;
  });
  window.addEventListener('offline', () => {
    // notify user the user that they are currently offline
    updateConnectivityStatus('offline');
  });
};
// load image
const loadImage = (img, observer = null) => {
  img.style.opacity = 0;
  // load the image and set opacity to 1 when image has loaded
  img.src = img.dataset.src;
  img.onload = () => {
    img.style.opacity = 1;
    if (observer) {
      observer.unobserve(img);
    }
  };
  // check if an error occured while loading the image
  img.onerror = (error) => {
    img.style.opacity = 1;
    checkConnectivity(img, img.dataset.src);
  };
};

// checks to see if image is intersecting the viewport
const isImageIntersecting = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      loadImage(img, observer);
    }
  });
};

// observe each image for intersection
const observeImage = (image) => {
  const observer = new IntersectionObserver(isImageIntersecting);
  observer.observe(image);
};

const startApp = () => {
  const images = document.querySelectorAll('[data-src]');
  if ('loading' in HTMLImageElement.prototype) {
    // use native lazy loading by the browser
    images.forEach(img => {
      img.loading = 'lazy';
      loadImage(img);
    })
    return;
  }
  else {
    // use intersection observer polyfill
    let script = document.createElement('script');
    script.async = true;
    script.src = 'intersection-observer.js';
    document.body.appendChild(script);
    script.onload = () => {
      images.forEach(observeImage);
    };
  }
};

const app = {
  start: startApp(),
};

app.start;