document.addEventListener("scroll", function() {
    const header = document.querySelector(".header");
    if (window.scrollY > 0) {
      header.classList.add("scroll");
    } else {
      header.classList.remove("scroll");
    }
  });


function renderHeader(){

    const defaultPhoto = "image/user.png"; 

    let userPhotoUrl = userphoto ? userphoto : defaultPhoto;

    const headerHTML = `
     <header class="header" data-header>
        <div class="header-top">
            <div class="container">

                <button class="openbtn" onclick="openNav()">&#9776; </button>

                <a href="/dashboarduser" class="logo" style="padding-top: 10px;">
                    <img src="image/blockbook-logo.png" width="138" height="28" alt="booken home">
                </a>

                <div class="input-wrapper">
                    <input type="search" name="search" id="search-input" placeholder="Search our store" class="input-field" oninput="searchProducts()">
                </div>

                    <div class="header-action">

                    <a href="https://wa.me/081298624094" class="header-action-btn-telp" aria-label="contact" title="nomer-contact">
                        <ion-icon name="call-outline" aria-hidden="true" aria-label="call"></ion-icon>
                    </a>

                    <button class="header-action-btn">
                        <ion-icon name="cart-outline" aria-hidden="true" aria-label="cart" title="Cart"></ion-icon>
                        <span id="cart-count">0</span>
                    </button>

                </div>

            </div>
        </div>

        <div class="navbar-admin" id="mySidebar">
            <div class="navbar-admin-header">
                <div class="user-info">
                    <img src="${userPhotoUrl}" alt="User Photo" class="user-photo">
                    <span class="nama-nav-header">${usernama}</span>
                </div>
                <a href="javascript:void(0)" class="closebtn-admin" onclick="closeNav()"></a>
            </div>
            <ul class="navbar-admin-content">
                <li><a href="/dashboarduser" class="navbar-menu-link">Home</a></li>
                <li><a href="/shop" class="navbar-menu-link">Shop</a></li>
                <li><a href="/about" class="navbar-menu-link">Services</a></li>
                <li><a href="/contact" class="navbar-menu-link">About Us</a></li>
                <li><a href="/myorder" class="navbar-menu-link">My Order</a></li>
            </ul>
            <div class="navbar-admin-footer">
                <button class="header-action-btn-navbar" aria-label="user" title="Logout" onclick="window.location.href='/logout'">
                    <ion-icon name="log-out-outline" aria-hidden="true"></ion-icon>
                    Logout
                </button>
            </div>
        </div>

        <div class="navbar-overlay" id="myOverlay" onclick="closeNav()"></div>
    </header>
    `;
    document.getElementById('headerweb').innerHTML = headerHTML;
}

function renderFooter(){
    const footerHTML = `
     <footer class="footer has-bg-image" style="background-color: var(--green);">

        <div class="footer-top section">
            <div class="container grid-list">

                <div class="footer-brand">

                    <a href="/" class="logo-footer">
                        <img src="image/block-white.png" width="250" height="150" alt="blockbook home">
                    </a>

                    <p class="footer-text">
                        Blockbook merupakan website berbasis teknologi blockchain dalam penerbitan buku dan pembelian buku dibekali dengan fitur web2 dan web3.
                    </p>

                    <ul class="social-list">

                        <li>
                            <a href="/contact" class="social-link">
                                <ion-icon name="logo-facebook"></ion-icon>
                            </a>
                        </li>

                        <li>
                            <a href="/contact" class="social-link">
                                <ion-icon name="logo-twitter"></ion-icon>
                            </a>
                        </li>

                        <li>
                            <a href="/contact" class="social-link">
                                <ion-icon name="logo-instagram"></ion-icon>
                            </a>
                        </li>

                        <li>
                            <a href="/contact" class="social-link">
                                <ion-icon name="logo-youtube"></ion-icon>
                            </a>
                        </li>

                        <li>
                            <a href="/contact" class="social-link">
                                <ion-icon name="logo-pinterest"></ion-icon>
                            </a>
                        </li>

                    </ul>

                </div>

                <ul class="footer-list">

                    <li>
                        <p class="footer-list-title">Pages</p>
                    </li>

                    <li>
                        <a href="/shop" class="footer-link">Shop</a>
                    </li>

                    <li>
                        <a href="/about" class="footer-link">About</a>
                    </li>

                    <li>
                        <a href="/contact" class="footer-link">Contact Us</a>
                    </li>

                </ul>

                <ul class="footer-list">

                    <li>
                        <p class="footer-list-title">Category</p>
                    </li>

                    <li>
                        <a href="#" class="footer-link">Book of War</a>
                    </li>

                    <li>
                        <a href="#" class="footer-link">Book of Lifestyle</a>
                    </li>

                    <li>
                        <a href="#" class="footer-link">Book of Hobby</a>
                    </li>

                    <li>
                        <a href="#" class="footer-link">Book of Study</a>
                    </li>

                    <li>
                        <a href="#" class="footer-link">Book of Technology</a>
                    </li>

                </ul>

                <ul class="footer-list">

                    <li>
                        <p class="footer-list-title">Services</p>
                    </li>

                    <li>
                        <a href="/shop" class="footer-link">Buy Book</a>
                    </li>

                    <li>
                        <a href="/publikasi" class="footer-link">Publication Book</a>
                    </li>

                    <li>
                        <a href="#" class="footer-link">Search Book</a>
                    </li>

                    <li>
                        <a href="#" class="footer-link">Book Category</a>
                    </li>

                </ul>

            </div>
        </div>

        <div class="footer-bottom">
            <div class="container">

                <p class="copyright">
                    Copyright 2024 | Made by Anonymus Teknik.
                </p>

                <img src="image/payment-mehtod.png" width="311" height="30" loading="lazy" alt="Payment method" class="w-100">

            </div>
        </div>

    </footer>
    `;
    document.getElementById('footerweb').innerHTML = footerHTML;
}

renderHeader();
renderFooter();

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function searchProducts() {
    let input = document.getElementById('search-input').value.toUpperCase();
    let bookItems = document.querySelectorAll('.col');

    bookItems.forEach(item => {
        let bookName = item.getAttribute('data-book-name').toUpperCase();
        if (bookName.includes(input)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

document.getElementById('search-input').addEventListener('input', debounce(searchProducts));
