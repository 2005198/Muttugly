Muttugly


Attributions :

1) W3Schools - HTML/CSS Reference
I used W3Schools for HTML and CSS basics like Flexbox layout and form elements (input fields, buttons, labels).
Reference: https://www.w3schools.com/

2) Node.js Documentation
Used for understanding async/await patterns and how Node.js handles HTTP requests.
Reference: https://nodejs.org/docs/

3) Web Dev Simplified - Express.js Tutorial
Followed this video to learn Express routing and how app.get(), app.post() work.
Reference: https://www.youtube.com/watch?v=SccSCuHhOw0

4) Express.js Middleware Documentation
Learned how middleware works and why next() function is needed to pass control to next middleware. Used this for my checklogin function in user.js (line 59-72).
Reference: https://expressjs.com/en/guide/writing-middleware.html

5) jsonwebtoken npm Documentation
Used jwt.sign() to create tokens on login (user.js line 52) and jwt.decode() to read token in middleware (user.js line 64). Learned about expiresIn option for token expiry.
Reference: https://www.npmjs.com/package/jsonwebtoken

6) better-sqlite3 Documentation
Friend showed me this library. Used db.prepare().run() for INSERT/UPDATE/DELETE and db.prepare().get() for SELECT single row, db.prepare().all() for multiple rows. See user.js lines 41, 50, 78, 85, 91, 98, 105.
Reference: https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md

7) cookie-parser npm
Used for reading cookies from request. res.cookie() to set and res.clearCookie() for logout.
Reference: https://www.npmjs.com/package/cookie-parser

8) ChatGPT
Used for fixing syntax errors, understanding error messages, and validating my approach.

9) Friend's Help
A friend helped me with:
- Replacing JSON file storage with SQLite database
- Suggesting logout button feature (user.js line 109-112)
- Fixing login to check password properly (user.js line 50)


Pet Grooming Shop
System Overview
Muttugly is a pet grooming shop that allows customers to buy products and get appointments for services and will be able to post their ratings and reviews. The system being developed is a simple e-commerce platform prototype for customers that allows them to register, log in, add products to a shopping cart, and change or delete those items, and in the future, customers will be able to get appointments and give ratings and reviews.

System Requirements
Functional Requirements
User Registration and Login
Allow users to create accounts.
Authenticate users and let them log in.
To ensure permanence, save user data in a SQLite database.
Cart Management
Create a cart object when a user registers.
Allow users to add items to their carts.
Display cart items on a separate cart page.
Update the product quantity in the cart.
Remove things from the cart.

Non-functional Requirements

Store data in a SQLite database.
Use the JavaScript Fetch API for frontend-backend communication.
Code should be readable, usable, and modular.
System Architecture
Frontend
HTML, CSS, JavaScript
Pages
Registration form—register.html
Login form—login.html
Button (Add to Cart)—index.html
Backend
Environment: Node.js
Database: SQLite using better-sqlite3 library.
API:
Expose REST endpoints for:


Create new user — register
Authenticate user — login
Fetch cart — userId
Add item to cart — userId
Update cart item — userId/itemId
Remove cart item — cart/userId:itemId   
Interaction Model
All pages use the Fetch API to connect to backend endpoints without refreshing the page.
All changes are reflected dynamically in the DOM.

CRUD Operations
Create
Registration
Name, email address, and password are all input boxes.
Backend adds the new user to the users table in SQLite.
Cart is stored in a separate cart table in the database.
Add to Cart
When you click "Add to Cart" on a purchase, it sends a POST request.
Backend inserts the product with default quantity 1 into the user's cart array.
Read
User Login
Input is checked against users in the SQLite database.
View Cart
GET /getitems fetches the cart from SQLite.
The cart page dynamically renders all products using JavaScript.
Update
Input field allows you to change the quantity.
Sends a PATCH request to update the cart in SQLite.
Delete
A delete button beside each item initiates a DELETE request.
Backend removes a product from the cart table in SQLite.

Validation, Integrity, and Testing
Validation
Ensure that your email address is unique when registering.
Cart updates confirm the presence of the item before making a change.
Data Integrity
UserId is used to cross-reference the cart and user files.
Quantity cannot be set below one.
Testing
Unit Test
CRUD actions in isolation, such as addToCart() and removeItem().
Integration Test
Simulate complete flow. Register, log in, add an item, update the quantity, and delete it.
Make sure the UI refreshes dynamically and database reflects changes.

Future Goals

Book an Online Appointment
Purpose of Online Appointment
Customers can arrange grooming services online rather than calling or physically visiting the store, providing customers with convenience and flexibility while enabling staff to manage time and resources efficiently.
Features
Calendar-based UI for selecting a date and time, service choices, confirmation emails are automated, and the admin/staff interface allows you to view, approve, or cancel appointments.
Customer Review and Rating
Purpose of Customer Review and Rating
Building trust and community through social proof entails exhibiting authentic customer experiences in order to establish credibility and relatability.
Features
Users can score grooming services or goods and provide feedback via comments, and all content is reviewed by administrators to guarantee appropriateness.



