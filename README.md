## Users

username: user\
password: 1234\
role: user

username: admin\
password: word5678\
role: admin

## Backend
Backend is built using Express and exposes three main routes:
- /api/v1/articles
- /api/v1/categories
- /api/v1/user

I have also implemented a simple middleware that checks for an 'Authorization' header in every incoming request(excluding the user/login endpoint) and denies it if the JWT is not valid

## Frontend
The login panel send a request to the user/login endpoint and then stores in the **local storage**:
- The JWT
- The full name of the user
- The access level (role) of the user

I have also created 4 singletons that work as Event Emmiters in order to achieve real time refreshing after CRUD operations on the data. (e.g. WHen an article gets deleted, fire up the singleton to re-fetch the data). Other than that the angular project follows a pretty common flow.

## Further Addition
I would probably implement a logger on backend (possibly winston)