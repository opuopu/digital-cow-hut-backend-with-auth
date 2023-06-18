## live-link: https://digital-cow-hut-backend-gules.vercel.app/


## Application Routes:
## User
api/v1/auth/signup (POST)  <br/>
api/v1/users (GET) <br/>
api/v1/users/648ea844cd303104c670f585 (Single GET)  <br/>
api/v1/users/648ea844cd303104c670f585 (PATCH) <br/>
api/v1/users/648ea874cd303104c670f587 (DELETE) <br/>
## Cows
api/v1/cows (POST)
api/v1/cows (GET)
api/v1/cows/648ea8e0cd303104c670f58d (Single GET) Include an id that is saved in your database
api/v1/cows/648ea8e0cd303104c670f58d (PATCH)
api/v1/cows/648ea8dbcd303104c670f58b (DELETE) Include an id that is saved in your database
Pagination and Filtering routes of Cows
api/v1/cows?pag=1&limit=10
api/v1/cows?sortBy=price&sortOrder=asc
api/v1/cows?minPrice=20000&maxPrice=70000
api/v1/cows?location=Chattogram
api/v1/cows?searchTerm=Cha
## Orders
api/v1/orders (POST)
api/v1/orders (GET)