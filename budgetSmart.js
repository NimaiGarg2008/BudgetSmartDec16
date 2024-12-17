let cartBox = document.querySelector('.itemsInCartBox');
let budgetElement = document.querySelector("#budget");
let budgetCurrencySymbol = document.querySelector("#budget-currency-symbol");
let timerDisplay = document.querySelector("#timer");
let storeItemsContainer = document.getElementById("store-items-container");

const usdButton = document.getElementById("usd-button");
const cadButton = document.getElementById("cad-button");
const eurButton = document.getElementById("eur-button");

let totalPrice = 0;
let currentIndex = 0;
let targetDesirability = 0;
let cart = [];
let selectedCurrency = 'USD';
let selectedSpeed = '1x';
let remainingTime = 120;
let speedFactor = 1;
let totalDesirability = 0;
let currencyRates = { USD: 1, CAD: 1.42, EUR: 0.95 };
let timerInterval;

let items = [
   // Dairy
   { name: "Golden Farms Unsalted Butter - Organic (2 sticks)", displayName: "Golden Farms Unsalted Butter - Organic", category: "Dairy", price: 1.00, desirability: 0.6 },
   { name: "Pure Irish Salted Butter (1 stick)", displayName: "Pure Irish Salted Butter", category: "Dairy", price: 1.50, desirability: 0.7 },
   { name: "Green Valley Greek Yogurt - Organic (6 oz)", displayName: "Green Valley Greek Yogurt - Organic", category: "Dairy", price: 1.85, desirability: 0.8 },
   { name: "Golden Farms Cottage Cheese (16 oz)", displayName: "Golden Farms Cottage Cheese", category: "Dairy", price: 2.00, desirability: 0.9 },
   { name: "Pure Irish Cream Cheese (8 oz)", displayName: "Pure Irish Cream Cheese", category: "Dairy", price: 2.29, desirability: 1 },
   { name: "French Sunshine Butter (1 stick)", displayName: "French Sunshine Butter", category: "Dairy", price: 2.40, desirability: 1.1 },
   { name: "Green Valley Sour Cream (16 oz)", displayName: "Green Valley Sour Cream", category: "Dairy", price: 2.75, desirability: 1.6 },
   { name: "Happy Dairy Whole Milk (1 gallon)", displayName: "Happy Dairy Whole Milk", category: "Dairy", price: 2.99, desirability: 1.7 },
   { name: "Pure Organic Almond Milk (64 fl oz)", displayName: "Pure Organic Almond Milk", category: "Dairy", price: 3.50, desirability: 2 },
   { name: "Silver Oak Cheese - Mozzarella (8 oz)", displayName: "Silver Oak Cheese - Mozzarella", category: "Dairy", price: 3.60, desirability: 2.1 },
   { name: "Silver Oak Cheese - Cheddar (8 oz)", displayName: "Silver Oak Cheese - Cheddar", category: "Dairy", price: 3.75, desirability: 2.2 },
   { name: "Green Valley Nonfat Yogurt (32 oz)", displayName: "Green Valley Nonfat Yogurt", category: "Dairy", price: 4.00, desirability: 2.4 },
   { name: "Happy Cow Milk - Organic (1 gallon)", displayName: "Happy Cow Milk - Organic", category: "Dairy", price: 4.25, desirability: 2.5 },
   { name: "Nature's Choice Butter - Organic (1 lb)", displayName: "Nature's Choice Butter - Organic", category: "Dairy", price: 4.50, desirability: 2.6 },

   // Meats
   { name: "Butcher's Pride Pork Chops (1 lb)", displayName: "Butcher's Pride Pork Chops", category: "Meats", price: 4.00, desirability: 2 },
   { name: "Silver Lake Boneless Chicken Wings (1 lb)", displayName: "Silver Lake Boneless Chicken Wings", category: "Meats", price: 4.50, desirability: 2.2 },
   { name: "Fresh Farms Ground Turkey (1 lb)", displayName: "Fresh Farms Ground Turkey", category: "Meats", price: 4.99, desirability: 2.4 },
   { name: "Harvest Choice Boneless Chicken Thighs (1 lb)", displayName: "Harvest Choice Boneless Chicken Thighs", category: "Meats", price: 5.50, desirability: 2.6 },
   { name: "Golden Harvest Ground Beef (1 lb)", displayName: "Golden Harvest Ground Beef", category: "Meats", price: 5.99, desirability: 2.8 },
   { name: "Pure Valley Organic Chicken Breast (1 lb)", displayName: "Pure Valley Organic Chicken Breast", category: "Meats", price: 6.99, desirability: 3.1 },
   { name: "Royal Meadows Organic Chicken Wings (1 lb)", displayName: "Royal Meadows Organic Chicken Wings", category: "Meats", price: 7.00, desirability: 3.3 },
   { name: "Wild Ocean Salmon Fillet (6 oz)", displayName: "Wild Ocean Salmon Fillet", category: "Meats", price: 7.50, desirability: 3.8 },
   { name: "Ocean Fresh Cod Fillets (1 lb)", displayName: "Ocean Fresh Cod Fillets", category: "Meats", price: 8.99, desirability: 4 },
   { name: "Green Meadows Organic Pork Tenderloin (1 lb)", displayName: "Green Meadows Organic Pork Tenderloin", category: "Meats", price: 9.75, desirability: 4.1 },
   { name: "Fresh Valley Organic Ground Lamb (1 lb)", displayName: "Fresh Valley Organic Ground Lamb", category: "Meats", price: 10.50, desirability: 4.2 },
   { name: "Golden Farms Beef Sirloin Steaks (2 steaks)", displayName: "Golden Farms Beef Sirloin Steaks", category: "Meats", price: 12.99, desirability: 4.5 },
   { name: "Gold Coast Beef Ribeye Steak (1 lb)", displayName: "Gold Coast Beef Ribeye Steak", category: "Meats", price: 14.50, desirability: 4.7 },
   { name: "Wild River Salmon Fillet (1 lb)", displayName: "Wild River Salmon Fillet", category: "Meats", price: 15.00, desirability: 4.8 },

   // Vegetables
   { name: "Happy Farms Fresh Corn (1 cob)", displayName: "Happy Farms Fresh Corn", category: "Vegetables", price: 0.79, desirability: 1 },
   { name: "Pure Earth Green Beans (1 lb)", displayName: "Pure Earth Green Beans", category: "Vegetables", price: 1.00, desirability: 1.4 },
   { name: "Sunny Valley Potatoes (2 lbs)", displayName: "Sunny Valley Potatoes", category: "Vegetables", price: 1.19, desirability: 1.6 },
   { name: "Earth's Bounty Zucchini (2 zucchinis)", displayName: "Earth's Bounty Zucchini", category: "Vegetables", price: 1.39, desirability: 1.8 },
   { name: "Golden Harvest Yellow Onions (3 onions)", displayName: "Golden Harvest Yellow Onions", category: "Vegetables", price: 1.50, desirability: 1.9 },
   { name: "Fresh Harvest Broccoli (1 bunch)", displayName: "Fresh Harvest Broccoli", category: "Vegetables", price: 1.75, desirability: 2 },
   { name: "Green Farms Organic Garlic (1 bulb)", displayName: "Green Farms Organic Garlic", category: "Vegetables", price: 1.99, desirability: 2.1 },
   { name: "Herb's Best Lettuce Mix (5 oz)", displayName: "Herb's Best Lettuce Mix", category: "Vegetables", price: 2.00, desirability: 2.2 },
   { name: "Wild Orchards Fresh Spinach (1 lb)", displayName: "Wild Orchards Fresh Spinach", category: "Vegetables", price: 2.25, desirability: 2.3 },
   { name: "Golden Fields Cauliflower (1 head)", displayName: "Golden Fields Cauliflower", category: "Vegetables", price: 2.50, desirability: 2.4 },
   { name: "Golden Meadows Tomatoes (4 tomatoes)", displayName: "Golden Meadows Tomatoes", category: "Vegetables", price: 2.75, desirability: 2.5 },
   { name: "Nature's Choice Mushrooms (8 oz)", displayName: "Nature's Choice Mushrooms", category: "Vegetables", price: 2.99, desirability: 2.6 },
   { name: "Nature Valley Fresh Kale (1 bunch)", displayName: "Nature Valley Fresh Kale", category: "Vegetables", price: 3.50, desirability: 2.7 },
   { name: "Sunshine Natural Asparagus (1 bunch)", displayName: "Sunshine Natural Asparagus", category: "Vegetables", price: 3.99, desirability: 2.8 },

   // Fruits
   { name: "Sunrise Perfectly Ripe Bananas (1 bunch)", displayName: "Sunrise Perfectly Ripe Bananas", category: "Fruits", price: 1.25, desirability: 1 },
   { name: "Golden Orchard Pears (2 pears)", displayName: "Golden Orchard Pears", category: "Fruits", price: 1.50, desirability: 1.2 },
   { name: "Sunny Farms Lemons (4 lemons)", displayName: "Sunny Farms Lemons", category: "Fruits", price: 1.79, desirability: 1.4 },
   { name: "Golden Farms Natural Kiwi (4 kiwis)", displayName: "Golden Farms Natural Kiwi", category: "Fruits", price: 2.00, desirability: 1.6 },
   { name: "Redwood Apples - Organic (3 apples)", displayName: "Redwood Apples - Organic", category: "Fruits", price: 2.25, desirability: 1.7 },
   { name: "Citrus Coast Limes (5 limes)", displayName: "Citrus Coast Limes", category: "Fruits", price: 2.50, desirability: 1.8 },
   { name: "Red Mountain Plums (4 plums)", displayName: "Red Mountain Plums", category: "Fruits", price: 2.79, desirability: 1.9 },
   { name: "Citrus Valley Oranges (4 oranges)", displayName: "Citrus Valley Oranges", category: "Fruits", price: 2.99, desirability: 2 },
   { name: "Golden Grove Peaches (3 peaches)", displayName: "Golden Grove Peaches", category: "Fruits", price: 3.19, desirability: 2.1 },
   { name: "Apple Farms Red Apples (6 apples)", displayName: "Apple Farms Red Apples", category: "Fruits", price: 3.39, desirability: 2.2 },
   { name: "Green Grove Strawberries - Organic (1 lb)", displayName: "Green Grove Strawberries - Organic", category: "Fruits", price: 3.75, desirability: 2.3 },
   { name: "Pure Earth Pineapple (1 pineapple)", displayName: "Pure Earth Pineapple", category: "Fruits", price: 3.99, desirability: 2.4 },
   { name: "Tropical Mangoes (2 mangoes)", displayName: "Tropical Mangoes", category: "Fruits", price: 4.19, desirability: 2.7 },
   { name: "Sunny Valley Grapes - Organic (1 lb)", displayName: "Sunny Valley Grapes - Organic", category: "Fruits", price: 5.00, desirability: 3 },

   // Grains
   { name: "Nature's Choice Premium Oats (1 lb)", displayName: "Nature's Choice Premium Oats", category: "Grains", price: 2.00, desirability: 2.1},
   { name: "Scarlet River Organic Barley(1 lb)", displayName: "Scarlet River Organic Barley", category: "Grains", price: 3.00, desirability: 3 },
   { name: "Pure Harvest Brown Rice (2 lbs)", displayName: "Pure Harvest Brown Rice", category: "Grains", price: 3.50, desirability: 3.4 },
   { name: "Golden Valley Quinoa Seeds (1 lb)", displayName: "Golden Valley Quinoa Seeds", category: "Grains", price: 4.00, desirability: 3.8 },

   // Pasta
   { name: "Harvest Wheat Fusilli Pasta (12 oz)", displayName: "Harvest Wheat Fusilli Pasta", category: "Pasta", price: 1.00, desirability: 1.5 },
   { name: "Classic Italian Spaghetti (1 lb)", displayName: "Classic Italian Spaghetti", category: "Pasta", price: 1.20, desirability: 1.6 },
   { name: "Silver Oak Penne Pasta (1 lb)", displayName: "Silver Oak Penne Pasta", category: "Pasta", price: 1.50, desirability: 1.7 },
   { name: "Golden Harvest Couscous (1 lb)", displayName: "Golden Harvest Couscous", category: "Pasta", price: 2.25, desirability: 1.9 },
   { name: "Italian Artisan Couscous (1 lb)", displayName: "Italian Artisan Couscous", category: "Pasta", price: 3.00, desirability: 2.2 },

   // Beverages
   { name: "Mountain Springs Bottled Water (1 liter)", displayName: "Mountain Springs Bottled Water", category: "Beverages", price: 1.25, desirability: 1.1 },
   { name: "Golden Valley Sparkling Water (12 fl oz)", displayName: "Golden Valley Sparkling Water", category: "Beverages", price: 1.50, desirability: 1.2 },
   { name: "Silver Oak Iced Tea (1 liter)", displayName: "Silver Oak Iced Tea", category: "Beverages", price: 2.50, desirability: 1.4 },
   { name: "Green Meadows Apple Juice (64 oz)", displayName: "Green Meadows Apple Juice", category: "Beverages", price: 2.99, desirability: 1.5 },
   { name: "Tropical Breeze Lemonade (1 liter)", displayName: "Tropical Breeze Lemonade", category: "Beverages", price: 3.49, desirability: 1.8 },
   { name: "Pure Valley Orange Juice (64 oz)", displayName: "Pure Valley Orange Juice", category: "Beverages", price: 4.99, desirability: 2 },
   { name: "Fresh Brewed Coffee Beans (8 oz)", displayName: "Fresh Brewed Coffee Beans", category: "Beverages", price: 5.50, desirability: 2.3}
];

