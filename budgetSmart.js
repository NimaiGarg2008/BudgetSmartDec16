// Defined so we can put HTML into them to display in the output
let cartBox = document.querySelector('.itemsInCartBox');
let budgetElement = document.querySelector("#budget"); 
let budgetCurrencySymbol = document.querySelector("#budget-currency-symbol");
let timerDisplay = document.querySelector("#timer");
let storeItemsContainer = document.getElementById("store-items-container");

// Defined so we can disable these buttons when necessary
const usdButton = document.getElementById("usd-button");
const cadButton = document.getElementById("cad-button");
const eurButton = document.getElementById("eur-button");

// Defined to be used/changed in functions and overall for game usage
let totalPrice = 0;
let currentIndex = 0;
let targetDesirability = 0;
let cart = [];
let selectedCurrency = 'USD';
let selectedSpeed = '1x';
let remainingTime = 180;
let speedFactor = 1;
let currencyRates = { USD: 1, CAD: 1.42, EUR: 0.95 };
let timerInterval;

/* Our list of items that the user can buy with various information about each item. Items include in the range of 
   Dairy, Meats, Vegetables, Fruits, Grains, Pasta, Beverages. */
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
      { name: "Nature's Choice Premium Oats (1 lb)", displayName: "Nature's Choice Premium Oats", category: "Grains", price: 2.75, desirability: 2.1},
      { name: "Scarlet River Organic Barley(1 lb)", displayName: "Scarlet River Organic Barley", category: "Grains", price: 3.20, desirability: 3 },
      { name: "Pure Harvest Brown Rice (2 lbs)", displayName: "Pure Harvest Brown Rice", category: "Grains", price: 3.50, desirability: 3.4 },
      { name: "Golden Valley Quinoa Seeds (1 lb)", displayName: "Golden Valley Quinoa Seeds", category: "Grains", price: 4.00, desirability: 3.8 },

      // Pasta
      { name: "Harvest Wheat Fusilli Pasta (12 oz)", displayName: "Harvest Wheat Fusilli Pasta", category: "Pasta", price: 1.10, desirability: 1.5 },
      { name: "Classic Italian Spaghetti (1 lb)", displayName: "Classic Italian Spaghetti", category: "Pasta", price: 1.30, desirability: 1.6 },
      { name: "Silver Oak Penne Pasta (1 lb)", displayName: "Silver Oak Penne Pasta", category: "Pasta", price: 1.50, desirability: 1.7 },
      { name: "Golden Harvest Couscous (1 lb)", displayName: "Golden Harvest Couscous", category: "Pasta", price: 2.25, desirability: 1.9 },
      { name: "Italian Artisan Couscous (1 lb)", displayName: "Italian Artisan Couscous", category: "Pasta", price: 2.75, desirability: 2.2 },

      // Beverages
      { name: "Mountain Springs Bottled Water (1 liter)", displayName: "Mountain Springs Bottled Water", category: "Beverages", price: 1.35, desirability: 1.1 },
      { name: "Golden Valley Sparkling Water (12 fl oz)", displayName: "Golden Valley Sparkling Water", category: "Beverages", price: 1.75, desirability: 1.2 },
      { name: "Silver Oak Iced Tea (1 liter)", displayName: "Silver Oak Iced Tea", category: "Beverages", price: 2.50, desirability: 1.4 },
      { name: "Green Meadows Apple Juice (64 oz)", displayName: "Green Meadows Apple Juice", category: "Beverages", price: 2.99, desirability: 1.5 },
      { name: "Tropical Breeze Lemonade (1 liter)", displayName: "Tropical Breeze Lemonade", category: "Beverages", price: 3.49, desirability: 1.8 },
      { name: "Pure Valley Orange Juice (64 oz)", displayName: "Pure Valley Orange Juice", category: "Beverages", price: 4.99, desirability: 2 },
      { name: "Fresh Brewed Coffee Beans (8 oz)", displayName: "Fresh Brewed Coffee Beans", category: "Beverages", price: 5.50, desirability: 2.3}
];

