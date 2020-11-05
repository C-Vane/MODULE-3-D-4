window.onload = () => {
  loadBooks();
};

let fetchBooks = (data) => {
  fetch(" https://striveschool-api.herokuapp.com/books", {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((body) => {
      data(body);
    })

    .catch((err) => {
      alert("AN ERROR HAS OCCURRED  " + err);
      console.error(err);
    });
};
const loadBooks = () => {
  fetchBooks((body) => {
    let cards = document.createElement("div");
    cards.classList.add("row");
    const destination = document.querySelector("main");
    body.forEach((element) => {
      cards.innerHTML += `
    <div class="card col-sm-6 col-md-4 col-lg-2 m-3 p-0">
        <img src="${element.img}" alt="book" class="card-img-top"/>
        <div class="card-body">
            <h6 class="card-title"><a href="landingpage.html?id=${element.asin}" class="text-muted"> ${element.title}</a></h6>
            <p class="card-text">Price: €${element.price}</p>
            <p class="card-text">Catagory: ${element.category}</p>
            <div class="book-btns">
            <button onclick="removeBook(event)" class="btn text-muted">Skip</button>
            <button onclick="addToCart(event)" class="btn btn-outline-primary"> <i class="fa fa-cart-plus"
            aria-hidden="true"></i></button>
            </div>
        </div>
    </div>`;
    });
    destination.appendChild(cards);
  });
};
const removeBook = (event) => {
  let card = event.target.parentNode.parentNode.parentNode;
  card.classList.add("loadoff");
  setTimeout(() => card.remove(), 1000);
};
let sum = 0;
const addToCart = (event) => {
  const book = event.target.parentNode.parentNode.parentNode;
  const title = book.querySelector(".card-title").innerText;
  const price = book.querySelector(".card-text").innerText.split(" ");
  book.classList.add("selected");
  const destination = document.querySelector(".dropdown-menu");
  sum = sum + Number(price[1].split("€")[1]);
  const total = destination.querySelectorAll("div div h4")[1];
  total.innerText = sum.toFixed(2);
  let cart_item = document.createElement("div");
  cart_item.classList.add("dropdown-item", "d-flex", "justify-content-between", "text-left");
  cart_item.innerHTML = `
  <p class="mr-5 text-left"><i class="fa fa-book-open" aria-hidden="true"></i> ${title}</p>
  <div> <span>${price[1]}</span> <button class="btn cancel-btn" onclick="cancelOrder(event)">x</button></div>`;
  destination.insertBefore(cart_item, destination.firstChild);
};
const cancelOrder = (event) => {
  let card = event.target.parentNode.parentNode;
  let price = card.querySelectorAll("span")[0].innerText.split("€");
  sum = sum - Number(price[1]);
  const total = document.querySelector(".dropdown-menu").querySelectorAll("div div h4")[1];
  total.innerText = sum.toFixed(2);
  card.remove();
};
const removeAll = () => {
  document.querySelectorAll(".dropdown-item .cancel-btn").forEach((el) => el.click());
  document.querySelectorAll(".selected").forEach((el) => el.classList.remove("selected"));
};
const searchBooks = () => {
  const search = document.querySelector("input[type='search']").value.toLowerCase();
  const cards = document.querySelectorAll(".card");
  cards.forEach((el) => (el.style.display = "block"));
  const searchcards = Array.from(cards).filter((book) => !book.querySelector(".card-title").innerText.toLowerCase().includes(search));
  searchcards.forEach((el) => (el.style.display = "none"));
};
const filterBooks = (event) => {
  const search = event.target.value;
  search.length > 2 ? searchBooks() : document.querySelectorAll(".card").forEach((el) => (el.style.display = "block"));
};
