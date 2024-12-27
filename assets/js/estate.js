document.addEventListener('DOMContentLoaded', () => {
  const listingsPerPage = 6; // Number of listings per page
  let currentPage = 1; // Start at page 1
  let listingsData = []; // To hold the fetched listings data
  const listingsGrid = document.getElementById('listings-grid');
  const pageNumbers = document.getElementById('page-numbers');
  const prevButton = document.getElementById('prev-page');
  const nextButton = document.getElementById('next-page');

  // Fetch the listings JSON file
  fetch('products/listings.json')
    .then(response => response.json())
    .then(data => {
      listingsData = data;
      const totalListings = listingsData.length;
      const totalPages = Math.ceil(totalListings / listingsPerPage);

      // Function to render listings on the current page
      const updatePage = (page) => {
        // Clear previous listings
        listingsGrid.innerHTML = '';

        const start = (page - 1) * listingsPerPage;
        const end = start + listingsPerPage;
        const listingsPage = listingsData.slice(start, end);

        // Loop through each listing and create HTML dynamically
        listingsPage.forEach(listing => {
          const listingElement = document.createElement('a');
          listingElement.href = `listing.html?id=${listing.id}`; // Dynamic URL with listing ID
          listingElement.classList.add('listing-preview');

          // Create the image element
          const imageElement = document.createElement('img');
          imageElement.src = listing.images[0]; // First image
          imageElement.alt = 'Property Preview';

          // Create the preview content
          const previewContent = document.createElement('div');
          previewContent.classList.add('preview-content');

          // Price
          const priceElement = document.createElement('h3');
          priceElement.classList.add('preview-price');
          priceElement.textContent = listing.price;

          // Name
          const nameElement = document.createElement('h4');
          nameElement.classList.add('preview-name');
          nameElement.textContent = listing.title;

          // Location
          const locationElement = document.createElement('p');
          locationElement.classList.add('preview-location');
          locationElement.textContent = listing.location;

          // Details (fetching nested properties)
          const detailsElement = document.createElement('p');
          detailsElement.classList.add('preview-details');
          const rooms = listing.details["Oda / Salon Sayısı"] || 'N/A';
          const size = listing.details["Brüt / Net m2"] || 'N/A';
          const floor = listing.details["Kat"] || 'N/A';
          detailsElement.textContent = `${rooms} • ${size} • ${floor}`;

          // Append elements to preview content
          previewContent.appendChild(priceElement);
          previewContent.appendChild(nameElement);
          previewContent.appendChild(locationElement);
          previewContent.appendChild(detailsElement);

          // Append image and content to listing element
          listingElement.appendChild(imageElement);
          listingElement.appendChild(previewContent);

          // Append the listing to the grid
          listingsGrid.appendChild(listingElement);
        });

        // Update pagination controls
        pageNumbers.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
          const pageLink = document.createElement('span');
          pageLink.textContent = i;
          pageLink.classList.add('page-link');
          if (i === page) {
            pageLink.classList.add('active'); // Highlight the active page
          }
          pageLink.addEventListener('click', () => {
            currentPage = i;
            updatePage(i);
          });
          pageNumbers.appendChild(pageLink);
        }

        // Disable/Enable Previous and Next buttons
        prevButton.disabled = page === 1;
        nextButton.disabled = page === totalPages;
      };

      // Initial page load
      updatePage(currentPage);

      // Pagination button event listeners
      prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          updatePage(currentPage);
        }
      });

      nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(listingsData.length / listingsPerPage);
        if (currentPage < totalPages) {
          currentPage++;
          updatePage(currentPage);
        }
      });
    })
    .catch(error => {
      console.error('Error loading listings:', error);
    });
});