let categories = ["Dairy", "Meats", "Vegetables", "Fruits", "Grains", "Pasta", "Beverages"]
let shoppingList = [];
let budget = 0;

aValue = parseInt(localStorage.getItem("myValue"));

function goToNextPage(nextPage)
{
   localStorage.setItem("myValue", aValue);
   window.location.href = nextPage;
   location.replace(nextPage);
}

function convertCurrency(currency)
{
   selectedCurrency = currency.toString();
   updateUI();
   updateBudget();
   updateCart();
   renderStoreItems();
}

function getCurrencySymbol(currency)
{
 let symbols = {
   USD: "$",
   CAD: "C$",
   EUR: "€"
 };

 if (symbols[currency])
 {
   return symbols[currency]
 }
 else
 {
   return "$";
 }
}

function setSpeed(speed)
{
 speedFactor = parseInt(speed);
 let buttons = document.querySelectorAll("button");
 for (let i = 0; i < buttons.length; i++)
 {
   buttons[i].disabled = false;
 }

 let amountInput = document.querySelector(".item-amount");
 amountInput.disabled = false;

 let selector = document.querySelector("#category-selector");
 selector.disabled = false;

 alert("You have chosen a speed of " + speed + ", meaning each second the timer will increment by " + speed + ". Click the OK button when you are ready.");
 startTimer();
  
 let speedButton1 = document.querySelector("#speed-1x");
 let speedButton2 = document.querySelector("#speed-2x");
 let speedButton3 = document.querySelector("#speed-3x");
  
 speedButton1.disabled = true;
 speedButton2.disabled = true;
 speedButton3.disabled = true;
  
 speedButton1.classList.remove("active");
 speedButton2.classList.remove("active");
 speedButton3.classList.remove("active");

 if (speedFactor == 1)
 {
   speedButton1.classList.add("active");
 }
 else if (speedFactor == 2) {
   speedButton2.classList.add("active");
 }
 else if (speedFactor == 3)
 {
   speedButton3.classList.add("active");
 }
}

