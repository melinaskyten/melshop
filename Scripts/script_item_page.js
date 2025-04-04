document.addEventListener("DOMContentLoaded", () => {
  const productDetails = document.getElementById("product-details");

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((product) => {
        productDetails.innerHTML = `
                    <div class="col-md-6">
                        <img class="card-img-top mb-5 mb-md-0" src="${
                          product.image
                        }" alt="${product.title}"
                        style = "border: 2px solid #174e23; 
                        border-radius: 12px; 
                        box-shadow: 4px 4px 0px #174e23;
                        transition: transform 0.2s ease-in-out;"/>
                    </div>
                    <div class="col-md-6">
                        <h1 class="display-5 fw-bolder">${product.title}</h1>
                        <div class="fs-5 mb-5">
                            <span>$${product.price.toFixed(2)}</span>
                        </div>
                        <p class="lead">${product.description}</p>
                    </div>
                `;
      })

      .catch((error) =>
        console.error("Fel vid hämtning av produktdetaljer:", error)
      );
  } else {
    productDetails.innerHTML = "<p>No product ID found in the URL.</p>";
  }
});
