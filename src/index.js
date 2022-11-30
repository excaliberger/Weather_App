import WishList from "./wishlist.js"
import Car from "./car.js";

let form = document.getElementById("submitForm");
let makeInput = document.getElementById("makeInput");
let modelInput = document.getElementById("modelInput");
let yearInput = document.getElementById("yearInput");
let makeDisplay = document.getElementById("car-make");
let modelDisplay = document.getElementById("car-model");
let yearDisplay = document.getElementById("car-year");
let removeBtn = document.querySelector(".removeBtn");
let wishlistUl = document.querySelector("#wishListContainer > ul");

let newWishlist = new WishList([], 0);

form.addEventListener('submit', addCar);
removeBtn.onclick = removeCar;

function updateDOMList() {
    wishlistUl.innerHTML = "";
    newWishlist.list.forEach((car) =>{
        const li = document.createElement("li");
        li.textContent = `${car.make} ${car.model}`;
        wishlistUl.appendChild(li);
        li.onclick = () => showCarDetails(car);
    })  
}

function showCarDetails(car) {
    makeDisplay.textContent = car.make;
    modelDisplay.textContent = car.model;
    yearDisplay.textContent = car.year;
    removeBtn.disabled = false;
    removeBtn.setAttribute("data-carId", car.id);
}


function addCar (click) {
    click.preventDefault();
    let make = makeInput.value;
    let model = modelInput.value;
    let year = yearInput.value;
    
    newWishlist.add(make, model, year);

    updateDOMList();

    makeInput.value = null;
    modelInput.value = null;
    yearInput.value = null;
}

function removeCar() {
    let carId = Number(removeBtn.getAttribute("data-carId"));
    console.log(removeBtn.getAttribute("data-carId"));
    newWishlist.remove(carId);
    updateDOMList();
  
    makeDisplay.textContent = "";
    modelDisplay.textContent = "";
    yearDisplay.textContent = "";
    removeBtn.disabled = true;
  }
