'use strict';


//---------//
// Imports //
//---------//

const fp = require('lodash/fp');

const { pResolve } = require('../../lib/utils');


//------//
// Init //
//------//

const getFrom = fp.get.convert({ rearg: false });

const restOfUrlToResult = {
  categories: getCategories()
  , cuisines: getCuisines()
  , establishments: getEstablishments()
};


//------//
// Main //
//------//

const requestFromApi = fp.flow( // takes a string 'restOfUrl'
  getFrom(restOfUrlToResult)
  , pResolve
);


//-------------//
// Helper Fxns //
//-------------//

function getCategories() {
  return {
    "categories": [
      {
        "categories": {
          "id": 1,
          "name": "Delivery"
        }
      },
      {
        "categories": {
          "id": 2,
          "name": "Dine-out"
        }
      },
      {
        "categories": {
          "id": 3,
          "name": "Nightlife"
        }
      },
      {
        "categories": {
          "id": 4,
          "name": "Catching-up"
        }
      },
      {
        "categories": {
          "id": 5,
          "name": "Takeaway"
        }
      },
      {
        "categories": {
          "id": 6,
          "name": "Cafes"
        }
      },
      {
        "categories": {
          "id": 7,
          "name": "Daily Menus"
        }
      },
      {
        "categories": {
          "id": 8,
          "name": "Breakfast"
        }
      },
      {
        "categories": {
          "id": 9,
          "name": "Lunch"
        }
      },
      {
        "categories": {
          "id": 10,
          "name": "Dinner"
        }
      },
      {
        "categories": {
          "id": 11,
          "name": "Pubs & Bars"
        }
      },
      {
        "categories": {
          "id": 13,
          "name": "Pocket Friendly Delivery"
        }
      },
      {
        "categories": {
          "id": 14,
          "name": "Clubs & Lounges"
        }
      }
    ]
  };
}

function getCuisines() {
  return {
    "cuisines": [
      {
        "cuisine": {
          "cuisine_id": 6,
          "cuisine_name": "Afghani"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 152,
          "cuisine_name": "African"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 1,
          "cuisine_name": "American"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 151,
          "cuisine_name": "Argentine"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 3,
          "cuisine_name": "Asian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 193,
          "cuisine_name": "BBQ"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 5,
          "cuisine_name": "Bakery"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 227,
          "cuisine_name": "Bar Food"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 270,
          "cuisine_name": "Beverages"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 159,
          "cuisine_name": "Brazilian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 182,
          "cuisine_name": "Breakfast"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 133,
          "cuisine_name": "British"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 247,
          "cuisine_name": "Bubble Tea"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 168,
          "cuisine_name": "Burger"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 30,
          "cuisine_name": "Cafe"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 491,
          "cuisine_name": "Cajun"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 956,
          "cuisine_name": "California"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 121,
          "cuisine_name": "Cantonese"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 158,
          "cuisine_name": "Caribbean"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 971,
          "cuisine_name": "Chili"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 25,
          "cuisine_name": "Chinese"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 161,
          "cuisine_name": "Coffee and Tea"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 928,
          "cuisine_name": "Creole"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 153,
          "cuisine_name": "Cuban"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 192,
          "cuisine_name": "Deli"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 100,
          "cuisine_name": "Desserts"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 411,
          "cuisine_name": "Dim Sum"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 541,
          "cuisine_name": "Diner"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 959,
          "cuisine_name": "Donuts"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 651,
          "cuisine_name": "Eastern European"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 149,
          "cuisine_name": "Ethiopian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 38,
          "cuisine_name": "European"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 40,
          "cuisine_name": "Fast Food"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 298,
          "cuisine_name": "Fish and Chips"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 45,
          "cuisine_name": "French"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 501,
          "cuisine_name": "Frozen Yogurt"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 274,
          "cuisine_name": "Fusion"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 134,
          "cuisine_name": "German"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 156,
          "cuisine_name": "Greek"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 521,
          "cuisine_name": "Hawaiian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 143,
          "cuisine_name": "Healthy Food"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 233,
          "cuisine_name": "Ice Cream"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 148,
          "cuisine_name": "Indian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 154,
          "cuisine_name": "International"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 135,
          "cuisine_name": "Irish"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 218,
          "cuisine_name": "Israeli"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 55,
          "cuisine_name": "Italian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 207,
          "cuisine_name": "Jamaican"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 60,
          "cuisine_name": "Japanese"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 164,
          "cuisine_name": "Juices"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 67,
          "cuisine_name": "Korean"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 901,
          "cuisine_name": "Laotian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 136,
          "cuisine_name": "Latin American"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 66,
          "cuisine_name": "Lebanese"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 70,
          "cuisine_name": "Mediterranean"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 73,
          "cuisine_name": "Mexican"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 137,
          "cuisine_name": "Middle Eastern"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 996,
          "cuisine_name": "New American"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 963,
          "cuisine_name": "Pacific Northwest"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 139,
          "cuisine_name": "Pakistani"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 82,
          "cuisine_name": "Pizza"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 219,
          "cuisine_name": "Polish"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 87,
          "cuisine_name": "Portuguese"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 983,
          "cuisine_name": "Pub Food"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 320,
          "cuisine_name": "Ramen"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 84,
          "cuisine_name": "Russian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 304,
          "cuisine_name": "Sandwich"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 83,
          "cuisine_name": "Seafood"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 461,
          "cuisine_name": "Soul Food"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 471,
          "cuisine_name": "Southern"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 921,
          "cuisine_name": "Southern American"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 966,
          "cuisine_name": "Southwestern"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 89,
          "cuisine_name": "Spanish"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 141,
          "cuisine_name": "Steak"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 177,
          "cuisine_name": "Sushi"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 997,
          "cuisine_name": "Taco"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 190,
          "cuisine_name": "Taiwanese"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 179,
          "cuisine_name": "Tapas"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 163,
          "cuisine_name": "Tea"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 964,
          "cuisine_name": "Teriyaki"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 150,
          "cuisine_name": "Tex-Mex"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 95,
          "cuisine_name": "Thai"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 142,
          "cuisine_name": "Turkish"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 308,
          "cuisine_name": "Vegetarian"
        }
      },
      {
        "cuisine": {
          "cuisine_id": 99,
          "cuisine_name": "Vietnamese"
        }
      }
    ]
  };
}

