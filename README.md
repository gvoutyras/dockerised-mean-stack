## Users

username: user\
password: 1234\
role: user

username: admin\
password: word5678\
role: admin

> Only users with the admin role are able to edit and delete articles

### Minor PSA
> The generated JWT has a duration of 1 year

## Backend
Backend is built using Express and exposes three main routes:
- `/api/v1/articles`
- `/api/v1/categories`
- `/api/v1/user`

I have also implemented a simple middleware that checks for an `'Authorization'` header in every incoming request(excluding the user/login endpoint) and denies it if the JWT is not valid

## Frontend
The login panel sends a request to the `/user/login` endpoint and then uses the **local storage** API in order to store:
- The JWT generated on login
- The full name of the user
- The access level (role) of the user

I have also created 4 singletons that work similarly to Event Emmiter in order to achieve real time refreshing after CRUD operations on the data. (e.g. When an article gets deleted, fire up the singleton to re-fetch the data). Other than that the angular project follows a pretty common flow.

## Further Addition
- I would probably implement a logger on backend (possibly winston)
- Enrich UI
- Add i18n for internationalisation
- Work a little more on the /user/ endpoints (give/take privileges, list users)
- Better responsiveness

## Disclaimer

This project was made an **exhibition** of my knowledge on MEAN Stack and not a production ready site. So some features were either loosely designed, or completely skipped. Some of these features would be: 
- logging
- pagination
- stricter error handling
- stricter mongoose schemas
- more organised commits & file structure
- token refreshing