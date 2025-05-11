# ADREstate

## Inspiration
In 2020, we were faced with a revolutionary wave of social injustices. This initiated a global effort for equality on all levels. At the center of this effort was the Black Lives Matter movement. In the fight for racial equality, real estate and housing policy is an area that is not usually thought of as being discriminative. The unfortunate truth is that it still is. Companies that value homes for sale or refinancing are bound by law not to discriminate. Black homeowners say it happens anyway. According to an article by the New York Times, a couple had their home appraised for $330,000 the first time around, which they believed was inaccurate. In their second appraisal, the couple removed all furniture that resembled black culture, and to their surprise, their home was given a value of $450,000. This is more than a 40% increase! To address this problem, we created the first of its kind Anti-Discrimination Real Estate (ADREstate) web platform for homeowners and appraisers. Appraisals are a deal-breaker no matter if you are trying to sell, buy, or refinance. Thus, it is integral that the appraisals that we get are the most objective and accurate as possible.

Source: [New York Times](https://www.nytimes.com/2020/08/25/realestate/blacks-minorities-appraisals-discrimination.html)

## What it does
Our web platform allows home sellers to obtain a completely unbiased appraisal via a double-blinding approach. Homeowners can first post a listing anywhere in the world using the map which provides an interactive method for users to look into houses. They can also add pictures, descriptions, and any additional information they deem necessary for a fair assessment. On the other side, appraisers can give value to homes and provide their reasoning for their value. Both the home appraisers and the home sellers do not know who each other are until the appraisal is done, at which point the appraiser and homeowner can chat via a convenient chat application that we created. Using our chat app, each party will be able to get the other’s contact information to schedule a formal meeting or discussion if need be. Home sellers and appraisers can also see the values of other homes done by different appraisers. If the homeowner believes that their house has been unfairly valued, they can easily challenge the appraisal by contacting the appraiser and getting a second opinion. Ultimately, homeowners can gain valuable insight into their home’s unbiased value through various appraisals while also connecting them with potential buyers and expert appraisers. Homeowners and appraisers can also look at their profiles to find which houses they have submitted along with their statuses and values.

## How we built it
In our project, we used one of the hottest tech stacks: the MERN (MongoDB, Express.js, React.js, and Node.js) stack. For the front end side, we primarily used React and it's JSX elements to build a user friendly and convenient interface. In addition to React, we used CSS to style our pages and interfaces. On the backend side, we used node, express, and Axios to create routes and API requests in order to link the processes to the front-end. For both the frontend and backend, we used an extended list of npm packages including but not limited to reactstrap, redux, bcryptjs, and config (See Built With). As for the database, we used mongoose to create JSON-like models to connect to MongoDB. Finally, the map was generated using Leaflet.js.

## 🚀 Features

- User authentication and authorization
- Property listings and management
- Image upload functionality
- RESTful API architecture
- Responsive frontend design

## 🛠️ Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- Config for environment management

### Frontend
- React.js
- Redux for state management
- React Router for navigation
- Axios for API requests

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ADREstate
```

2. Install server dependencies:
```bash
npm install
```

3. Install client dependencies:
```bash
cd client
npm install
```

4. Create a `.env` file in the root directory with the following variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## 🚀 Running the Application

### Development Mode
Run both frontend and backend concurrently:
```bash
npm run dev
```

### Production Mode
1. Build the React frontend:
```bash
cd client
npm run build
```

2. Start the production server:
```bash
npm start
```

## 📁 Project Structure

```
ADREstate/
├── client/                 # React frontend
├── config/                 # Configuration files
├── middleware/            # Custom middleware
├── models/                # Mongoose models
├── routes/                # API routes
│   ├── authRoutes.js
│   ├── houseRoutes.js
│   ├── imageRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── uploads/               # File upload directory
├── server.js             # Express server
└── package.json
```

## 🔒 API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

### Users
- GET `/api/user` - Get user profile
- PUT `/api/user` - Update user profile

### Properties
- GET `/api/house` - Get all properties
- POST `/api/house` - Create new property
- GET `/api/house/:id` - Get property by ID
- PUT `/api/house/:id` - Update property
- DELETE `/api/house/:id` - Delete property

### Images
- POST `/api/image` - Upload images
- GET `/api/image/:filename` - Get image

## 🔧 Development Scripts

- `npm run client` - Run React frontend
- `npm run server` - Run Express backend
- `npm run dev` - Run both frontend and backend concurrently
- `npm start` - Run production server