function getEstablishments() {
  return {
    "establishments": [
      {
        "establishment": {
          "id": 281,
          "name": "Fast Food"
        }
      },
      {
        "establishment": {
          "id": 31,
          "name": "Bakery"
        }
      },
      {
        "establishment": {
          "id": 1,
          "name": "Café"
        }
      },
      {
        "establishment": {
          "id": 16,
          "name": "Casual Dining"
        }
      },
      {
        "establishment": {
          "id": 278,
          "name": "Wine Bar"
        }
      },
      {
        "establishment": {
          "id": 21,
          "name": "Quick Bites"
        }
      },
      {
        "establishment": {
          "id": 6,
          "name": "Pub"
        }
      },
      {
        "establishment": {
          "id": 285,
          "name": "Fast Casual"
        }
      },
      {
        "establishment": {
          "id": 18,
          "name": "Fine Dining"
        }
      },
      {
        "establishment": {
          "id": 81,
          "name": "Food Truck"
        }
      },
      {
        "establishment": {
          "id": 91,
          "name": "Bistro"
        }
      },
      {
        "establishment": {
          "id": 24,
          "name": "Deli"
        }
      },
      {
        "establishment": {
          "id": 275,
          "name": "Pizzeria"
        }
      },
      {
        "establishment": {
          "id": 23,
          "name": "Dessert Parlour"
        }
      },
      {
        "establishment": {
          "id": 283,
          "name": "Brewery"
        }
      },
      {
        "establishment": {
          "id": 295,
          "name": "Noodle Shop"
        }
      },
      {
        "establishment": {
          "id": 101,
          "name": "Diner"
        }
      },
      {
        "establishment": {
          "id": 7,
          "name": "Bar"
        }
      },
      {
        "establishment": {
          "id": 286,
          "name": "Coffee Shop"
        }
      },
      {
        "establishment": {
          "id": 161,
          "name": "Microbrewery"
        }
      },
      {
        "establishment": {
          "id": 271,
          "name": "Sandwich Shop"
        }
      },
      {
        "establishment": {
          "id": 5,
          "name": "Lounge"
        }
      },
      {
        "establishment": {
          "id": 272,
          "name": "Cocktail Bar"
        }
      },
      {
        "establishment": {
          "id": 284,
          "name": "Juice Bar"
        }
      },
      {
        "establishment": {
          "id": 292,
          "name": "Beer Garden"
        }
      }
    ]
  };
}


//---------//
// Exports //
//---------//

module.exports = requestFromApi;
