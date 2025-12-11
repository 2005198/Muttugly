Muttugly


Attributions :
1) I used W3Schools as a reference for HTML and CSS. I used their documentation to learn layout approaches like Flexbox, as well as to search up syntax and examples for various HTML form elements like input fields, buttons, and labels which helped me to structure the project's front-end.

2) I used the Node.js documentation to understand and build server-side functionalities which references to working with the filesystem (fs module), managing HTTP requests, and leveraging asynchronous APIs such as Promises and async/await patterns.
   
3) I followed Web Dev Simplified's Express.js lesson ("What is Express.js? | Node.js Framework Crash Course") to understand the basics of Express, including routing, middleware, request handling, and server configuration. This video helped me better structure my Express application.
"https://www.youtube.com/watch?v=SccSCuHhOw0&ab_channel=WebDevSimplified"

4) I used ChatGPT as an AI assistant, primarily for clarification and troubleshooting. I've used it to:

Fix syntax errors and enhance code readability.
Understand the error messages.
Get assistance with filesystem-related inquiries.
Validate my approach to certain features before implementation.

5) A friend helped me replace JSON file storage with SQLite database using the better-sqlite3 library. They also suggested adding a logout button feature which I implemented with their guidance. They showed me how to use the better-sqlite3 documentation to understand database queries. They also helped me fix the login to check password properly.


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



