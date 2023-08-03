
document.addEventListener('DOMContentLoaded', function() {

    apiUrl = 'https://fakestoreapi.com/products'
    cartUrl = 'https://fakestoreapi.com/carts/1'

              //cart Data
              const cart = {
                id: 1,
                date: '',
                products: [],
            };

            // Function to add a product to the cart
            const addToCart = (product) => {
            cart.products.push(product);
            updateCartDisplay();
         
            };    
        
            const updateCartDisplay = () => {
            const cartContainer = document.getElementById('cart-container');
            cartContainer.innerHTML = '';
        
            cart.products.forEach(product => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                if (product && product.title && product.price) {
                const productPrice = parseFloat(product.price.toFixed(2));
                cartItem.innerHTML = 
                    `<p class="cart-product-title">${product.title}</p>
                    <p class="cart-product-price">$${product.price.toFixed(2)}</p>`;
                cartContainer.append(cartItem);
                }
            });
        
            // cart total display
            const cartTotal = document.getElementById('cart-total');
            const totalAmount = cart.products.reduce((total, product)=>{
            if(product && product.price){
                return total+parseFloat(product.price)
            }
            return total
            },0)
            cartTotal.textContent = `$${totalAmount.toFixed(2)}`;

            // Cart Click event
            const cartIcon = document.getElementById('cart-icon');
            cartIcon.addEventListener('click', toggleCartModal);
         };
        
        // Function to fetch and display cart data
        const fetchCartData = (event) => {
            event.preventDefault();
        fetch(cartUrl)
            .then(response => response.json())
            .then(cartData => {
                console.log(cartData);
                if (Array.isArray(cartData.products)) {
                    cart.products = cartData.products;
                } else {
                    cart.products = [];
                }
                updateCartDisplay();
            })
            .catch(error => {
                console.error('Error fetching cart data:', error);
            });
        };


            // Function to toggle the cart modal
            const toggleCartModal = () => {
                const cartModal = document.getElementById('cart-modal');
                const cartContent = document.getElementById('cart-container');
                const cartTotal = document.getElementById('cart-total');
                if (cart.products.length > 0) {
                    cartContent.innerHTML = '';
        
                    cart.products.forEach(product => {
                        const cartItem = document.createElement('div');
                        cartItem.className = 'cart-item';
                        cartItem.innerHTML = `
                            <p class="cart-product-title">${product.title} - $${product.price.toFixed(2)}</p>`;
                        cartContent.appendChild(cartItem);
                    });
        
                    cartTotal.textContent = `$${cart.products.reduce((total, product) => total + product.price, 0).toFixed(2)}`;
        
                    cartModal.classList.toggle('show');
                } else {
                    alert('No products added to the cart.');
                }
            console.log(toggleCartModal)
            };
            
            // Attach click event to the cart icon to toggle the cart modal
            const cartIcon = document.getElementById('cart-icon');
            cartIcon.addEventListener('click', toggleCartModal);
            
            
            // Function to close the cart modal
            const closeCartModal = () => {
                const cartModal = document.getElementById('cart-modal');
                cartModal.classList.remove('show');
            };
            
            // Attach click event to the close button in the cart modal
            const closeCartButton = document.getElementById('close-cart');
            closeCartButton.addEventListener('click', closeCartModal);
            

  

        
         // Custom product details
                const customProducts = [
            {
            title: 'Nails',
            description: 'A set of high-quality screwdrivers for various tasks.',
            category: 'Hand Tools',
            price: 19.99,
            image: 'https://plus.unsplash.com/premium_photo-1675371421509-d6df83959778?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGhhcmR3YXJlJTIwc3RvcmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
            },
            {
            title: 'Paint',
            description: 'Powerful drill with multiple attachments for drilling and screwing.',
            category: 'Abrassive',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFpbnRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
            },
    
            {
            title: 'Nails',
            description: 'A set of high-quality screwdrivers for various tasks.',
            category: 'Hand Tools',
            price: 19.99,
            image: 'https://plus.unsplash.com/premium_photo-1675371421509-d6df83959778?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGhhcmR3YXJlJTIwc3RvcmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
            },
            {
            title: 'Paint',
            description: 'Powerful drill with multiple attachments for drilling and screwing.',
            category: 'Abrassive',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFpbnRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
            },
            {
            title: 'Nails',
            description: 'A set of high-quality screwdrivers for various tasks.',
            category: 'Hand Tools',
            price: 19.99,
            image: 'https://plus.unsplash.com/premium_photo-1675371421509-d6df83959778?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGhhcmR3YXJlJTIwc3RvcmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
            },
            {
            title: 'Paint',
            description: 'Powerful drill with multiple attachments for drilling and screwing.',
            category: 'Abrassive',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFpbnRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
            },
         
        ];
        


    fetch(apiUrl)
    
      .then(response => response.json())
      .then(data => {
        // Process the fetched data
        const contentDiv = document.querySelector('.content')
    
        //replace fethced data with custom products
        const allProducts = customProducts
    
        //loop through each product in the fetched data
        allProducts.forEach(product=> {
        //create a card element for each product
        const productCard = document.createElement('div')
        productCard.className = 'product-card'  
    
        //fill in the product with details
        productCard.innerHTML = ` 
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <h2 class="product-title">${product.title}</h2>
        <p class="product-category">Category: ${product.category}</p>
        <p class="product-price">Price: $${product.price}</p>
        <p class="product-description">${product.description}</p>
        <button class ="button">Buy now</button>`

         // event listener to Buy Now button
         const buyButton = productCard.querySelector('.button');
         buyButton.addEventListener('click', () => {
             addToCart(product);
         });
    
        contentDiv.appendChild(productCard);
    
    })
    // Fetch and display cart data
    fetchCartData();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
     //About Us content
     const aboutContent = `
     <h2>About Us</h2>
     <p>Welcome to OneStopBuild, your online destination for top-notch construction tools and equipment. We are committed to providing the highest quality tools at prices that won't break the bank.</p>
     <p>With a passion for construction and a keen understanding of the needs of professionals in the industry, we have curated a wide range of tools that meet the highest standards of performance and durability. Our mission is to empower builders, contractors, and DIY enthusiasts with the tools they need to bring their projects to life.</p>
     <p>At OneStopBuild, we believe that the right tools are essential for any successful construction project. Our catalog includes a diverse selection of hand tools, power tools, abrasives, and accessories, all carefully selected to ensure your projects are completed efficiently and to the highest standards.</p>
     <p>Customer satisfaction is at the heart of everything we do. Our team is dedicated to providing exceptional service, quick shipping, and reliable support. Whether you're a seasoned professional or just getting started, we're here to help you find the perfect tools for your needs.</p>
     <p>Thank you for choosing OneStopBuild. Join us on our journey to build a better future, one project at a time.</p>
 `;

   const aboutContainer = document.getElementById('aboutid')
   aboutContainer.innerHTML = aboutContent



});
    

         
  