function generateShoppingList(array)
{
 totalDesirability = 0;
 targetDesirability = 0;

 let category = "";
 shoppingList = [];

 for (let i = 0; i < array.length; i++)
 {
   if (array[i].category == category)
   {
       if (Math.random() < (13/array.length))
       {
           shoppingList[shoppingList.length-1] += 1;
       }
   }
  
   if (array[i].category != category)
   {
       category = array[i].category
       shoppingList[shoppingList.length] = 0;
      
       if (Math.random() < (13/array.length))
       {
           shoppingList[shoppingList.length-1] += 1;
       }
   }
 }
  
 let totalItems = 0;
 let shoppingListContent = "<h3>Your shopping list consists of:</h3><div class='shopping-list-container'>";
  
 for (let i = 0; i < categories.length; i++)
 {
   shoppingListContent += "<p>" + categories[i] + ": " + shoppingList[i] + "</p>";
   totalItems += shoppingList[i];
 }

 shoppingListContent += "</div><p>Total items: " + totalItems + "</p>";
 document.getElementById("shopping-list-content").innerHTML = shoppingListContent;
  
 let minDes = [];
 let maxDes = [];
 let minPrice = [];
 let maxPrice = [];
 category = array[0].category;
 let currentMin = array[0].price;
 let currentMinDes = array[0].desirability;
 let currentMaxDes = array[0].desirability;
 let currentMax = array[0].price;
 let budgetMax = 0;
 let budgetMin = 0;
 let desMin = 0;
 let desMax = 0;

 for (let i = 0; i < array.length; i++)
 {
   if (array[i].category == category)
   {
       if (array[i].price < currentMin)
       {
           currentMin = array[i].price;
       }
      
       if (array[i].price > currentMax)
       {
           currentMax = array[i].price;
       }

       if (array[i].desirability < currentMinDes)
       {
           currentMinDes = array[i].desirability;
       }
       if (array[i].desirability > currentMaxDes)
       {
           currentMaxDes = array[i].desirability;
       }       
     }

     if (array[i].category != category)
     {
       category = array[i].category;
       minPrice.push(currentMin);
       maxPrice.push(currentMax);
       minDes.push(currentMinDes);
       maxDes.push(currentMaxDes);
       currentMin = array[i].price;
       currentMax = array[i].price;
       currentMinDes = array[i].desirability;
       currentMaxDes = array[i].desirability;
     }
 }

 minPrice.push(currentMin);
 maxPrice.push(currentMax);
 minDes.push(currentMinDes);
 maxDes.push(currentMaxDes);

 for (let i = 0; i < minPrice.length; i++)
 {
   budgetMax += maxPrice[i] * shoppingList[i];
   budgetMin += minPrice[i] * shoppingList[i];
   desMax += maxDes[i] * shoppingList[i];
   desMin += minDes[i] * shoppingList[i];
 }

let randomNumber = 0;

 while (Math.sqrt(randomNumber) - randomNumber **1.8 <= 0.25)
 {
   randomNumber = Math.random()*0.8;
   budget = budgetMin + Math.sqrt(randomNumber)*(budgetMax-budgetMin);
   targetDesirability = desMin + randomNumber ** 1.8 * (budgetMax-budgetMin);
   budgetCurrencySymbol.textContent = "$";
   budgetElement.textContent = budget.toFixed(2);
 }
}

