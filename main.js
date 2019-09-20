// detect browser connectivity
const checkConnectivity = (img, src) => {
  // try to load the image again if the user is online
  window.addEventListener('online', () => {
    img.style.opacity = 0;
    img.src = src;
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
  });
  window.addEventListener('offline', () => {
    // notify user the user that they are currently offline
    const offlineMsg = document.querySelector('.offline-msg');
    offlineMsg.style.display = 'block';
    offlineMsg.style.height = '30px';
    const onlineMsg = document.querySelector('.online-msg');
    onlineMsg.style.display = 'none';
    onlineMsg.style.height = '0';
  });
};

// checks to see if image is intersecting the viewport
const isImageIntersecting = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      const imgSrc = img.getAttribute('data-src');
      img.style.opacity = 0;
      img.src = imgSrc;
      img.onload = () => {
        img.style.opacity = 1;
        observer.disconnect();
      };
      // check if an error occured while loading the image
      img.onerror = (error) => {
        img.style.opacity = 1;
        console.log(error)
        checkConnectivity(img, imgSrc);
      };
    }
  });
};

// observe each image for intersection
const observeImage = (image) => {
  const observer = new IntersectionObserver(isImageIntersecting);
  observer.observe(image);
};

const images = document.querySelectorAll('[data-src]');
images.forEach(observeImage);