const gallery = document.getElementById("gallery");
if (gallery) {
  const items = [...gallery.querySelectorAll(".gallery-item")];
  const ratios = items.map(item => {
    const img = item.querySelector("img");
    return Number(img.width ? img.getAttribute("width") : 1) / Number(img.getAttribute("height") || 1);
  });
  function layout() {
    const width = gallery.clientWidth;
    if (!width || !items.length) return;
    const gap = parseFloat(getComputedStyle(gallery).getPropertyValue("--gallery-gap")) || 20;
    const columns = width < 600 ? 2 : width < 1000 ? 3 : 4;
    const columnWidth = (width - gap * (columns - 1)) / columns;
    const heights = Array(columns).fill(0);
    ratios.forEach((ratio, i) => {
      const span = columns >= 3 && i % 7 === 0 && ratio > 1 ? 2 : 1;
      let column = 0, top = Infinity;
      for (let c = 0; c <= columns - span; c++) {
        const candidate = Math.max(...heights.slice(c, c + span));
        if (candidate < top) { top = candidate; column = c; }
      }
      const w = columnWidth * span + gap * (span - 1), h = w / ratio;
      Object.assign(items[i].style, {position:"absolute", left:(column * (columnWidth + gap))+"px", top:top+"px", width:w+"px", height:h+"px"});
      items[i].querySelector("img").sizes = Math.ceil(w)+"px";
      for (let c = column; c < column + span; c++) heights[c] = top + h + gap;
    });
    gallery.style.height = Math.max(0, ...heights) - gap+"px";
    gallery.classList.add("is-masonry");
  }
  new ResizeObserver(layout).observe(gallery);
  layout();
}