function updateCart()
{
 let cartList = '';
 let totalPrice = 0;
 for (let i = 0; i < cart.length; i++)
 {
   let convertedPrice = (cart[i].price * currencyRates[selectedCurrency]).toFixed(2) * cart[i].quantity;
   totalPrice += convertedPrice;
   totalDesirability += cart[i].desirability;
   cartList += "<p> <div class = 'price-div'><span class='cart-item-name'> " + cart[i].name + " x" + cart[i].quantity + "</span> <span class='cart-item-price'>" + getCurrencySymbol(selectedCurrency) + convertedPrice.toFixed(2) + "</span> </div> <button class='remove-item' onclick = 'removeItem(" + i + ")'> Remove </button> </p>";
 }

 totalPrice = Number(totalPrice).toFixed(2);
 cartBox.innerHTML = `
   <h2>Items in Cart</h2>
   ` + cartList + `
   <div class = "price-div"> <p><strong>Total Price:&nbsp;</strong> <span id = "total-price-symbol">` + getCurrencySymbol(selectedCurrency) + `</span> <span id="total-price"> ` + totalPrice + `</span></div> <span id="total-desirability"><strong>Total Desirability:&nbsp;</strong>` + totalDesirability.toFixed(1) + `</span> </p>
   <button id="checkout-button" onclick = "checkout()"> Checkout </button>
 `;
}

