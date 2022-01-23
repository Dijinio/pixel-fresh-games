const screenshots = document.querySelectorAll(".screenshot");
screenshots.forEach((scr) => scr.addEventListener("click", handleGallery));

const scrollerButtons = [...document.getElementById("scroller").children];
const scrollerIcons = [...document.querySelectorAll(".scroll-icon")];
const icons = [...document.querySelector(".main-icons").children];
const sections = [...document.querySelectorAll(".page-wrapper")];
let sectionIndex = 0;
const sectionSize = sections.length;

icons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const section = getSection(icon);
    if (!section) return;
    activateIcon(section);
  });
});

scrollerButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const section = getSection(btn);
    activateIcon(section);
  });
});

function getSection(element) {
  const href = element.attributes.href.nodeValue;
  // set global section index
  sectionIndex = sections.findIndex((s) => s.id === href.replace("#", ""));

  return sections.find((s) => s.id === href.replace("#", ""));
}

function activateIcon(section) {
  const iconId = `${section.id}-scroller`;
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
      setTimeout(() => {
        handlePageChange(false);
      }, 50);
    }
    if (startPos - 100 > endPos && timeElapsed < 1000) {
      setTimeout(() => {
        handlePageChange(true);
      }, 50);
    }
  });
});

function handlePageChange(next) {
  pause = true;
  const scrollOptions = {
    block: "start",
    inline: "nearest",
    easing: "linear",
  };
  const id = manageSection(sectionSize, next);
  const section = sections[id];
  activateIcon(section);
  section.scrollIntoView(scrollOptions);
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
