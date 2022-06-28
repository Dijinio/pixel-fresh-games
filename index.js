const screenshots = document.querySelectorAll(".screenshot");
screenshots.forEach((scr) => scr.addEventListener("click", handleGallery));

const scrollerButtons = [...document.getElementById("scroller").children];
const scrollerIcons = [...document.querySelectorAll(".scroll-icon")];
const icons = [...document.querySelector(".main-icons").children];
const sections = [...document.querySelectorAll(".page-wrapper")];
const wrapper = document.getElementById("wrapper");
const sectionSize = sections.length;
const locationSection = window.location.hash;

let sectionIndex = getInitialSection(locationSection);
const initialSection = sections[sectionIndex];

setTimeout(() => {
  wrapper.style.transform = `translateY(-${sectionIndex * 100}vh)`;
  activateIcon(initialSection);
}, 100);

function getInitialSection(section) {
  switch (section) {
    case "#main":
      return 0;
    case "#crypto-stars":
      return 1;
    case "#car-racer":
      return 2;
    case "#doodle-racer":
      return 3;
    case "#morrok":
      return 4;
    case "#doodle-climb":
      return 5;
    default:
      return 0;
  }
}

function addHashToUrl(index) {
  if (index === 0) {
    window.location.hash = "main";
  }
  if (index === 1) {
    window.location.hash = "crypto-stars";
  }
  if (index === 2) {
    window.location.hash = "car-racer";
  }
  if (index === 3) {
    window.location.hash = "doodle-racer";
  }
  if (index === 4) {
    window.location.hash = "morrok";
  }
  if (index === 5) {
    window.location.hash = "doodle-climb";
  }
}

icons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.preventDefault();
    const section = getSection(icon);
    if (!section) return;
    wrapper.style.transform = `translateY(-${sectionIndex * 100}vh)`;
    activateIcon(section);
    addHashToUrl(sectionIndex);
  });
});

scrollerButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const section = getSection(btn);
    wrapper.style.transform = `translateY(-${sectionIndex * 100}vh)`;
    activateIcon(section);
    addHashToUrl(sectionIndex);
  });
});

function getSection(element) {
  const href = element.attributes.href.nodeValue;
  // set global section index
  const sIndex = sections.findIndex(
    (s) => s.dataset.anchor === href.replace("#", "")
  );
  if (sIndex > -1) {
    sectionIndex = sIndex;
  }
  return sections.find((s) => s.dataset.anchor === href.replace("#", ""));
}

function activateIcon(section) {
  const iconId = `${section.dataset.anchor}-scroller`;
  const icon = document.getElementById(iconId);
  clearScroller();
  icon.classList.add("active");
}

let pause = false;

document.addEventListener("wheel", (e) => {
  if (pause) return;
  if (e.deltaY < 0) {
    handlePageChange(false);
  } else {
    handlePageChange(true);
  }
});

document.addEventListener("touchstart", (e) => {
  const startPos = e.touches[0].clientY;
  const startTime = new Date();

  document.addEventListener("touchend", (e) => {
    if (pause) return;

    const endPos = e.changedTouches[0].clientY;
    const timeElapsed = new Date() - startTime;

    if (startPos + 100 < endPos && timeElapsed < 1000) {
      handlePageChange(false);
    }
    if (startPos - 100 > endPos && timeElapsed < 1000) {
      handlePageChange(true);
    }
  });
});

function handlePageChange(next) {
  pause = true;

  const id = manageSection(sectionSize, next);
  const scrollAmount = id * 100;
  wrapper.style.transform = `translateY(-${scrollAmount}vh)`;

  const section = sections[id];
  activateIcon(section);

  addHashToUrl(sectionIndex);
  setTimeout(() => {
    pause = false;
  }, 700);
}

function manageSection(size, up) {
  if (up) {
    if (sectionIndex >= size - 1) return sectionIndex;
    return (sectionIndex += 1);
  } else {
    if (sectionIndex <= 0) return sectionIndex;
    return (sectionIndex -= 1);
  }
}

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
