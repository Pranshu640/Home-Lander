# Home-Lander 🏠

https://home-lander-jsge.onrender.com

A modern real estate platform built with Node.js, Express, and MongoDB that allows users to browse, list, and manage properties.

## Features ✨

- **User Authentication**: Secure signup and login functionality
- **Property Listings**: Create, read, update, and delete property listings
- **Image Upload**: Support for multiple property images with cloud storage
- **Responsive Design**: Mobile-friendly interface with modern UI/UX
- **Search & Filter**: Find properties based on various criteria
- **Reviews System**: Users can leave reviews on properties
- **Interactive Maps**: Property location visualization
- **User Dashboard**: Manage your listings and reviews

## Tech Stack 🛠️

- **Frontend**: EJS, Bootstrap, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js
- **Image Storage**: Cloudinary
- **Other Tools**: Git, npm

## Installation 🚀

1. Clone the repository:

git clone https://github.com/Pranshu640/Home-Lander.git
cd Home-Lander

2. Install dependencies:

npm install

3. Create a `.env` file in the root directory and add your environment variables:

```env
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
DB_URL=your_mongodb_url
SECRET=your_session_secret
```

4. Start the server:

npm start

## Project Structure 📁
Home-Lander/
├── app.js # Application entry point
├── controllers/ # Route controllers
├── models/ # Database models
├── public/ # Static files
│ ├── css/ # Stylesheets
│ └── js/ # Client-side JavaScript
├── routes/ # Application routes
├── views/ # EJS templates
│ ├── includes/ # Reusable template parts
│ └── listings/ # Property listing views
```

## Key Features Explained 🔑

### Property Listings
- Create detailed property listings with multiple images
- Include property details like price, location, amenities
- Edit and delete your own listings
- View all listings in a grid or map view

### User System
- Secure user authentication and authorization
- User profiles with listing management
- Review and rating system
- Saved properties functionality

### Search & Filter
- Search properties by location
- Filter by price range
- Sort by various criteria
- Advanced search options

## API Routes 🛣️

### Authentication Routes
- `POST /register` - Create new user account
- `POST /login` - User login
- `GET /logout` - User logout

### Listing Routes
- `GET /listings` - View all listings
- `POST /listings` - Create new listing
- `GET /listings/:id` - View specific listing
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Review Routes
- `POST /listings/:id/reviews` - Add review
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact 📧

Pranshu Bansal - [pranshubansal640@gmail.com](mailto:pranshubansal640@gmail.com)

Project Link: [https://github.com/Pranshu640/Home-Lander](https://github.com/Pranshu640/Home-Lander)

## Deployment 🚀

https://home-lander-jsge.onrender.com

## Acknowledgments 👏
- Built with inspiration from modern real estate platforms
- Special thanks to the open-source community
