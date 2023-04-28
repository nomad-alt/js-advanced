window.onload = function () {
  const shop = document.getElementById('shop')
  const productHTML = shopData
    .map(
      (product) => `
      <div id="product-id-${product.id}" class="item">
        <img width="220" src="${product.image}" alt="">
        <div class="details">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <div class="price-quantity">
            <h2>${product.price}</h2>
            <div class="buttons">
              <i onclick="decrement(${product.id})" class="bi bi-dash-lg"></i>
              <div id="${product.id}" class="quantity"></div>
              <i onclick="increment(${product.id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join('')

  // Update the shop with filtered products
  shop.innerHTML = productHTML
}
