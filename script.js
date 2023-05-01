const imageConainter = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;

// unsplash API
let count = 10;
const apiKey = `JKWulPzWrKECZYgF-uEG0dCBek5fxsxglkgggw6gqQ8`;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imageLoaded = function () {
  totalImages = photosArray.length;
  imagesLoaded++;
  console.log(imagesLoaded);
  if (totalImages === imagesLoaded) {
    ready = true;
    console.log("ready", ready);
    imagesLoaded = 0;
    count = 5;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
  loader.hidden = true;
};

// Creating <img> inside <a> links.
const dipslayPhotos = function () {
  photosArray.forEach((photo) => {
    // Creating links to put images inside it.
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    // Creating images to display in DOM;
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

    img.addEventListener("load", imageLoaded);

    item.appendChild(img);
    imageConainter.appendChild(item);
  });
};

// Function for Error handling

// const catchError = function (error) {
//   const errorText = document.createElement("h2");
//   errorText.style.textAlign = "center";
//   errorText.textContent = error;

//   imageConainter.insertAdjacentElement("beforebegin", errorText);
// };

// fetching unsplash API

const getPhotos = async function () {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    dipslayPhotos();
  } catch (error) {
    alert("Something went wrong, Try again later");
  }
};
// On load
getPhotos();

// load more photos if Scroll approaches at the end of the page

window.addEventListener("scroll", function () {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
