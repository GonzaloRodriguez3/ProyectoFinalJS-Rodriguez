// Variables
let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total');
let amountProduct = document.querySelector('.count-product');

let buyThings = [];
let totalCard = 0;
let countProduct = 0;

// Functions
loadEventListeners();

function loadEventListeners() {
    allContainerCart.addEventListener('click', addProduct);
    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectedProduct = e.target.parentElement;
        readTheContent(selectedProduct);
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings = buyThings.filter(product => {
            if (product.id === deleteId) {
                let priceReduce = parseFloat(product.price) * product.amount;
                totalCard -= priceReduce;
                totalCard = totalCard.toFixed(2);
            }
            return product.id !== deleteId;
        });

        countProduct = buyThings.length;

        if (buyThings.length === 0) {
            priceTotal.innerHTML = '0.00';
            amountProduct.innerHTML = 0;
        }

        loadHtml();
    }
}

function readTheContent(product) {
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    };

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(item => item.id === infoProduct.id);
    if (exist) {
        const updatedProducts = buyThings.map(item => {
            if (item.id === infoProduct.id) {
                item.amount++;
                return item;
            }
            return item;
        });
        buyThings = [...updatedProducts];
    } else {
        buyThings = [...buyThings, infoProduct];
        countProduct++;
    }

    loadHtml();
}

function loadHtml() {
    clearHtml();
    buyThings.forEach(product => {
        const { image, title, price, amount, id } = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);
    });

    priceTotal.innerHTML = totalCard;
    amountProduct.innerHTML = countProduct;
}

function clearHtml() {
    containerBuyCart.innerHTML = '';
}