function checkout()
{
 let budget = Number(budgetElement.textContent);
 let price = 0;
 totalDesirability = 0;
 let categoryCounts = {};

 for (let i = 0; i < cart.length; i++)
 {
   price += Number(cart[i].price * cart[i].quantity);
   totalDesirability += cart[i].desirability * cart[i].quantity;

   if (!categoryCounts[cart[i].category])
   {
     categoryCounts[cart[i].category] = 0;
   }
   categoryCounts[cart[i].category] += cart[i].quantity;
 }

 function badCart(cart, categories, shoppingList)
 {
   let checker = [];
   for (let i = 0; i < shoppingList.length; i++)
   {
     checker.push(0);
   }

   for (let i = 0; i < cart.length; i++)
   {
     for (let j = 0; j < categories.length; j++)
     {
       if (categories[j] == cart[i].category)
       {
         checker[j] += cart[i].quantity;
       }
     }
   }

   for (let i = 0; i < shoppingList.length; i++)
   {
     if (checker[i] != shoppingList[i])
     {
       return true;
     }
   }
   return false;
 }

 if (price > budget)
 {
   alert("The cost is too much!");
   location.replace('gameOver.html');
 }
 else if (targetDesirability.toFixed(1) > totalDesirability.toFixed(1))
 {
   alert("You failed to meet your mom's desirability requirement! It was " + targetDesirability.toFixed(1) + "and you only had " +  totalDesirability.toFixed(1) + "desirability.");
   location.replace('gameOver.html');
 }
 else if (badCart(cart, categories, shoppingList))
 {
   alert("You did not properly buy what you were asked to buy!");
   location.replace('gameOver.html');
 }
 else
 {
   alert("Congrats! You are within budget and have bought what you were instructed to buy.");
   alert("Your total desirability in the end was: " + totalDesirability.toFixed(1));
   location.replace('gameWin.html');

   let buttons = document.querySelectorAll("button");
   for (let i = 0; i < buttons.length; i++) {
     buttons[i].disabled = true;
   }

   let inputs = document.querySelectorAll("input");
   for (let i = 0; i < inputs.length; i++) {
     inputs[i].disabled = true;
   }
 }
}

