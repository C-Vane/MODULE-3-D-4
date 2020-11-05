window.onload = () => {
  loadBooks();
};
const fetchBooks = (data) => {
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
    console.log(body[0]);
    body.forEach((element) => {
      cards.innerHTML += `<div class="card col-sm-6 col-md-4 col-lg-2 m-3 p-0">
        <img src="${element.img}" alt="book" class="card-img-top">
        <div class="card-body">
            <h6 class="card-title"> ${element.title}</h6>
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

const addToCart = (event) => {
  const book = event.target.parentNode.parentNode.parentNode;
  const title = book.querySelector(".card-title").innerText;
  const price = book.querySelector(".card-text").innerText.split("‎€");
  console.log(price);
  const destination = document.querySelector(".dropdown-menu");
  let cart_item = document.createElement("p");
  cart_item.classList.add("dropdown-item", "d-flex", "justify-content-between");
  cart_item.innerHTML = `<i class="fa fa-book-open" aria-hidden="true"></i> 
  <span>${title}</span><span>${price}<span>`;
  destination.insertBefore(cart_item, destination.firstChild);
};
