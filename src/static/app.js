window.addEventListener("DOMContentLoaded", setup);

async function setup() {
	// START HERE
	// API Endpoint: GET /products
	// Returns: Array of product objects with id, title, price (in cents), and array of images
	// TODO: Fetch products from the API
	// TODO: Render the products to the page in a responsive grid
	// TODO: Sort the products by price (low to high by default)
	// TODO: Implement search functionality
	// BONUS: Use the refactored sorting function for dynamic sort order
	// BONUS: Add error handling for the fetch request
}
/**
 * Sorts an array of products by price in ascending or descending order.
 *
 * Your task is to refactor and improve this function:
 * - Make it clean, modern, and readable.
 * - Allow sorting in either "asc" or "desc" order using the `sortOrder` parameter.
 * - Ensure the output remains the same.
 * - A plus, but you do not need to use the messyFunction() function.
 *
 * Requirements:
 * - Refactor the code to use modern JavaScript syntax and best practices.
 * - Rename variables and functions to be more descriptive.
 * - Fill in the missing parts of the JSDoc comments.
 *
 * Feel free to leave comments explaining your thought process.
 *
 * @param {Array} products - Array of product objects, each with a `price` property.
 * @param {string} sortOrder - Either "asc" for ascending or "desc" for descending sort order.
 * @returns {Array} - A new array of products sorted by price in the specified order.
 */
// function messyFunction(data1, data2) {
// 	let t = [];
// 	for (let i = 0; i < data1.length; i++) {
// 		t.push(data1[i]);
// 	}
// 	for (let i = 0; i < t.length; i++) {
// 		for (let j = i + 1; j < t.length; j++) {
// 			if ((data2 === "asc" && t[i].price > t[j].price) || (data2 === "desc" && t[i].price < t[j].price)) {
// 				let tmp = t[i];
// 				t[i] = t[j];
// 				t[j] = tmp;
// 			}
// 		}
// 	}
// 	return t;
// }

let products = []; // holds the API data

// Fetch products from API endpoint
fetch("http://localhost:3000/products") // API endpoint
  .then(response => response.json())
  .then(data => {
    products = data;

    // Sort products by price (low -> high)
    products.sort((a, b) => a.price - b.price);

    // Render products initially
    renderProducts(products);
  })
  .catch(error => console.error("Error fetching products:", error));

  function renderProducts(productsToRender) {
  const container = document.getElementById("product-container");
  container.innerHTML = ""; // clear existing content

  productsToRender.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    // Convert cents to dollars
    const formattedPrice = (p.price / 100).toFixed(2);

    card.innerHTML = `
      <img src="${p.images[0].src}" alt="${p.title}" />
      <h3>${p.title}</h3>
      <p>$${formattedPrice}</p>
    `;
    container.appendChild(card);
  });
}

function searchInput() {
  const searchValue = document.getElementById("search-input").value.toLowerCase();
  const filteredProducts = document.querySelectorAll(".product-card");
  filteredProducts.forEach(product => {
    const productName = product.querySelector("h3").textContent.toLowerCase();
    if (productName.includes(searchValue)) {
      product.style.display = "block"; // Show matching products
    } else {
      product.style.display = "none"; // Hide non-matching products
    }
  });
}

// Sort products by price (high -> low) if checkbox is checked
function sortProducts() {
	const sortCheckbox = document.getElementById("sort-checkbox");
	if (sortCheckbox.checked) {
		products.sort((a, b) => b.price - a.price); // Sort high to low
	} else {
		products.sort((a, b) => a.price - b.price); // Sort low to high
	}
	renderProducts(products);
}