function removeItem(index)
{
 cart.splice(index, 1);
 updateCart();
}

function renderStoreItems()
{
 storeItemsContainer.innerHTML = "";
 let item = items[currentIndex];

 let storeItemHTML = `
   <div class="store-item">
     <div class="item-content">
       <h3 class="item-name">` + item.name + `<span class="quantity-display"></span></h3>
       <p class="item-price" data-price="` + item.price + `">` + getCurrencySymbol(selectedCurrency) + (item.price*currencyRates[selectedCurrency]).toFixed(2) + `</p>
       <input type="number" class="item-amount" placeholder="Enter amount" min="1"></input>
       <button onclick = "addToCart()" class="add-to-cart">Add to Cart</button>
     </div>
   </div>
 `;

 document.getElementById("item-desirability").textContent = "Desirability: "+ item.desirability.toFixed(1);
 document.getElementById("item-name").textContent = "Item: "+ item.name;
 storeItemsContainer.innerHTML = storeItemHTML;
 let amountInput = document.querySelector('.item-amount');
 let quantityDisplay = document.querySelector('.quantity-display');

 amountInput.addEventListener('input', function () {
   let quantity = parseInt(amountInput.value);
   if (amountInput.value < 1)
   {
     quantityDisplay.textContent = "";
   }
   else
   {
     quantityDisplay.textContent = " x" + quantity;
   }
 });
}

function switchToCategory(name)
{
 currentIndex = 0;
 categoryName = name.value;

 while (items[currentIndex].category != categoryName)
 {
   rightButton();
 }

 updateUI();
}

function updateUI() {
 const buttons = [usdButton, cadButton, eurButton];
   for (let i = 0; i < buttons.length; i++)
   {
     if (buttons[i].classList.contains('active'))
     {
       buttons[i].classList.remove('active');
     }
   }
  
   if (selectedCurrency === 'USD')
   {
     usdButton.classList.add('active');
   }
   else if (selectedCurrency === 'CAD')
   {
     cadButton.classList.add('active');
   }
   else if (selectedCurrency === 'EUR')
   {
     eurButton.classList.add('active');
   }
 updateCart();
 renderStoreItems();
}

function addToCart()
{
 let amountInput = document.querySelector('.item-amount');
 let item = items[Number(currentIndex)];
 let quantityDisplay = document.querySelector('.quantity-display');
 let quantity = Number(amountInput.value);

 if (amountInput.value.length == 0|| quantity <= 0 || quantity%1 != 0)
 {
   alert("Please enter a valid quantity.");
   return;
 }

 let finalDesirability = item.desirability * quantity;
 let existingCartItem = undefined;
 let category = item.category;

 for (let i = 0; i < cart.length; i++)
 {
   if (cart[i].name === item.name)
   {
     existingCartItem = cart[i]; 
     break;
   }
 }

 if (existingCartItem !== undefined)
 {
   existingCartItem.quantity += quantity;
   existingCartItem.desirability += finalDesirability;
 }
 else
 {
   cart.push({ name: item.displayName, quantity: quantity, price: item.price, desirability: finalDesirability, category: category});
 }

 updateCart();
 amountInput.value = "";
 quantityDisplay.textContent = "";
}

