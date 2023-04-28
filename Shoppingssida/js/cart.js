let cnt = localStorage.getItem('count') || 0

document.getElementById('cartAmount').innerHTML = cnt

let shoppingCart = document.getElementById('shopping-cart')

let cartItems1 = JSON.parse(localStorage.getItem('cartItems')) || []
let countOfItems = localStorage.getItem('count') || 0
const totalDiv = document.getElementsByClassName('label')
let grandTotal = 0

for (let i = 0; i < countOfItems; i++) {
  grandTotal += cartItems1[i].price * cartItems1[i].quantity
}

totalDiv[0].innerHTML = `<h1>Total Bill : $${grandTotal} </h>`

const generateCartItems = () => {
  // Generate all cart items with dynamic HTML and Array.prototype.map() and join()
  console.log(cartItems1)
  const cartItemsHtml = cartItems1
    .map(
      (cartItem) => `
      <div class="cart-item">
        <img width="100" src="${cartItem.image}" alt="" />
        <div class="details">
          <div class="title-price-x">
            <h4 class="title-price">
              <p>${cartItem.title}</p>
              <p class="cart-item-price">${cartItem.price} kr</p>
            </h4>
            <i onclick="removeItem(${cartItem.id})" class="bi bi-x-lg"></i>
          </div>
          <div class="cart-buttons">
            <div class="buttons">
              <i onclick="decrement(${cartItem.id})" class="bi bi-dash-lg"></i>
              <div id="${cartItem.id}" class="quantity">${
        cartItem.quantity
      }</div>
              <i onclick="increment(${cartItem.id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
          <h3 id="total${cartItem.id}">${
        cartItem.quantity * cartItem.price
      } kr</h3>
        </div>
      </div>
    `
    )
    .join('')

  // Get the HTML element with the ID "cart-items"

  // Set the inner HTML of the cart items element to the generated HTML
  shoppingCart.innerHTML = cartItemsHtml
}

generateCartItems()

let count = localStorage.getItem('count') || 0

function removeItem(id) {
  // Retrieve the shopping cart data from LocalStorage
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []

  // Find the index of the item to remove in the cartItems array
  let indexToRemove = cartItems.findIndex((item) => item.id === id)

  // If the item is found, remove it from the cartItems array
  if (indexToRemove !== -1) {
    cartItems.splice(indexToRemove, 1)
    count--
    // Update count in local storage
    localStorage.setItem('count', count)
    document.getElementById('cartAmount').innerHTML = count
  }

  // Save the updated cartItems array back to LocalStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems))

  location.reload()
}

function addToCart1(item) {
  console.log('Count before updating: ', count)
  // Check if item already exists in cart
  let index = cartItems1.findIndex((cartItem) => cartItem.id === item.id)

  if (index !== -1) {
    // If item already exists in cart, increase its quantity
    cartItems1[index].quantity++
  } else {
    // If item doesn't exist in cart, add it
    cartItems1.push({ ...item, quantity: 1 })
    count++
    // Update count in local storage
    console.log('Count After updating: ', count)
    localStorage.setItem('count', count)
    document.getElementById('cartAmount').innerHTML = count
  }
}

const increment = (id) => {
  console.log('Calling increment from cart')
  let item = shopData.find((i) => {
    return i.id === id
  })
  // Get the HTML element that displays the quantity for this product
  const quantityElement = document.getElementById(id)
  // Increment the quantity by 1
  let quantity = quantityElement.innerText
  quantity++
  quantityElement.innerText = quantity
  let index = cartItems1.findIndex((cartItem) => cartItem.id === item.id)
  cartItems1[index].quantity++
  localStorage.setItem('cartItems', JSON.stringify(cartItems1))
  document.getElementById(`total${id}`).innerHTML =
    cartItems1[index].quantity * cartItems1[index].price

  grandTotal = 0
  for (let i = 0; i < countOfItems; i++) {
    grandTotal += cartItems1[i].price * cartItems1[i].quantity
  }

  totalDiv[0].innerHTML = `<h1>Total Bill : $${grandTotal} </h>`
}

const decrement = (id) => {
  let item = shopData.find((i) => {
    return i.id === id
  })
  // Get the HTML element that displays the quantity for this product
  const quantityElement = document.getElementById(id)

  // Decrement the quantity by 1, but do not allow it to go below 0
  let quantity = quantityElement.innerText
  let index = cartItems1.findIndex((cartItem) => cartItem.id === item.id)
  if (quantity > 0) {
    quantity--
    quantityElement.innerText = quantity
    cartItems1[index].quantity--
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems1))
  document.getElementById(`total${id}`).innerHTML =
    cartItems1[index].quantity * cartItems1[index].price

  grandTotal = 0
  for (let i = 0; i < countOfItems; i++) {
    grandTotal += cartItems1[i].price * cartItems1[i].quantity
  }

  totalDiv[0].innerHTML = `<h1>Total Bill : $${grandTotal} </h>`
}

document.getElementById('clear-btn').addEventListener('click', () => {
  localStorage.clear()
  document.getElementById('shopping-cart').innerHTML = ''
  totalDiv[0].innerHTML = ''
  location.reload()
})
