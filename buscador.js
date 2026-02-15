const allProducts = [
  ...menProducts.map(p => ({ ...p, category: "Hombre" })),
  ...womenProducts.map(p => ({ ...p, category: "Dama" }))
];
const searchForm = document.querySelector("form[role='search']");
const searchInput = searchForm.querySelector("input");

// Suponiendo que ya tienes:
const sliders = document.querySelectorAll(".products-slider"); // 0 = hombres, 1 = mujeres

searchForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const query = searchInput.value.toLowerCase();

  const filtered = allProducts.filter(product => 
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    product.talla.toLowerCase().includes(query)
  );

  // Limpiar ambos sliders antes de mostrar resultados
  sliders.forEach(slider => slider.innerHTML = "");

  // Recorrer los productos filtrados
  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-item";

    const message = encodeURIComponent(
      `🔥 *Hola!* 👋%0A` +
      `Me interesa el tenis *${product.name}* 🏃‍♂️%0A` +
      `💰 Precio: *$${product.price.toLocaleString()}*%0A` +
      `👟 Talla: *${product.talla}*%0A` +
      `🖼 Imagen: ${product.image}%0A` +
      `¿Está disponible? 🙏%0A` +
      `¡Gracias! 😊`
    );
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-item-content">
        <h5>${product.name}</h5>
        <p>${product.talla} - ${product.category}</p>
        <span>$${product.price.toLocaleString()}</span>
        <a href="${whatsappLink}" target="_blank" class="btn btn-success">
          Comprar
        </a>
      </div>
    `;

    // Aquí asignamos el slider correcto según la categoría
    if(product.category === "Caballero") {
      sliders[0].appendChild(card);
    } else if(product.category === "Dama") {
      sliders[1].appendChild(card);
    }
  });

  // Opcional: mostrar mensaje si no hay resultados
  if(sliders[0].innerHTML === "" && sliders[1].innerHTML === "") {
    sliders[0].innerHTML = "<p>No se encontraron productos.</p>";
  }
});