function getCurrencySymbol(currency)
{
 let symbols = {
   USD: "$",
   CAD: "C$",
   EUR: "€"
 };

 if (!symbols[currency])
 {
   return "$";
 }

 return symbols[currency];
}

function startTimer()
{
   let updateDisplay = function () {
   let minutes = Math.floor(remainingTime / 60);
   let seconds = remainingTime % 60;

   if (seconds < 10)
   {
     timerDisplay.textContent = minutes + ":0" + seconds;
   }
   else
   {
     timerDisplay.textContent = minutes + ":" + seconds;
   }
 };

 updateDisplay();
  let timerInterval = setInterval(function () {
   remainingTime -= speedFactor;
   if (remainingTime <= 0)
   {
     remainingTime = 0;
     clearInterval(timerInterval);
     endGame();
   }
   updateDisplay();
 }, 1000);
}

function endGame()
{
 alert("Game Over");
 location.replace('gameOver.html');

 let buttons = document.querySelectorAll("button");
 for (let i = 0; i < buttons.length; i++)
 {
   buttons[i].disabled = true;
 }

 let inputs = document.querySelectorAll("input");
 for (let i = 0; i < inputs.length; i++)
 {
   inputs[i].disabled = true;
 }

 let selector = document.querySelector("#category-selector");
 selector.disabled = true;
}

function leftButton()
{
 currentIndex = (currentIndex - 1 + items.length) % items.length;
 renderStoreItems();
}

function rightButton ()
{
 currentIndex = (currentIndex + 1) % items.length;
 renderStoreItems();
}

function updateBudget()
{
  let convertedBudget = budget * currencyRates[selectedCurrency];
  budgetCurrencySymbol.textContent = getCurrencySymbol(selectedCurrency);
  budgetElement.textContent = convertedBudget.toFixed(2);
}

function randomizePricesAndDesirability()
{
 const range = 0.2;
 let change = 0;
  
 for (let i = 0; i < items.length; i++)
 {
   change = (Math.random() * 2 * range) - range;
   items[i].price += Number((items[i].price * change).toFixed(2));
   items[i].desirability += Number((items[i].desirability * change).toFixed(1));
 }
}

function openNewTab()
{
   alert("The timer will not stop while you're on the instructions tab!");
   window.open("budgetInstructions.html", "_blank");  
}

document.addEventListener("DOMContentLoaded", function () {
 randomizePricesAndDesirability();
 generateShoppingList(items);
 updateUI();

 cartBox.innerHTML = `
   <h2>Items in Cart</h2>
   <div class = "price-div"> <p><strong>Total Price:&nbsp;</strong> <span id = "total-price-symbol">` + getCurrencySymbol(selectedCurrency) + `</span> <span id="total-price"> ` + totalPrice + `</span></div> <span id="total-desirability"><strong>Total Desirability:&nbsp;</strong>` + totalDesirability.toFixed(1) + `</span> </p>
   <button id="checkout-button" onclick = "checkout()"> Checkout </button>
 `;
 
 alert("Please select a speed to start the game");
 document.querySelector("#usd-button").classList.add("active");

 let buttons = document.querySelectorAll("button");
 for (let i = 0; i < buttons.length; i++)
 {
   buttons[i].disabled = true;
 }
  
 let categorySelector = document.querySelector("#category-selector");
 categorySelector.disabled = true;
 
 let amountInput = document.querySelector(".item-amount");
 amountInput.disabled = true;
 
 let speedButton1 = document.querySelector("#speed-1x");
 let speedButton2 = document.querySelector("#speed-2x");
 let speedButton3 = document.querySelector("#speed-3x");

 speedButton1.disabled = false;
 speedButton2.disabled = false;
 speedButton3.disabled = false;
});


renderStoreItems();
