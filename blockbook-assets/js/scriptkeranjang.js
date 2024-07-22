document.addEventListener('DOMContentLoaded', function () {
    const cart = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const closeCartButton = document.getElementById('close-cart');
    const cartCount = document.getElementById('cart-count');
    const cartButton = document.querySelector('.header-action-btn');
    const pageOverlay = document.querySelector('.page-overlay');
    const totalElement = document.querySelector('.cart .total');
    const checkoutButton = document.getElementById('checkout');
    const quickviewModal = document.getElementById('quickview-modal');
    const quickviewContent = document.querySelector('.quickview-details');
    let totalPrice = 0;
    let itemCount = 0;
    let cartData = [];

    async function saveCartDataToServer() {
        try {
            const response = await fetch('/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cart: cartData }) // Send cart data to the server
            });
            const result = await response.json();
            if (result.success) {
                console.log('Cart data saved successfully.');
            } else {
                console.error('Failed to save cart data:', result.message);
            }
        } catch (error) {
            console.error('Error saving cart data:', error);
        }
    }

    async function loadCartDataFromServer() {
        try {
            const response = await fetch('/cart');
            const result = await response.json();
            cartData = Array.isArray(result.cart) ? result.cart : []; // Ensure cartData is an array
            console.log('Loaded cart data from server:', cartData);
            updateCartDisplay();
        } catch (error) {
            console.error('Error loading cart data:', error);
        }
    }

    function updateCartDisplay() {
        cartItems.innerHTML = '';
        if (!Array.isArray(cartData) || cartData.length === 0) {
            emptyCart.style.display = 'flex';
            cartItems.style.display = 'none';
            totalElement.textContent = `Total: Rp. 0`;
            cartCount.textContent = 0;
        } else {
            emptyCart.style.display = 'none';
            cartItems.style.display = 'block';
            cartData.forEach(item => {
                const cartItem = document.createElement('li');
                cartItem.classList.add('cart-item');
                cartItem.dataset.id = item.id;
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="cart-item-details">
                        <span>${item.title}</span>
                        <span class="cart-item-price">Rp. ${item.price.toLocaleString()}</span>
                        <span> ${item.quantity} </span>
                    </div>
                    <button class="remove-item">&times;</button>
                `;
                cartItems.appendChild(cartItem);
            });
            totalPrice = cartData.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            totalElement.textContent = `Total: Rp. ${totalPrice.toLocaleString()}`;
            itemCount = cartData.reduce((acc, item) => acc + item.quantity, 0);
            cartCount.textContent = itemCount;
        }
    }
    

    async function checkPendingTransactions() {
        try {
            const response = await fetch('/check-pending-transactions');
            const result = await response.json();
            return result.hasPendingTransactions;
        } catch (error) {
            console.error('Error checking pending transactions:', error);
            return false;
        }
    }

    document.querySelectorAll('.action-btn[title="Add to Cart"]').forEach(button => {
        button.addEventListener('click', async function (event) {
            const hasPendingTransactions = await checkPendingTransactions();
            if (hasPendingTransactions) {
                alert('Please complete the previous transaction first');
                return;
            }

            const productId = button.getAttribute('data-id');
            const productCard = button.closest('.book-card');
            const productImageSrc = productCard.querySelector('.img-cover').src;
            const productTitle = productCard.querySelector('.card-title').textContent;
            const productPrice = parseInt(productCard.querySelector('.text-primary').textContent.replace('Rp. ', '').replace(/,/g, ''), 10);
            const publisherId = productCard.getAttribute('data-publisher'); 
            const publisherName = productCard.getAttribute('data-publisher-name'); 

            const existingItem = cartData.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity = 1;
            } else {
                cartData.push({
                    id: productId,
                    image: productImageSrc,
                    title: productTitle,
                    price: productPrice,
                    quantity: 1,
                    publisherId: publisherId, 
                    publisherName: publisherName 
                });
            }

            updateCartDisplay();
            saveCartDataToServer();
        });
    });

    cartButton.addEventListener('click', function () {
        cart.classList.add('open');
        document.body.classList.add('no-scroll');
        pageOverlay.style.display = 'block';
    });

    closeCartButton.addEventListener('click', function () {
        cart.classList.remove('open');
        document.body.classList.remove('no-scroll');
        pageOverlay.style.display = 'none';
    });

    pageOverlay.addEventListener('click', function () {
        cart.classList.remove('open');
        document.body.classList.remove('no-scroll');
        pageOverlay.style.display = 'none';
    });

    cartItems.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-item')) {
            const cartItem = event.target.closest('.cart-item');
            const itemId = cartItem.dataset.id;
            cartData = cartData.filter(item => item.id !== itemId);
            updateCartDisplay();
            saveCartDataToServer();
        }
    });

    cartItems.addEventListener('input', function (event) {
        if (event.target.classList.contains('item-quantity')) {
            const cartItem = event.target.closest('.cart-item');
            const itemId = cartItem.dataset.id;
            const newQuantity = parseInt(event.target.value, 10);

            if (newQuantity < 1) {
                event.target.value = 1;
                return;
            }

            const item = cartData.find(item => item.id === itemId);
            if (item) {
                item.quantity = newQuantity;
                updateCartDisplay();
                saveCartDataToServer();
            }
        }
    });

    checkoutButton.addEventListener('click', function () {
        if (cartData.length === 0) {
            alert('Select the book first');
            return;
        }
    
        fetch('/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart: cartData })
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.success) {
                cartData = []; // Clear local cart data after successful checkout
                updateCartDisplay();
                window.location.href = '/keranjang'; // Redirect to display empty cart
            } else {
                alert('Failed to proceed to checkout. Please finish the last order');
            }
        })
        .catch(error => {
            console.error('Error:', error.message);
            alert(error.message);
        });
    });
    
    
    document.querySelectorAll('.action-btn[title="Quick View"]').forEach(button => {
        button.addEventListener('click', function () {
            const productCard = button.closest('.book-card');
            const productImageSrc = productCard.querySelector('.img-cover').src;
            const productTitle = productCard.querySelector('.card-title').textContent;
            const productPrice = productCard.querySelector('.text-primary').textContent;
            const productDescription = productCard.getAttribute('data-sinopsis');

            quickviewContent.innerHTML = `
                <img src="${productImageSrc}" alt="${productTitle}" class="quickview-img">
                <h2>${productTitle}</h2>
                <p>${productPrice}</p>
                <p>${productDescription}</p>
            `;

            quickviewModal.style.display = 'block';
        });
    });

    document.querySelector('.close-quickview').addEventListener('click', function () {
        quickviewModal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === quickviewModal) {
            quickviewModal.style.display = 'none';
        }
    });

    loadCartDataFromServer();
});
