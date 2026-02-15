document.querySelectorAll(".bg-track").forEach(track => {
  const span = track.children[0];

  // Duplicamos el texto hasta cubrir 2 pantallas
  while (track.scrollWidth < window.innerWidth * 2) {
    track.appendChild(span.cloneNode(true));
  }

  const distance = span.offsetWidth;

  track.animate(
    [
      { transform: "translateX(0)" },
      { transform: `translateX(-${distance}px)` }
    ],
    {
      duration: 20000,
      iterations: Infinity,
      easing: "linear"
    }
  );
});
