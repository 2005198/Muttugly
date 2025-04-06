const products = [
    { id: 1, name: "T-Shirt", price: 20, image: "https://via.placeholder.com/200x150.png?text=T-Shirt" },
    { id: 2, name: "Sneakers", price: 50, image: "https://via.placeholder.com/200x150.png?text=Sneakers" },
    { id: 3, name: "Backpack", price: 30, image: "https://via.placeholder.com/200x150.png?text=Backpack" }
  ];
  
  // Cart data
  let cart = [];
  
  // Get the DOM elements for the product grid and cart
  const productGrid = document.getElementById("productGrid");
  const cartContainer = document.getElementById("cartContainer");
  const cartItems = document.getElementById("cartItems");
  const totalAmount = document.getElementById("totalAmount");
  
  // Render the products in the product grid
  function renderProducts() {
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productGrid.appendChild(card);
    });
  }
  
  // Add product to the cart
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(p => p.id === productId);
  
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    renderCart();
  }
  
  // Render the cart
  function renderCart() {
    // Clear previous cart content
    cartItems.innerHTML = "";
  
    // Render the new cart items
    let total = 0;
    cart.forEach(item => {
      const cartItem = document.createElement("li");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        ${item.name} x ${item.quantity} - $${item.price * item.quantity}
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItems.appendChild(cartItem);
      total += item.price * item.quantity;
    });
  
    totalAmount.textContent = `Total: $${total}`;
  }
  
  // Remove item from the cart
  function removeFromCart(productId) {
    const productIndex = cart.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
      cart.splice(productIndex, 1);
      renderCart();
    }
  }
  
  // Initial render
  renderProducts();
  