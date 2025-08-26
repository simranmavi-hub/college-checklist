// Item model: string or { name:'Greek yogurt', hp:true }
const DATA = [
  {cat:'home', section:'Essentials & Documents', items:[
    'Student ID', "Driver's license / Passport", 'Lease agreement (copies)', "Renter's insurance details",
    'Health insurance card', 'Emergency contacts', 'Campus map & class schedule']},

  {cat:'home', section:'Kitchen Basics', items:[
    'Dish soap', 'Sponge / scrubber', 'Dish towels', 'Trash bags', 'Food storage containers',
    'Basic spices (salt, pepper)', 'Cooking oil (olive/neutral)', 'Condiments (ketchup/mustard/mayo)',
    'Coffee maker or kettle', 'Reusable water bottle', 'Paper towels']},

  {cat:'home', section:'Bedroom', items:[
    'Extra sheets & pillowcases', 'Mattress protector', 'Extra pillows', 'Laundry basket/hamper',
    'Hangers', 'Under‑bed storage bins']},

  {cat:'home', section:'Bathroom', items:[
    'Bath, hand & face towels', 'Shower curtain & rings', 'Bath mat',
    'Toiletries (soap, shampoo, toothpaste)', 'Toilet brush & cleaner', 'Plunger', 'Small trash can']},

  {cat:'home', section:'Cleaning Supplies', items:[
    'Multi‑surface cleaner', 'Disinfectant wipes', 'Broom & dustpan', 'Mop / Swiffer',
    'Vacuum (if carpeted)', 'Laundry detergent', 'Dryer sheets (or wool balls)']},

  {cat:'home', section:'Tech & Study Gear', items:[
    'Laptop & charger', 'Surge protector', 'Extension cord', 'Desk lamp', 'Headphones',
    'USB drive / external drive', 'Printer (optional)']},

  {cat:'home', section:'Comfort & Personal Touch', items:[
    'Throw blanket', 'Photos/posters', 'Small plants', 'Air freshener']},

  {cat:'home', section:'First Aid & Safety', items:[
    'First aid kit', 'Flashlight', 'Basic toolkit (screwdriver, hammer, tape measure)', 'Batteries']},

  {cat:'grocery', section:'Grocery — Pantry Staples', qty:true, items:[
    'Rice', 'Pasta', 'Marinara (jarred)', {name:'Canned beans (black/chickpea/kidney)', hp:true},
    'Canned tomatoes (diced/crushed)', {name:'Canned tuna/salmon', hp:true}, 'Peanut butter or almond butter',
    'Oats (quick or rolled)', 'Tortillas', 'Bread', 'Olive oil', 'Neutral cooking oil', 'Soy sauce/tamari',
    'Hot sauce / sriracha', 'Vinegar (white or apple cider)', 'Broth/stock (cubes or carton)',
    'Foil / zip bags / containers']},

  {cat:'grocery', section:'Grocery — Fridge Essentials', qty:true, items:[
    {name:'Eggs (dozen)', hp:true}, {name:'Egg whites (carton)', hp:true}, 'Milk or plant milk',
    {name:'Greek yogurt (plain)', hp:true}, {name:'Cottage cheese', hp:true}, {name:'Cheese (block or shredded)', hp:true},
    'Butter or spread', 'Onions', 'Garlic', 'Bell peppers', 'Carrots', 'Broccoli or green beans',
    'Greens (spinach/mixed)', 'Tomatoes', 'Bananas', 'Apples', 'Berries (fresh or frozen)',
    {name:'Chicken (thighs/breasts)', hp:true}, {name:'Ground turkey (93% lean) or beef (90%+)', hp:true},
    {name:'Tofu or tempeh', hp:true}, {name:'Chicken sausage (pre‑cooked)', hp:true} ]},

  {cat:'grocery', section:'Grocery — Freezer Basics', qty:true, items:[
    'Frozen mixed vegetables', 'Frozen fruit (berries/mango)',
    {name:'Frozen shrimp or fish fillets', hp:true}, {name:'Frozen edamame', hp:true}, 'Frozen dumplings or ravioli']},

  {cat:'grocery', section:'Grocery — Condiments & Flavor', qty:true, items:[
    'Ketchup', 'Mustard', 'Mayonnaise', 'BBQ or teriyaki sauce', 'Salsa', 'Pesto (optional)', 'Lemon/lime juice (bottled)']},

  {cat:'grocery', section:'Grocery — Spices (Starter Set)', qty:true, items:[
    'Salt', 'Black pepper', 'Garlic powder', 'Paprika (smoked optional)', 'Chili powder or red pepper flakes',
    'Italian seasoning / oregano & basil', 'Cumin', 'Cinnamon']},

  {cat:'grocery', section:'Grocery — Breakfast & Snacks', qty:true, items:[
    {name:'Protein bars (low sugar)', hp:true}, {name:'Jerky (beef/turkey/salmon)', hp:true},
    {name:'Protein powder (whey/plant)', hp:true}, {name:'String cheese or cheese sticks', hp:true},
    'Granola/cereal', 'Nuts or trail mix', 'Hummus', 'Crackers or pita', 'Baby carrots',
    'Popcorn (kernels or microwave)', 'Dark chocolate']},

  {cat:'grocery', hpSection:true, section:'High‑Protein Add‑Ons & Swaps', qty:true, items:[
    {name:'Chickpea or lentil pasta', hp:true}, {name:'Protein‑enriched pasta', hp:true}, {name:'Quinoa', hp:true},
    {name:'Lentils (dry or canned)', hp:true}, {name:'Seitan', hp:true}, {name:'Ultra‑filtered milk (low‑fat)', hp:true},
    {name:'High‑protein tortillas or wraps', hp:true}, {name:'High‑protein bread', hp:true}, {name:'Canned chicken', hp:true},
    {name:'Smoked salmon', hp:true} ]},

  {cat:'grocery', hpSection:true, section:'Quick High‑Protein Meal Builders', items:[
    {name:'Pre‑cooked grilled chicken strips', hp:true}, {name:'Rotisserie chicken (debone & portion)', hp:true},
    {name:'Microwaveable rice cups + tuna/edamame', hp:true}, {name:'Egg bites (store‑bought or homemade)', hp:true},
    {name:'Greek yogurt + fruit + peanut butter', hp:true} ]}
];
