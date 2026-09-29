// Multi-image comparison: 2 to 4 <img>s in a .compare container, split at the pointer. Alt text is each region's label.
document.querySelectorAll(".compare").forEach((box) => {
  const images = [...box.querySelectorAll("img")];
  const count = images.length;
  const make = (className, parent = box) => {
    const el = document.createElement("div");
    el.className = className;
    parent.append(el);
    return el;
  };
  const regions = images.map((image) => {
    const region = make("compare-region");
    make("compare-label", region).textContent = image.alt;
    return region;
  });
  const verticalLine = make("compare-line compare-line-vertical");
  const horizontalLine = count > 2 ? make("compare-line compare-line-horizontal") : null;
  box.classList.add(`compare-${count}`);

  // Each region is [left, top, right, bottom] in fractions of the box; two images only split at x.
  const split = (x, y) => {
    const h = count === 2 ? 1 : y;
    const topLeft = [0, 0, x, h];
    const topRight = [x, 0, 1, h];
    const rects = [topLeft, topRight, count === 3 ? [0, h, 1, 1] : [0, h, x, 1], [x, h, 1, 1]];
    rects.slice(0, count).forEach(([left, top, right, bottom], i) => {
      images[i].style.clipPath = `inset(${top * 100}% ${(1 - right) * 100}% ${(1 - bottom) * 100}% ${left * 100}%)`;
      Object.assign(regions[i].style, {
        left: `${left * 100}%`,
        top: `${top * 100}%`,
        width: `${(right - left) * 100}%`,
        height: `${(bottom - top) * 100}%`,
      });
    });
    verticalLine.style.left = `${x * 100}%`;
    verticalLine.style.height = `${h * 100}%`;
    if (horizontalLine) horizontalLine.style.top = `${y * 100}%`;
  };

  const follow = (event) => {
    const rect = box.getBoundingClientRect();
    const fraction = (offset, size) => Math.min(1, Math.max(0, offset / size));
    split(fraction(event.clientX - rect.left, rect.width), fraction(event.clientY - rect.top, rect.height));
  };
  box.addEventListener("pointermove", follow);
  box.addEventListener("pointerdown", follow);
  split(0.5, 0.5);
});
