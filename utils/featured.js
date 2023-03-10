const display = (products, element) => {
  element.innerHTML = products
    .map((item) => {
      const { id, name, image, price, desc } = item;
      return `
        <div class="food-card">
        <div class="card-content">
          <img src=${image} alt=${name} />
          <p class="mini-description">
          ${desc}
          </p>
          <h3 class="price">${price}</h3>
          <button class="add-order">order</button>
        </div>
      </div>
        `;
    })
    .join("");
};