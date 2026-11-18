// スクロールで順にふわっと表示
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!reducedMotion) {
  const targets = document.querySelectorAll(
    [
      "main > section:not(#home) > p",
      "main > section:not(#home) > h2",
      "section#about > div > div",
      "section#works h3",
      "section#works > div > p",
      "section#works article",
      "section#contact > div",
    ].join(", "),
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.dataset.reveal = "shown";
          }, i * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  targets.forEach((el) => {
    el.dataset.reveal = "hidden";
    observer.observe(el);
  });
}

// 作品の拡大表示
const box = document.querySelector("dialog");
const boxImg = box.querySelector("img");

document.querySelectorAll("section#works article > button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    boxImg.src = img.src;
    boxImg.alt = img.alt;
    box.showModal();
  });
});

box.querySelector("button").addEventListener("click", () => box.close());
box.addEventListener("click", (e) => {
  if (e.target === box) box.close();
});
