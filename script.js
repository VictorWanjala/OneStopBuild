
        document.addEventListener('DOMContentLoaded', function() {

            apiUrl = 'https://fakestoreapi.com/products'
            cartUrl = 'https://fakestoreapi.com/carts/1'

                     // Attach submit event to the search form
                        const searchForm = document.querySelector('.search-form');
                        searchForm.addEventListener('submit', (event) => {
                            event.preventDefault();
                            const searchTerm = document.getElementById('searchBar').value;
                            searchProducts(searchTerm);
                        });
                        const searchProducts = (searchTerm) => {
                            const searchResultsDiv = document.getElementById('searchResults');
                            searchResultsDiv.innerHTML = '';
                        
                            if (searchTerm) {
                                const searchResults = customProducts.filter((product) =>
                                    product.title.toLowerCase().includes(searchTerm.toLowerCase())
                                );
                        
                                if (searchResults.length > 0) {
                                    searchResults.forEach((product) => {
                                        const searchResultItem = document.createElement('div');
                                        searchResultItem.className = 'search-result-item';
                                        searchResultItem.innerHTML = `
                                            <p class="search-product-title">${product.title}</p>
                                            <p class="search-product-price">$${product.price.toFixed(2)}</p>`;
                                        searchResultsDiv.appendChild(searchResultItem);
                                    });
                                } else {
                                    searchResultsDiv.textContent = 'No matching products found.';
                                }
                            }
                        };
                        

                    //cart Data
                    const cart = {
                        id: 1,
                        date: '',
                        products: [],
                        price: 0
                    };

                    // Function to add a product to the cart
                    const addToCart = (event, product) => {
                    event.preventDefault
                    cart.products.push(product);
                    updateCartDisplay();
                    updateCartCount();
                    };    
                    
                        // Function to remove a product from the cart
                    const removeCartItem = (event, productIndex) => {
                        event.stopPropagation(); // Prevent the click event from propagating to the cart modal
                        cart.products.splice(productIndex, 1); // Remove the product from the cart
                        updateCartDisplay();
                        updateCartCount();
                    };

                    const updateCartDisplay = () => {
                        const cartContainer = document.getElementById('cart-container');
                        cartContainer.innerHTML = '';
                    
                        cart.products.forEach((product, index) => {
                            const cartItem = document.createElement('div');
                            cartItem.className = 'cart-item';
                            if (product && product.title && product.price) {
                                cart.price += parseFloat(product.price);
                                cartItem.innerHTML = `
                                    <p class="cart-product-title">${product.title}</p>
                                    <p class="cart-product-price">$${product.price.toFixed(2)}</p>
                                    <button class="remove-button" data-index="${index}">Remove</button>`;
                                cartContainer.append(cartItem);
                                cartItem.addEventListener('click', (event) => {
                                    event.preventDefault();
                                });
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

                };
                
                // Attaching click event to each cart item to remove it
                    const cartItems = document.querySelectorAll('.cart-item');
                    cartItems.forEach((cartItem, index) => {
                        cartItem.addEventListener('click', (event) => {
                            removeCartItem(event, index);
                        });
                    });
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
                        updateCartCount();
                    })
                    .catch(error => {
                        console.error('Error fetching cart data:', error);
                    });
                };


                    // Function to toggle the cart modal
                    const toggleCartModal = (event) => {
                        event.preventDefault()
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
                            // Show the cart modal
                            cartModal.style.display = 'block';
                        } else {
                            alert('No products added to the cart.');
                        }
                    
                    };
                    
                    // Attaching click event to the cart icon to toggle the cart modal
                    const cartIcon = document.getElementById('cart-icon');
                    cartIcon.addEventListener('click', toggleCartModal);
            

                    
                    
                    // Function to close the cart modal
                    const closeCartModal = () => {
                        const cartModal = document.getElementById('cart-modal');
                        // Hide the modal
                        cartModal.style.display = 'none'; 
                    };
                    
                    // Attaching click event to the close button in the cart modal
                    const closeCartButton = document.getElementById('close-cart');
                    closeCartButton.addEventListener('click', closeCartModal);
                    
                    
        

                
                // Custom product details
                        const customProducts = [
                    {
                    title: 'Screwdriver',
                    description: 'A set of high-quality screwdrivers for various tasks.',
                    category: 'Hand Tools',
                    price: 19.99,
                    image: 'https://images.pexels.com/photos/11882650/pexels-photo-11882650.jpeg?auto=compress&cs=tinysrgb&w=1600'
                    },
                    {
                    title: 'Pliers',
                    description: 'hand-operated tool for holding and gripping small articles or for bending and cutting wire.',
                    category: 'Hand Tools',
                    price: 89.99,
                    image: 'https://images.pexels.com/photos/5583076/pexels-photo-5583076.jpeg?auto=compress&cs=tinysrgb&w=1600'
                    },
            
                    {
                    title: 'Hammers',
                    description: 'hammers are used for general carpentry, framing, nail pulling, cabinet making, assembling furniture.',
                    category: 'Hand Tools',
                    price: 19.99,
                    image: 'https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg?auto=compress&cs=tinysrgb&w=1600'
                    },
                    {
                    title: 'Tiles accessories',
                    description: 'Wood is a common choice as a flooring material and can come in various styles, colors, cuts, and species. .',
                    category: 'Flooring',
                    price: 89.99,
                    image: 'https://images.pexels.com/photos/1652544/pexels-photo-1652544.jpeg?auto=compress&cs=tinysrgb&w=1600'
                    },
                    {
                    title: 'Wooden Flooring',
                    description: 'A set of high-quality screwdrivers for various tasks.',
                    category: 'Flooring',
                    price: 19.99,
                    image: 'https://images.pexels.com/photos/368754/pexels-photo-368754.jpeg?auto=compress&cs=tinysrgb&w=1600'
                    },
                    {
                    title: 'Flush Doors',
                    description: 'door describes a doorset where the door face sits in-line with the door frame.',
                    category: 'Doors',
                    price: 89.99,
                    image: 'https://media.istockphoto.com/id/508182318/photo/doors-from-toilets.jpg?b=1&s=612x612&w=0&k=20&c=rbMHcbP0kGWSzFqIJJvzd6KGD4hULIIwFKtYLb43o4I='
                    },
                    {
                        title: 'Hardwood doors',
                        description: 'Solid wood doors are commonly made with a frame-and-panel construction that uses natural wood—whether a softwood like pine or a hardwood like oak or maple.',
                        category: 'Doors',
                        price: 89.99,
                        image: 'https://images.pexels.com/photos/8134757/pexels-photo-8134757.jpeg?auto=compress&cs=tinysrgb&w=1600'
                    },
                    {
                        title: 'PVC Pipes',
                        description: 'PVC pipes are made of polyvinyl chloride, a plastic that is made by combining chlorine and ethylene.',
                        category: 'Plumbing',
                        price: 89.99,
                        image: 'https://media.istockphoto.com/id/512524387/photo/pvc-pipes.jpg?b=1&s=612x612&w=0&k=20&c=SBS7U-nsBXqahepzQdVKx9iVTcDQZVE55cCw9gX9ENw='
                    },
                    {
                        title: 'Corrugated iron sheets',
                        description: 'Corrugated Galvanized Iron or Steel sheets are a lightweight roofing material made of thin sheets, stiffened by corrugations. ',
                        category: 'Roofing',
                        price: 89.99,
                        image: 'https://images.pexels.com/photos/5660082/pexels-photo-5660082.jpeg?auto=compress&cs=tinysrgb&w=1600'
                    },
                    {
                        title: 'Steel',
                        description: 'Steel is an alloy of iron and carbon with improved strength and fracture resistance compared to other forms of iron. ',
                        category: 'Fencing',
                        price: 89.99,
                        image: 'https://media.istockphoto.com/id/1344231216/photo/rolled-metal-warehouse-many-packs-of-metal-bars-on-the-shelves.jpg?b=1&s=612x612&w=0&k=20&c=0pWOK2vinXIo9foxgpQM3poulkvEzn9A1W1fRENHz1Q='
                    },
                    {
                        title: 'Barbed Wire',
                        description: 'type of steel fencing wire constructed with sharp edges or points arranged at intervals along the strands.',
                        category: 'Fencing',
                        price: 89.99,
                        image: 'https://images.pexels.com/photos/804806/pexels-photo-804806.jpeg?auto=compress&cs=tinysrgb&w=1600'
                    },
                    {
                        title: 'Chainlink',
                        description: 'A chainlink fence is a type of fence with a distinct diamond pattern usually made from a steel wire woven together in a zigzag line.',
                        category: 'Doors',
                        price: 89.99,
                        image: 'https://media.istockphoto.com/id/1387511051/photo/black-chain-link-fence-in-front-of-green-hedging.jpg?b=1&s=612x612&w=0&k=20&c=RPIhTyE8q5f1VpToA0B6V3WhxEq9De0QD2XI00aEhmg='
                    },
                    {
                        title: 'PPR Pipes',
                        description: 'PPR pipes (Polypropylene Random Copolymer pipes) are a type of plastic pipe made from a blend of polypropylene and ethylene copolymers.',
                        category: 'Plumbing',
                        price: 89.99,
                        image: 'https://media.istockphoto.com/id/1342062480/photo/ppr-pipe-fittings-were-on-the-box.jpg?b=1&s=612x612&w=0&k=20&c=YnJwkVbJgw0fxFcKr_WQ246MYCWkUBsNQHXt2dw2lss='
                    },
                    {
                        title: 'Chainlink',
                        description: 'A chainlink fence is a type of fence with a distinct diamond pattern usually made from a steel wire woven together in a zigzag line.',
                        category: 'Doors',
                        price: 89.99,
                        image: 'https://media.istockphoto.com/id/172859283/photo/chain-link-fence.jpg?b=1&s=612x612&w=0&k=20&c=phNrADYoF__XoOkaD-q9LiNjX9oWXbpT-a2bFP8xS48='
                    },
                    {
                        title: 'Barbed Wire',
                        description: 'type of steel fencing wire constructed with sharp edges or points arranged at intervals along the strands.',
                        category: 'Fencing',
                        price: 89.99,
                        image: 'https://media.istockphoto.com/id/169726705/photo/barbed-wire.jpg?b=1&s=612x612&w=0&k=20&c=2T3bKaILPJxo78OkDQUNjYJPMZvjeBpkoS3eKKz6FY4='
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
                buyButton.addEventListener('click', (event) => {
                    addToCart(event, product);
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
            const aboutContent = 
            `<h2>About Us</h2>
            <p>OneStopBuild is your premier online source for high-quality construction tools and equipment at affordable prices. With a deep understanding of industry needs, we offer a curated selection of tools, including hand and power tools, abrasives, and accessories, to empower professionals and DIY enthusiasts.</p>
            <p>Our dedicated team prioritizes customer satisfaction through exceptional service, quick shipping, and reliable support. Join us in our mission to enhance construction projects and build a better future.</p>
            <p>Our product range includes Hand Tools, Flooring, Doors, Plumbing, Roofing, and Fencing.</p>`;

        const aboutContainer = document.getElementById('aboutid')
        aboutContainer.innerHTML = aboutContent

        const updateCartCount = () => {
            const cartCount = document.getElementById('cart-count');
            cartCount.textContent = cart.products.length.toString();
          };
          
          

        });
    

         
  







