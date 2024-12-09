# BlogShare Backend

BlogShare Backend is the server-side part of the BlogShare application built using Node.js, Express, MongoDB, JWT for user authentication , Cloudinary for file storage andMulter for file uploading. It allows users to manage blogs and perform various CRUD operations.

### Live Link : [blogshare](https://blogh-share-client.vercel.app/)

### Prerequisites

- Node.js (v20.12.2)
- MongoDB (either local or MongoDB Atlas)
- Cloudinary for image uploading

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/arjun897babu/BloghShare-Back-End.git
   ```

2. **Environment Configuration**

   Create a `.env` file in root directory 

   ```env
    HOST=localhost
    PORT=4000
    ORIGIN=http://localhost:3000
    MONGO_URI=your_mongodb_connection_URL_from_atlas

    # Cloudinary Configuration
    API_KEY=your_cloudinary_api_key
    CLOUDNAME=your_cloudinary_cloud_name
    API_SECRET=your_cloudinary_api_secret

    # JWT Configuration
    JWT_ACCESS_SECRET=your_jwt_access_token_secret
    JWT_REFRESH_SECRET=your_jwt_refresh_token_secret

    NODE_ENV=development 
    # Change to 'production' when deploying
   ```

3. **Setup Frontend**

   To set up the client, please visit the [blogshare client ](https://github.com/arjun897babu/BloghShare-client) and follow the instructions there.


## Contributing


1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##
