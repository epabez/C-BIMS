import './style.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCDJeQ84roa3FZxqU5eH_c8xTDPo05iWEc',
  authDomain: 'epv-cbims-websys.firebaseapp.com',
  projectId: 'epv-cbims-websys',
  storageBucket: 'epv-cbims-websys.firebasestorage.app',
  messagingSenderId: '957978746250',
  appId: '1:957978746250:web:728054644f0cc03509fc73',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productList = document.querySelector('#product_list');

const productForm = document.querySelector('#product-form');
const nameInput = document.querySelector('#product-name');
const categoryInput = document.querySelector('#product-category');
const priceInput = document.querySelector('#product-price');
const inStockInput = document.querySelector('#product-instock');

async function loadProducts() {
  const products = await getDocs(collection(db, 'products'));
  const productsCount = document.querySelector('#productcount');
  productList.innerHTML = '';
  productsCount.textContent = products.size;

  products.forEach((doc) => {
    const product = doc.data();

    productList.innerHTML += `
      <article class="product-card">
        <h3>${product.name}</h3>
        <p>Category: ${product.category}</p>
        <p>Price: $${product.price}</p>
        <p>${product.inStock ? 'In Stock' : 'Out of Stock'}</p>
      </article>
    `;
  });
}

productForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  await addDoc(collection(db, 'products'), {
    name: nameInput.value,
    category: categoryInput.value,
    price: Number(priceInput.value),
    inStock: inStockInput.checked,
  });

  productForm.reset();
  loadProducts();
});

loadProducts();
