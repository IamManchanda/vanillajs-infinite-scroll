const imageContainer = document.getElementById("image-container");
const infiniteScrollLoader = document.getElementById("infinite-scroll-loader");

/**
 * Unsplash API
 * Normally, don't store API Keys like this, but an exception made
 * here because it is free, and the data is publicly available!
 */
const apiKey = "n_c29Qdt2esKnftbojgRwJJmwJtUC8hmJWp7OrvlLyM";

let ready = false;
let imageLoaded = 0;
let totalImages = 0;
let photosArray = [];
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=5`;

function handleImageLoaded() {
  imageLoaded += 1;
  if (imageLoaded === totalImages) {
    ready = true;
    infiniteScrollLoader.hidden = true;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=30`;
  }
}

function displayPhotos() {
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    img.addEventListener("load", handleImageLoaded);

    const para = document.createElement("p");
    para.innerHTML = `Photo by <a href="${photo.user.links.html}" target="_blank">${photo.user.name}</a> on <a href="https://unsplash.com/" target="_blank">Unsplash</a>`;

    const hr = document.createElement("hr");

    item.appendChild(img);
    imageContainer.appendChild(item);
    imageContainer.appendChild(para);
    imageContainer.appendChild(hr);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    imageLoaded = 0;
    totalImages = photosArray.length;
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
