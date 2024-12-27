document.addEventListener("DOMContentLoaded", function() {
  // Get the product ID from the URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id'); // id=0, id=1, etc.

  if (productId === null) {
    console.error("No product ID provided.");
    return;
  }

  // Fetch product data from JSON file
  fetch("products/listings.json")
    .then(response => response.json())
    .then(data => {
      // Find the product based on the id
      const product = data.find(item => item.id === `${productId}`);

      if (!product) {
        console.error(`Product with ID ${productId} not found.`);
        return;
      }

      const listingContainer = document.getElementById("listing-container");

      // Build the HTML structure for the single product
      const productCard = `
        <div class="listing-card" id="${product.id}">
          <div class="image-grid">
            <img src="${product.images[0]}" alt="Main View" class="main-image">
            <div class="secondary-images">
              <img src="${product.images[1]}" alt="View 2" class="secondary-image">
              <img src="${product.images[2]}" alt="View 3" class="secondary-image">
            </div>
          </div>

          <div class="listing-content">
            <div class="header">
              <h1 class="price">${product.location}</h1>
              <h1 class="price">${product.price}</h1>
              <button class="buy-btn" onclick="showModal()">Satın Al</button>

            </div>
            <div class="details-grid">
              ${(() => {
                const detailsArray = Object.entries(product.details);
                const allDetails = [];

                // Group all details (numeric and text)
                detailsArray.forEach(([key, value]) => {
                  allDetails.push([key, value]);
                });

                // Split into two columns for balanced layout
                const half = Math.ceil(allDetails.length / 2);
                const firstColumn = allDetails.slice(0, half);
                const secondColumn = allDetails.slice(half);

                const renderColumn = (column) => {
                  return column.map(([key, value]) => `
                    <div class="detail-item">
                      <span class="label">${key}</span><span class="value">${value}</span>
                    </div>
                  `).join('');
                };

                return `
                  <div class="details-column">
                    ${renderColumn(firstColumn)}
                  </div>
                  <div class="details-column">
                    ${renderColumn(secondColumn)}
                  </div>
                `;
              })()}
            </div>
            <div class="description">
              <div class="date">
                <p>Posted on: ${product.contactDate}</p>
              </div>
              <h2>${product.title}</h2>
              <p>${product.description}</p>
              <br>
              <h3>Özellikler:</h3>
              <ul>
                ${product.additionalFeatures.map(feature => `<li>${feature}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
      listingContainer.innerHTML = productCard;
    })
    .catch(error => console.error('Error loading product data:', error));
});

// Function to show the modal
function showModal() {
  document.getElementById('contactModal').style.display = "flex";
}

// Function to close the modal
function closeModal() {
  document.getElementById('contactModal').style.display = "none";
}

// Function to reveal the phone number
function revealPhoneNumber() {
  const phoneNumber = "+90 505 103 2012";  // Replace this with the actual phone number
  document.getElementById("phone").textContent = phoneNumber;
  document.getElementById("phone-number").style.display = "block";  // Show the phone number
  document.querySelector(".cta-button").style.display = "none";  // Hide the button after showing the number
}

// Close the modal when clicking outside the modal content
window.onclick = function(event) {
  if (event.target == document.getElementById('contactModal')) {
    closeModal();
  }
}
