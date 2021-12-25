const screenshots = document.querySelectorAll(".screenshot");
screenshots.forEach((scr) => scr.addEventListener("click", handleGallery));

function handleGallery(e) {
  const iconSrc = e.target.src;
  const imgSrc = iconSrc.replace("_icon.png", ".jpg");
  const gallery = document.getElementById("gallery");

  gallery.classList.add("show");

  const domImage = document.getElementById("galleryImage");
  domImage.src = imgSrc;

  domImage.style.opacity = 1;
  gallery.addEventListener("click", () => {
    gallery.classList.remove("show");
    domImage.src = "";
    domImage.style.opacity = 0;
  });
}
