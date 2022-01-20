const screenshots = document.querySelectorAll(".screenshot");
screenshots.forEach((scr) => scr.addEventListener("click", handleGallery));
const scrollerButtons = [...document.getElementById("scroller").children];
const scrollerIcons = [...document.querySelectorAll(".scroll-icon")];

scrollerButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    clearScroller();
    const firstChild = btn.children[0];
    const secondChild = firstChild.children[0];
    secondChild.classList.add("active");
  });
});

function clearScroller() {
  scrollerIcons.forEach((scr) => {
    scr.classList.remove("active");
  });
}

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

const sections = [...document.querySelectorAll(".page-wrapper")];

const appearOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }


      if (entry.target.id === "main") {
        clearScroller();
        const scroller = document.getElementById("main-scroller");
        scroller.classList.add("active");
      }

      if (entry.target.id === "crypto-stars") {
        clearScroller();
        const scroller = document.getElementById("crypto-stars-scroller");
        scroller.classList.add("active");
      }

      if (entry.target.id === "car-racer") {
        clearScroller();
        const scroller = document.getElementById("car-racer-scroller");
        scroller.classList.add("active");
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((section) => {
  appearOnScroll.observe(section);
});
