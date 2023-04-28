const shop = document.getElementById('shop')

// let basket = JSON.parse(localStorage.getItem("data")) || [];
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []

// Produktdatat finns i variabeln shopData (se data.js)

const generateShop = () => {
  // Generera alla produkter med dynamisk HTML och Array.protype.map() samt join()
  // Generate all products with dynamic HTML and Array.protype.map() and join()

  //     const productHTML = shopData.map(product => `
  //   <div id="product-id-${product.id}" class="item">
  //     <img width="220" src="${product.image}" alt="">
  //     <div class="details">
  //       <h3>${product.title}</h3>
  //       <p>${product.description}</p>
  //       <div class="price-quantity">
  //         <h2>${product.price}</h2>
  //         <div class="buttons">
  //           <i onclick="decrement(${product.id})" class="bi bi-dash-lg"></i>
  //           <div id="${product.id}" class="quantity"></div>
  //           <i onclick="increment(${product.id})" class="bi bi-plus-lg"></i>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // `).join('');

  //     shop.innerHTML=productHTML;

  //
  // Använd denna markup för varje produktkort - den korresponderar mot CSS:en
  // Use this markup for each product card - it corresponds to the CSS
  //

  //     const categoriesList = document.getElementById('categories');

  // // Create an array of unique categories
  // const categories = ['All categories', ...new Set(shopData.map(product => product.category))];

  // // Generate category buttons
  // const categoryButtonsHTML = categories.map(category => `
  //   <button class="btnCategory" data-category="${category}">${category}</button>
  // `).join('');
  // categoriesList.innerHTML = categoryButtonsHTML;

  // // Add event listener to each category button
  // const categoryButtons = document.querySelectorAll('.btnCategory');
  // categoryButtons.forEach(button => {
  //   button.addEventListener('click', () => {
  //     // Get the category clicked
  //     const category = button.dataset.category;

  //     // Filter products based on category
  //     const filteredShopData = (category === 'All categories')
  //       ? shopData
  //       : shopData.filter(product => product.category === category);

  //     // Generate HTML for filtered products
  //     const productHTML = filteredShopData.map(product => `
  //       <div id="product-id-${product.id}" class="item">
  //         <img width="220" src="${product.image}" alt="">
  //         <div class="details">
  //           <h3>${product.title}</h3>
  //           <p>${product.description}</p>
  //           <div class="price-quantity">
  //             <h2>${product.price}</h2>
  //             <div class="buttons">
  //               <i onclick="decrement(${product.id})" class="bi bi-dash-lg"></i>
  //               <div id="${product.id}" class="quantity"></div>
  //               <i onclick="increment(${product.id})" class="bi bi-plus-lg"></i>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     `).join('');

  //     // Update the shop with filtered products
  //     shop.innerHTML = productHTML;
  //   });
  // });

  const categoriesList = document.getElementById('categories')

  // Create an array of unique categories
  const categories = [
    'All categories',
    ...new Set(shopData.map((product) => product.category)),
  ]

  // Generate category buttons
  const categoryButtonsHTML = categories
    .map(
      (category) => `
  <button class="btnCategory" data-category="${category}">${category}</button>
`
    )
    .join('')
  categoriesList.innerHTML = categoryButtonsHTML

  // Add event listener to each category button
  const categoryButtons = document.querySelectorAll('.btnCategory')
  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Get the category clicked
      const category = button.dataset.category

      // Filter products based on category
      const filteredShopData =
        category === 'All categories'
          ? shopData
          : shopData.filter((product) => product.category === category)

      // Generate HTML for filtered products
      const productHTML = filteredShopData
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
    })
  })
}

generateShop()

// let count = localStorage.getItem('cartItems').length || 0
let count = localStorage.getItem('count') || 0
document.getElementById('cartAmount').innerHTML = count

function addToCart(item) {
  console.log('Count before updating: ', count)
  // Check if item already exists in cart
  let index = cartItems.findIndex((cartItem) => cartItem.id === item.id)

  if (index !== -1) {
    // If item already exists in cart, increase its quantity
    cartItems[index].quantity++
  } else {
    // If item doesn't exist in cart, add it
    cartItems.push({ ...item, quantity: 1 })
    count++
    // Update count in local storage
    console.log('Count After updating: ', count)
    localStorage.setItem('count', count)
    document.getElementById('cartAmount').innerHTML = count
  }
}

const increment = (id) => {
  // Get the HTML element that displays the quantity for this product
  const quantityElement = document.getElementById(id)
  // Increment the quantity by 1
  let quantity = quantityElement.innerText
  quantity++
  quantityElement.innerText = quantity
  let item = shopData.find((i) => {
    return i.id === id
  })
  addToCart(item)

  // cartItems.push(item);

  // store the updated cart items array back to localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

const decrement = (id) => {
  // Get the HTML element that displays the quantity for this product
  const quantityElement = document.getElementById(id)

  // Decrement the quantity by 1, but do not allow it to go below 0
  let quantity = quantityElement.innerText
  if (quantity > 0) {
    quantity--
    quantityElement.innerText = quantity
  }
}