/* Our list of the different categories the items can be in (Dairy, Meats, Vegetables, Fruits,
   Grains, Pasta, Beverages) */
let categories = ["Dairy", "Meats", "Vegetables", "Fruits", "Grains", "Pasta", "Beverages"];

// Empty values that will be assigned a semi-random value when starting the game
let shoppingList = []; // Random Shopping List for the user
let budget = 0; // Random budget for the user

// Function called when a button changing the page is called
function goToNextPage(nextPage)
{
      location.replace(nextPage);
}

/* This function changes the currency (between USD, CAD, and EUR), and then updates all the necessary HTMLs that 
   include monetary values which will change due to this change in currency */
function convertCurrency(currency)
{
      selectedCurrency = currency.toString();
      updateUI();
      updateBudget();
      updateCart();
      renderStoreItems();
}

/* When the currency is changed, we call this function to get the correct currency symbol for whenever we display a 
   currency symbol in the changing HTML */
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

/* This function moves the user to the instructions tab, and clarifies that the timer WILL continue running when they  
   are no longer on the page */
function openNewTab()
{
      alert("The timer will not stop while you're on the instructions tab!");
      window.open("budgetInstructions.html", "_blank");  
}

function setSpeed(speed)
{
      speedFactor = parseInt(speed); // Speed is either 1x, 2x, or 3x, so we parseInt it to get the value
      let buttons = document.querySelectorAll("button");
      for (let i = 0; i < buttons.length; i++)
      {
            buttons[i].disabled = false;
      }

      let amountInput = document.querySelector(".item-amount");
      amountInput.disabled = false;
      let selector = document.querySelector("#category-selector");
      selector.disabled = false;

      // Re-enables all input fields, buttons, and select fields
      alert("You have chosen a speed of " + speed + ", meaning each second the timer will decrement by " + speed + ". Click the OK button when you are ready.");
      startTimer();

      /* Gives the user time to get ready, and when they are ready, they will close the alert field. After this, 
         the timer will start */
      let speedButton1 = document.querySelector("#speed-1x");
      let speedButton2 = document.querySelector("#speed-2x");
      let speedButton3 = document.querySelector("#speed-3x");

      speedButton1.disabled = true;
      speedButton2.disabled = true;
      speedButton3.disabled = true;

      speedButton1.classList.remove("active");
      speedButton2.classList.remove("active");
      speedButton3.classList.remove("active");

      /* Disables all the buttons that modify speed, so the speed can not be changed mid-game. After this, it marks
         the speed button that was selected as “active”, which gives it a different styling so the user knows which 
         one they chose */
      if (speedFactor == 1)
      {
            speedButton1.classList.add("active");
      }
      else if (speedFactor == 2)
      {
            speedButton2.classList.add("active");
      }
      else if (speedFactor == 3)
      {
            speedButton3.classList.add("active");
      }
}

/* This is a standard timer-setting function in JavaScript, where the “, 1000” means that it will run once every 1000 milliseconds, or 1 second.
   Each second we will deduct the speed that the user wanted to use. When the remaining time reaches 0, we end the game due to time running out.
   Otherwise, we keep calling the update display function */
