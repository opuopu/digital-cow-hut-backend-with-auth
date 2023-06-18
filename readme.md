## live-link: https://digital-cow-hut-backend-gules.vercel.app/


## Application Routes:
## User
api/v1/auth/signup (POST)  <br/>
api/v1/users (GET) <br/>
api/v1/users/648ea844cd303104c670f585 (Single GET)  <br/>
api/v1/users/648ea844cd303104c670f585 (PATCH) <br/>
api/v1/users/648ea874cd303104c670f587 (DELETE) <br/>
## Cows
api/v1/cows (POST)   <br/>
api/v1/cows (GET)     <br/>
api/v1/cows/648ea8e0cd303104c670f58d (Single GET)  <br/>
api/v1/cows/648ea8e0cd303104c670f58d (PATCH)   <br/>
api/v1/cows/648ea8dbcd303104c670f58b (DELETE)   <br/>
Pagination and Filtering routes of Cows  
api/v1/cows?pag=1&limit=10   <br/>
api/v1/cows?sortBy=price&sortOrder=asc  <br/>
api/v1/cows?minPrice=20000&maxPrice=70000     <br/>
api/v1/cows?location=Chattogram     <br/>
api/v1/cows?searchTerm=Cha   <br/>
## Orders
api/v1/orders (POST)  <br/>
api/v1/orders (GET)