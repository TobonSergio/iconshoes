const WHATSAPP_NUMBER = "573103071732";

document.querySelectorAll(".products-slider").forEach((slider, index) => {

// Determinar productos según sección
  const sectionProducts = index === 0 ? menProducts : womenProducts;

  // 🔹 Crear cards
  sectionProducts.forEach(product => {

    const card = document.createElement("div");
    card.className = "product-item";

    const message = encodeURIComponent(
      `🔥 *Hola!* 👋` +
      `Me interesa el tenis *${product.name}* 🏃‍♂️` +
      `💰 Precio: *$${product.price.toLocaleString()}*` +
      `👟 Talla: *${product.talla}*` +
      `¿Está disponible? 🙏` +
      `¡Gracias! 😊`
    );
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-item-content">
        <h5>${product.name}</h5>
        <p>${product.talla}</p>
        <span>$${product.price.toLocaleString()}</span>
        <a href="${whatsappLink}" target="_blank" class="btn btn-success">
          Comprar
        </a>
      </div>
    `;

    slider.appendChild(card);
  });

  // 🔹 Controles (busca botones dentro del mismo bloque)
  const container = slider.closest(".carousel-section");
  const nextBtn = container.querySelector(".nextBtn");
  const prevBtn = container.querySelector(".prevBtn");

  let SCROLL_AMOUNT = window.innerWidth < 768 ? 280 : 380;

  window.addEventListener("resize", () => {
    SCROLL_AMOUNT = window.innerWidth < 768 ? 280 : 380;
  });

  function scrollNext() {
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
    }
  }

  function scrollPrev() {
    slider.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  }

  nextBtn?.addEventListener("click", scrollNext);
  prevBtn?.addEventListener("click", scrollPrev);

  let autoScroll = setInterval(scrollNext, 4000);

  slider.addEventListener("mouseenter", () => {
    clearInterval(autoScroll);
  });

  slider.addEventListener("mouseleave", () => {
    autoScroll = setInterval(scrollNext, 4000);
  });

});
