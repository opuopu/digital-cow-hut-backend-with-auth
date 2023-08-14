## Digital Cow Hut Backend Summary
Welcome to the Digital Cow Hut backend! This robust and feature-rich backend system is built using cutting-edge technologies like Mongoose, TypeScript, and JWT for secure authentication. The system offers seamless user management, enabling registration, login, and token issuance for verification. Leveraging JWT tokens, we've implemented role-based access control, allowing admins, buyers, and sellers to perform distinct actions.

Our platform includes dedicated routes for different roles, enabling admins to manage cows comprehensively, buyers to purchase cows, and sellers to list and sell their livestock. Transactions are smoothly tracked in the order database, ensuring a transparent record of each purchase. Moreover, admins can create new admin accounts effortlessly, enhancing user management capabilities.

Users can conveniently access and update their profile information via dedicated routes. Our coding standards are top-notch, employing tools like ESLint, Prettier, and Lint Stage for clean, consistent, and efficient code. To streamline the user experience, we've implemented robust error handling mechanisms, providing a smoother journey through the system.

Experience the power of our meticulously designed backend, making the Digital Cow Hut a secure, efficient, and user-centric platform for all things bovine.




## Live Link: https://digital-cow-hut-auth-eta.vercel.app/


## Application Routes:

## Main part

### Auth (User)
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/auth/login (POST)  <br/>
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/auth/signup (POST)    <br/>
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/auth/refresh-token (POST)  <br/>

### Auth (Admin)
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/admins/create-admin (POST) <br/>
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/admins/login (POST)  <br/>
User
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/users (GET)    <br/>
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/users/649866ef2bd1e0cabe4d0610 (Single GET) Include an id that is saved in your database    <br/>
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/users/649866ef2bd1e0cabe4d0610 (PATCH) Include an id that is saved in your database    <br/>
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/users/6498672a2bd1e0cabe4d0617 (DELETE)      <br/>
### Cows
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/cows (POST)    <br/>
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/cows (GET)        <br/>
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/cows/649868532bd1e0cabe4d0622 (Single GET) Include an id that is saved in your database         <br/>
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/cows/649868532bd1e0cabe4d0622 (PATCH) Include an id that is saved in your database              <br/>
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/cows/64994fe63dc2c999db5ebfe3 (DELETE) Include an id that is saved in your database              <br/>
### Orders
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/orders (POST)   <br/>
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/orders (GET)    <br/>
Bonus Part
### Admin
-Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/admins/create-admin (POST)   <br/>

### My Profile
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/users/my-profile (GET)   <br/>
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/users/my-profile (PATCH)   <br/>
### Order:
Route: https://digital-cow-hut-auth-eta.vercel.app/api/v1/orders/64986b43ebcdea871f460651 (GET)  <br/>