function startTimer()
{
      updateDisplay();
      let timerInterval = setInterval(function ()
      {
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

function generateShoppingList(array)
{
      let category = "";
      shoppingList = [];

      /* For every item in the array with a matching category as the current category(this makes sure that the count is split by category),
         there is a 13/array length chance for another item to be added to the shopping list, and this makes the average amount of items in the
         shopping list 13 no matter the length of the array, as long as the array is at least of length 13 */
      for (let i = 0; i < array.length; i++)
      {
            // If the specific item's category matches the category variable
            if (array[i].category == category)
            {
                  if (Math.random() < (13/array.length))
                  {
                        shoppingList[shoppingList.length-1] += 1;
                  }
            }
            
            // If the specific item's category does not match the category variable
            if (array[i].category != category)
            {
                  /* When we have moved on to the next category, a new index will be created in the shopping list array, 
                     and there will still be the chance of a new item being added */
                  category = array[i].category
                  shoppingList[shoppingList.length] = 0;
                  if (Math.random() < (13/array.length))
                  {
                        shoppingList[shoppingList.length-1] += 1;
                  }
            }
      }

      // Prepares the html that is going to display the shopping list
      let totalItems = 0;
      let shoppingListContent = "<h3>Your shopping list consists of:</h3><div class='shopping-list-container'>";

      /* For every index of the shopping list, a new line will be added to the html with information about how much they need to buy,
         also keeps track of the total items in the shopping list */
      for (let i = 0; i < categories.length; i++)
      {
            shoppingListContent += "<p>" + categories[i] + ": " + shoppingList[i] + "</p>";
            totalItems += shoppingList[i]; 
      }

      /* Adds the finishing touch to the html, inserts the html, and then calls the next function while passing the same array through,
         to make sure we are using the same array. */
      shoppingListContent += "</div><p>Total items: " + totalItems + "</p>";
      document.getElementById("shopping-list-content").innerHTML = shoppingListContent;
      genBudgetAndDesirability(array);
}

function genBudgetAndDesirability(array)
{
      // Defines a bunch of starting indexes/arrays/variables that we will fill up
      let minDes = [];
      let maxDes = [];
      let minPrice = [];
      let maxPrice = [];
      let budgetMax = 0;
      let budgetMin = 0;
      let desMin = 0;
      let desMax = 0;

      // Initializing the targetDesirability to be filled with
      targetDesirability = 0;

      // Starts all the values with the first index of array, so we don’t skip the first item
      category = array[0].category;
      let currentMin = array[0].price;
      let currentMinDes = array[0].desirability;
      let currentMaxDes = array[0].desirability;
      let currentMax = array[0].price;

      for (let i = 0; i < array.length; i++)
      {
            /* The same category checking logic is used to make sure we split the values by category. Then,
               if the desirability/price is above the max/below the min, then we update the max/min of said value */
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

            /* When we hit a new category, all the values are inserted into the array and we start again 
	       with the first values */
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

      // Adds the last values for the last category
      minPrice.push(currentMin);
      maxPrice.push(currentMax);
      minDes.push(currentMinDes);
      maxDes.push(currentMaxDes);

      // Calculates minimum possible and maximum possible budget/desirability
      for (let i = 0; i < minPrice.length; i++)
      {
            budgetMax += maxPrice[i] * shoppingList[i];
            budgetMin += minPrice[i] * shoppingList[i];
            desMax += maxDes[i] * shoppingList[i];
            desMin += minDes[i] * shoppingList[i];
      }

      // Makes sure the while loop kicks in
      let randomNumber = 0; 

      /* This while loop makes sure that the multiplier for budget is at least 0.25 higher than the multiplier 
         for the desirability to make both goals achievable */
      while (Math.sqrt(randomNumber) - randomNumber **1.8 <= 0.25)
      {
            // Multiplies the random number by 0.8 to make sure it is not too high, so it isn’t too easy
            randomNumber = Math.random()*0.8;

            /* Square rooting the decimal makes it a larger number, and then we add that portion of “extra budget”
	       to the minimum */
            budget = budgetMin + Math.sqrt(randomNumber)*(budgetMax-budgetMin);

            // Taking the 1.8th power of the SAME random number, and this makes it slightly lower
            targetDesirability = desMin + randomNumber ** 1.8 * (desMax-desMin);

            /* Default currency is USD, so we use “$”, and then we update the budget value in the html. The
               target desirability is kept hidden to make sure that the user tries their best to maximize desirability */
            budgetCurrencySymbol.textContent = "$";
            budgetElement.textContent = budget.toFixed(2);
      }
}

/* This function randomizes every desirability and price value of each item in the possible items in the store, so
   that every time you play the game it is likely something will be different. The price and desirability are both adjusted together,
   so the values still make sense in respect to each other. The values can be adjusted up or down, up to 20% higher or lower. */
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

// This function adjusts the budget value to whatever currency was selected, and is called when a new currency is selected
function updateBudget()
{
      let convertedBudget = budget * currencyRates[selectedCurrency];
      budgetCurrencySymbol.textContent = getCurrencySymbol(selectedCurrency);
      budgetElement.textContent = convertedBudget.toFixed(2);
}

// This function allows for the user to add to the cart of the specific item they want
function addToCart()
{
      /* Makes sure that we are on the correct index, defines an input field and a part of the HTML
         field in the middle of the top row which we will later empty */
      let amountInput = document.querySelector('.item-amount');
      let item = items[Number(currentIndex)];
      let quantityDisplay = document.querySelector('.quantity-display');
      let quantity = Number(amountInput.value);

      // Makes sure that the quantity is a valid amount (Must be a positive, whole number)
      if (amountInput.value.length == 0|| quantity <= 0 || quantity%1 != 0)
      {
            alert("Please enter a valid quantity.");
            return;
      }

      /* Defines a couple variables: existing cart item is first undefined so if we can’t find a
         matching value it will not trigger the if statement */
      let finalDesirability = item.desirability * quantity;
      let existingCartItem = undefined;
      let category = item.category;

      // If an existing cart item exists, it will assign that value to this variable 
      for (let i = 0; i < cart.length; i++)
      {
            if (cart[i].name === item.displayName)
            {
                  existingCartItem = cart[i]; 
                  break;
            }
      }

      if (existingCartItem !== undefined)
      {
            /* If an existing cart item exists, we will change the quantity and final desirability values.
               Other values will be the same even if the user buys more so we do not need to add them. We do this so
               the cart doesn’t have too many things and same things will stack */
            existingCartItem.quantity += quantity;
            existingCartItem.desirability += finalDesirability;
      }
      else
      {
            // If an existing cart item doesn’t exist, then we make one, filling in the values
            cart.push({ name: item.displayName, quantity: quantity, price: item.price, desirability: finalDesirability,
			category: category});
      }

      /* Empties the quantity and input field, because it wouldn’t make sense to keep the input field across different items. Also
         calls the update cart function which will update the cart html to reflect the new addition to the cart */
      updateCart();
      amountInput.value = "";
      quantityDisplay.textContent = "";
}

function updateCart()
{
      // Empty values that will be updated later
      let cartList = '';
      let totalPrice = 0;
      let desirability = 0;

      /* For every element in the “cart” object array (which is an array of what the user has put in their cart/plans to buy),
         we add the price of it (converted to whatever currency has been selected), and the desirability of it. Finally, the
	 HTML is updated to include each item in the cart */
      for (let i = 0; i < cart.length; i++)
      {
            let convertedPrice = (cart[i].price * currencyRates[selectedCurrency]).toFixed(2) * cart[i].quantity;
            totalPrice += convertedPrice;
            desirability += cart[i].desirability ;
            cartList += "<p> <div class = 'price-div'><span class='cart-item-name'> " + cart[i].name + " x" + 
			cart[i].quantity + "</span> <span class='cart-item-price'>" + getCurrencySymbol(selectedCurrency) + 
			convertedPrice.toFixed(2) + 
			"</span> </div> <button class='remove-item' onclick = 'removeItem(" + i + ")'> Remove </button> </p>";
      }

      // Round the total price so it looks like a currency value
      totalPrice = Number(totalPrice).toFixed(2);

      // Enters the previous HTML with the new Total Price and new Total Desirability value after adding an item.
	cartBox.innerHTML = `
            <h2>Items in Cart</h2>
            ` + cartList + `
            <div class="price-div">
                  <p>
                        <strong>Total Price:&nbsp;</strong>
                        <span id="total-price-symbol">
                              ` + getCurrencySymbol(selectedCurrency) + `
                        </span>

                        <span id="total-price">
                              ` + totalPrice + `
                        </span>
                  </p>
            </div>

            <span id="total-desirability">
                  <strong>Total Desirability:&nbsp;</strong>
                  ` + desirability.toFixed(1) + `
            </span>
            <br>
            <button id="checkout-button" onclick="checkout()">Checkout</button>
      `;
}

/* Removes an item at the index passed in. Cart.splice requires 2 integer values, x and y,
   and it removes y elements starting at index x */
function removeItem(index)
{
      cart.splice(index, 1);
      updateCart();
}

function renderStoreItems()
{
      /* Current index is the index that the user is looking at, which determines which item they are viewing.
         This makes sure to select and display the correct index */
      storeItemsContainer.innerHTML = "";
      let item = items[currentIndex];

      /* This HTML provides the user with the name and price of the item they are looking at and provides a button
	 they can click to add it to the cart */
      let storeItemHTML = `
            <div class="store-item">
                  <div class="item-content">
                        <h3 class="item-name">` + item.name + `<span class="quantity-display"></span></h3>
                        <p class="item-price" data-price="` + item.price + `">` + getCurrencySymbol(selectedCurrency)
                              + (item.price*currencyRates[selectedCurrency]).toFixed(2) + `</p>
                        <input type="number" class="item-amount" placeholder="Enter amount" min="1"></input>
                        <button onclick = "addToCart()" class="add-to-cart">Add to Cart</button>
                  </div>
            </div>
      `;

      // This updates a box in the bottom row that displays the desirability of the current selected item and its name
      document.getElementById("item-desirability").textContent = "Desirability: "+ item.desirability.toFixed(1);
      document.getElementById("item-name").textContent = "Item: "+ item.name;

      // Puts the generated HTML snippet into the webpage
      storeItemsContainer.innerHTML = storeItemHTML;

      let amountInput = document.querySelector('.item-amount');
      let quantityDisplay = document.querySelector('.quantity-display');
      
      // This event listener updates some of the HTML if an input is given (it shows how much you are about to buy)
      amountInput.addEventListener('input', function ()
      {
            let quantity = parseInt(amountInput.value);
            if (amountInput.value < 1)
            {
                  quantityDisplay.textContent ="";
            }
            else
            {
                  quantityDisplay.textContent = " x" + quantity;
            }
      });
}

/* These two functions move the index forward/backward by one, and wrapping around in the case
   that they try to go too far in one direction */
function leftButton()
{
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      renderStoreItems();
}

function rightButton()
{
      currentIndex = (currentIndex + 1) % items.length;
      renderStoreItems();
}

/* This defines a function that will display the timer. It makes sure that the timer is displayed as
   how one would expect it to be displayed as, with an extra 0 if the seconds value is below 10. */
function updateDisplay()
{
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
}

function switchToCategory(name)
{
      currentIndex = 0;
      categoryName = name.value;

      /* Called when a category is selected from a dropdown menu, and it starts from the front and keeps 
	 scrolling items until it reaches the category the user wants */
      while (items[currentIndex].category != categoryName)
      {
            rightButton();
      }
      updateUI();
}

/* This function makes sure the correct currency button is labeled as active (and styled as so) and then
   re-calls all the necessary functions which will refresh the HTML to use the currency currency symbol/conversion rate */
function updateUI()
{
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

// This function checks if the user's cart once clicked on the checkout button, if the cart matches the shoppingList or not.
function badCart(cart, categories, shoppingList)
{
      // Creates an empty array, which will be checked against the shopping list array
      let checker = [];

      // First, make sure the length of this array is correct. This is necessary because sometimes some indexes in the shopping list array will be 0
      for (let i = 0; i < shoppingList.length; i++)
      {
            checker.push(0);
      }

      /* For each element in the cart object array, we add 1 to the index of checker that corresponds
         to the index of categories that contains the category of said cart element */
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

      /* Makes sure that the checker array that is generated off of what is in the cart array is the same as the
         shopping list array, as this would mean that the user correctly bought what they were asked to by the shopping list array */
      for (let i = 0; i < shoppingList.length; i++)
      {
            if (checker[i] != shoppingList[i])
            {
                  return true;
            }
      }
      return false;
}

// This function is for when the user clicks on checkout and provides the user the end result and context of how they did
function checkout()
{
      // Sets up some variables
      let budget = Number(budgetElement.textContent);
      let price = 0;
      let totalDesirability = 0;

      // Calculates the total price and desirability of the items in the cart
      for (let i = 0; i < cart.length; i++)
      {
            price += Number(cart[i].price * cart[i].quantity);
            totalDesirability += cart[i].desirability;
      }

      // First checks to make sure the user was within budget
      if (price > budget)
      {
            alert("The cost is too much!");
            location.replace('gameOver.html');
      }
      // Secondly checks if the user bought the correct items using the above badCart function
      else if (badCart(cart, categories, shoppingList))
      {
            alert("You did not properly buy what you were asked to buy! Your mom is now dissatisfied.");
            location.replace('gameOver.html');
      }
      /* Finally, check to make sure the user has enough desirability. If they didn’t, they are told
         their desirability and what they were supposed to get */
      else if (targetDesirability.toFixed(1) > totalDesirability.toFixed(1))
      {
            alert("You failed to satisfy your mom. Her desirability requirement was! It was " + targetDesirability.toFixed(1) + 
			" and you only had " +  totalDesirability.toFixed(1) + " desirability.");
            location.replace('gameOver.html');
      }
      // If none of the conditions are true, then the user has completed the game successfully.
      else
      {
            alert("Congrats! You are within budget and have bought what you were instructed to buy. Your mom is satisified");

            // Tells them how much they beat the target by (the more the better)
            alert("Your total desirability in the end was: " + totalDesirability.toFixed(1) + 
			". For reference, your mom's desirability requirement was " + targetDesirability.toFixed(1) + ".");
            
            location.replace('gameWin.html');

            // Disables all buttons just in case something goes wrong
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
      }
}

/* This function tells the user that the time is up, moves them to a different screen, and just in case
   disables all the other buttons so they can manually navigate to a new page in the event of an error */
function endGame()
{
      alert("Time is up!");
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

/* This is the function that is called as soon as the user enters the page. This function loads all
   the content within the "budgetSmart.html" page and runs the code below */
document.addEventListener("DOMContentLoaded", function ()
{
      randomizePricesAndDesirability();
      generateShoppingList(items);
      updateUI();

      /* This HTML shows the cart as initially empty, and loads the checkout button as well as a 0 
	 total price current desirability. &nbsp; = non-breaking space */
      cartBox.innerHTML = `
            <h2>Items in Cart</h2>
            <div class="price-div">
                  <p>
                        <strong>Total Price:&nbsp;</strong>
                        <span id="total-price-symbol">
                              ` + getCurrencySymbol(selectedCurrency) + `
                        </span>

                        <span id="total-price">
                              ` + totalPrice + `
                        </span>
                  </p>
            </div>

            <span id="total-desirability">
                  <strong>Total Desirability:&nbsp;</strong>
                  0.0
     	    </span>
            <br>
            <button id="checkout-button" onclick="checkout()">Checkout</button>
      `;

      document.querySelector("#usd-button").classList.add("active");

      /* Disables all inputs, selectors, and buttons EXCEPT the speed buttons, which one must be clicked in 
	 order to properly start the game. */
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

      alert("Please select a speed to start the game");
});

renderStoreItems();
