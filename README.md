# AlgoSignal: Auth assignment by AlgoAnalytics

## Problem:

Many web applications are a mix of public and private pages. Public pages are available to anyone, while a private page requires a user login. You can use authentication to manage which users have access to which pages.

Develop a application which has following:

- User Registration Form (use email as username)
- Login Form
- A few pages which are visible to only authenticated users
- A few pages which are open to any (guest) one on the internet
- User Able to change own Password

## Application brief:

### Tech Stack used:

- `ReactJS`
- `TailwindCSS`
- `NodeJS`
- `ExpressJS`
- `MongoDB`

### Default ports:

- React : 5173
- ExpressJS : 3000

### Sitemap

- Guest Pages:
  - Home `/`
  - Login `/user/login`
  - Register `/user/register`
  - CatchAll 404
- Authenticated Pages
  - Events `/events`
  - Create Event `/events/new`
  - Update Password `/user/updatePassword`

### Workflow

This project is used to demonstrate use of JWT tokens for authentication of users. The frontend consist of Homepage and auth pages which are publicly accessible to all but also events pages and its nested routes that are only for authenticated users. The same is true for updatePassword route.
When a user logs in a JWT token is stored as http-only cookie , prevent XSS attacks and also a local state is updated with userInfo. Both are independent by code. As security is best applied in layers, The userInfo state is used by frontend to prevent users from visiting protected pages as 1st layer of security. The JWT token which is not accessible by javascript, is sent by browser for upcoming http request. Thus the backend can verify the user with JWT token cookie.

### Note:

- When using symmetric key the payload is visible to all but an RSA or public-private key would be an improvement
