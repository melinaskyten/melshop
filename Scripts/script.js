document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-container");

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((products) => {
      productContainer.innerHTML = "";

      products.forEach((product) => {
        const productCol = document.createElement("div");
        productCol.classList.add("col", "mb-5");

        productCol.innerHTML = `
          <div class="card h-100 product-card">
            <div class="card-img-container d-flex justify-content-center align-items-center py-4" style="height: 200px;">
              <a href="item_page.html?id=${
                product.id
              }" class="d-flex justify-content-center align-items-center">
                <img class="card-img-top img-fluid mx-auto" src="${
                  product.image
                }" alt="${
          product.title
        }" style="max-height: 160px; object-fit: contain;" />
              </a>
            </div>
            <div class="card-body p-4">
              <div class="text-center">
                <a href="item_page.html?id=${
                  product.id
                }" class="text-decoration-none text-dark">
                  <h5 class="fw-bolder">${product.title}</h5>
                </a>
                <p>$${product.price.toFixed(2)}</p>
              </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent mt-auto">
              <div class="text-center">
                <button class="btn btn-outline-dark buy-button" data-id="${
                  product.id
                }" data-title="${product.title}" data-price="${
          product.price
        }" data-image="${product.image}">Add to cart</button>
              </div>
            </div>
          </div>
        `;

        productContainer.appendChild(productCol);
      });

      // Lägg till event listeners för "Add to cart"
      document.querySelectorAll(".buy-button").forEach((button) => {
        button.addEventListener("click", (event) => {
          const product = {
            id: event.target.dataset.id,
            title: event.target.dataset.title,
            price: parseFloat(event.target.dataset.price),
            image: event.target.dataset.image,
            quantity: 1,
          };
          addToCart(product);
        });
      });
      updateCartBadge();
    })
    .catch((error) => console.error("Error fetching products:", error));
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("tbody")) {
    displayCart();
  }
  updateCartBadge();
});

function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartTable = document.querySelector("tbody");
  let totalPrice = 0;
  cartTable.innerHTML = "";

  cart.forEach((product, index) => {
    let productTotal = product.price * product.quantity;
    totalPrice += productTotal;

    cartTable.innerHTML += `
  <tr>
    <td>
      <img src="${
        product.image
      }" class="img-thumbnail" style="width: 50px; height: 50px;">
      ${product.title}
    </td>
    <td>$${product.price.toFixed(2)}</td>
    <td>
      <button class="btn btn-sm btn-outline-secondary decrease" data-id="${
        product.id
      }">-</button>
      <span class="mx-2">${product.quantity}</span>
      <button class="btn btn-sm btn-outline-secondary increase" data-id="${
        product.id
      }">+</button>
    </td>
    <td>$${productTotal.toFixed(2)}</td>
    <td>
    <button class="btn btn-sm btn-outline-secondary remove-btn" data-id="${
      product.id
    }"><i class="bi bi-trash"></i></button>
    </td>
  </tr>
`;
  });

  document.querySelector(".d-flex.justify-content-between").innerHTML = `
 <div class="w-100">
    <div class="d-flex justify-content-between mb-2">
      <h5 class="fw-bold">Total:</h5>
      <h5 class="fw-bold">$${totalPrice.toFixed(2)}</h5>
    </div>
    <button id="clear-cart" class="btn btn-outline-secondary w-100">Clear Cart</button>
  </div>  `;

  document.getElementById("clear-cart").addEventListener("click", clearCart);

  document.querySelector("tbody").removeEventListener("click", handleCartClick);
  document.querySelector("tbody").addEventListener("click", handleCartClick);
}

function handleCartClick(event) {
  if (event.target.classList.contains("increase")) {
    updateQuantity(event.target.dataset.id, 1);
  } else if (event.target.classList.contains("decrease")) {
    updateQuantity(event.target.dataset.id, -1);
  } else if (event.target.closest(".remove-btn")) {
    const productId = event.target.closest(".remove-btn").dataset.id;
    removeFromCart(productId);
  }
}

function updateQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let productIndex = cart.findIndex((item) => item.id === productId);
  if (productIndex !== -1) {
    if (change > 0) {
      cart[productIndex].quantity += 1;
    } else if (change < 0) {
      if (cart[productIndex].quantity > 1) {
        cart[productIndex].quantity -= 1;
      } else {
        cart.splice(productIndex, 1);
      }
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartBadge();
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  productId = Number(productId);

  cart = cart.filter((item) => Number(item.id) !== productId);

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartBadge();
}

function clearCart() {
  localStorage.removeItem("cart");
  displayCart();
  updateCartBadge();
}

function updateCartBadge() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector(".badge").textContent = totalItems;
}
