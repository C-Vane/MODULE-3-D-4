window.onload = () => {
  loadBook();
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
const loadBook = () => {
  fetchBooks((body) => {
    let url = document.location.href;
    let id = url.split("id=")[1];
    let book = body.filter((book) => book.asin === id)[0];
    let card = document.createElement("section");
    console.log(book);
    card.innerHTML = `<h1> ${book.title}</h1> <div class="card mb-3" >
    <div class="row no-gutters">
    <div class="col-md-6">
      <img src="${book.img}" class="card-img" alt="...">
    </div>
    <div class="col-md-6">
      <div class="card-body p-4">
        <h2 class="card-title font-weight-bold">${book.title}</h2>
        <p class="card-text font-weight-bold">Price: €${book.price}</p>
        <p class="card-text font-weight-bold">Catagory: ${book.category}</p>
        <p class="card-text font-weight-bold">Author: ${book.author}</p>
        <h3 class="card-text text-uppercase font-weight-bold"> About Book</h3>
        <p class="card-text p-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      </div>
    </div>
  </div>
  </div>`;
    const destination = document.querySelector("main");
    console.log(destination);
    destination.appendChild(card);
  });
};
