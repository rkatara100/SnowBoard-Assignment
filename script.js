document.addEventListener('DOMContentLoaded', function () {
      let products = [];

      document.getElementById('fetchButton').addEventListener('click', function () {
            document.getElementById('loader').style.display = 'inline-block';
            document.getElementById('fetchButton').style.display = 'none';

            if (products.length === 0) {
                  fetch('https://interveiw-mock-api.vercel.app/api/getProducts')
                        .then(response => response.json())
                        .then(jsondata => {
                              document.getElementById('loader').style.display = 'none';
                              const productContainer = document.getElementById('product-container');
                              productContainer.innerHTML = '';

                              products = jsondata.data;

                              renderProducts(products);

                              const sortSelect = document.getElementById('sortSelect');
                              if (sortSelect) {
                                    sortSelect.addEventListener('change', function () {
                                          const sortValue = this.value;

                                          let sortedProducts = [...products];

                                          if (sortValue === 'name') {
                                                sortedProducts.sort((a, b) => a.product.title.localeCompare(b.product.title));
                                          } else if (sortValue === 'price-low-high') {
                                                sortedProducts.sort((a, b) => a.product.variants[0].price - b.product.variants[0].price);
                                          } else if (sortValue === 'price-high-low') {
                                                sortedProducts.sort((a, b) => b.product.variants[0].price - a.product.variants[0].price);
                                          }

                                          productContainer.innerHTML = '';
                                          renderProducts(sortedProducts);

                                    });
                              }
                        })
                        .catch(error => {
                              console.error("Error fetching products:", error);
                              const productContainer = document.getElementById('product-container');
                              productContainer.innerHTML = "<p>Failed to load products. Please try again later.</p>";
                              document.getElementById('loader').style.display = 'none';
                        });
            }
      });

      function renderProducts(productsToRender) {
            const productContainer = document.getElementById('product-container');
            productsToRender.forEach(product => {
                  const productImageSrc = product.product.images[0].src;
                  const productName = product.product.title;
                  const productPrice = product.product.variants[0].price;

                  const formattedPrice = 'Rs. ' + new Intl.NumberFormat('en-IN').format(productPrice);

                  const productCard = document.createElement('div');
                  productCard.classList.add('product-card');

                  productCard.innerHTML = `
                  <img class="product-img" src="${productImageSrc}" alt="${productName}">
                  <h3 class="product-name">${productName}</h3>
                  <div class="price-cart-container">
                      <p class="product-price">${formattedPrice}</p>
                      <button class="add-to-cart">
                          <i class="fa fa-shopping-cart"></i> ADD TO CART
                      </button>
                  </div>
              `;

                  productContainer.appendChild(productCard);
            });
      }
});
