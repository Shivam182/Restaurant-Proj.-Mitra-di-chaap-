const display = (products, element, filters) => {
    element.innerHTML = products
      .map((item) => {
        const { id, name, image, price, desc } = item;
        return `
         
          `;
      })
      .join("");
  };