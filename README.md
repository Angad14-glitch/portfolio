# Personal Portfolio Website

A full-stack personal portfolio website built with modern technologies, featuring a responsive frontend and a robust backend API.

## Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript (ES6+)** - Module-based architecture

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

### DevOps & Tools
- **Docker** - Containerization
- **Nginx** - Reverse proxy
- **Nodemon** - Development hot reload
- **ESLint** - Code linting
- **Jest** - Testing

## Features

- Fully responsive, mobile-first design
- Backend-driven dynamic content (profile, projects, skills)
- RESTful API with validation
- Contact form with backend validation and database storage
- Email integration (Nodemailer)
- Secure environment configuration
- MVC architecture
- Production-ready Docker deployment
- Accessibility (WCAG 2.1) compliant
- Rate limiting and security headers

## Project Structure

```
portfolio-website/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Mongoose models
│   ├── public/         # Static assets
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   └── views/          # Template views
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── package.json
├── seed.js
└── .env.example
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB 6+
- Docker & Docker Compose (for production)

### Development Setup

1. Clone the repository
```bash
cd portfolio-website
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start MongoDB (if not running)
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongo mongo:7

# Or use local MongoDB
```

5. Seed the database (optional)
```bash
node seed.js
```

6. Start development server
```bash
npm run dev
```

Visit `http://localhost:3000`

### Production Deployment

Using Docker Compose:
```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

The application will be available at `http://localhost` (HTTP redirects to HTTPS).

#### SSL Certificates
For production, place your SSL certificates in the `ssl/` directory:
```
ssl/
├── cert.pem
└── key.pem
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/portfolio |
| JWT_SECRET | JWT signing secret | - |
| EMAIL_HOST | SMTP host | smtp.gmail.com |
| EMAIL_PORT | SMTP port | 587 |
| EMAIL_USER | SMTP username | - |
| EMAIL_PASS | SMTP password | - |
| EMAIL_FROM | From email address | - |
| FRONTEND_URL | CORS origin | http://localhost:3000 |

## API Endpoints

### Profile
- `GET /api/profile` - Get profile
- `POST /api/profile` - Create profile
- `PUT /api/profile` - Update profile
- `DELETE /api/profile` - Deactivate profile

### Projects
- `GET /api/projects` - List projects (with filters)
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Deactivate project

### Skills
- `GET /api/skills` - Get all skills (grouped by category)
- `GET /api/skills/:id` - Get skill by ID
- `POST /api/skills` - Create skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Deactivate skill

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - List contacts (admin)
- `PUT /api/contact/:id/status` - Update contact status
- `DELETE /api/contact/:id` - Delete contact

### Health
- `GET /api/health` - Health check

## Scripts

```bash
npm start          # Production server
npm run dev        # Development with hot reload
npm test           # Run tests
npm run lint       # Lint code
node seed.js       # Seed database
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

This project follows WCAG 2.1 AA guidelines:
- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Focus indicators
- Color contrast ratios
- Reduced motion support
- Screen reader compatible

## License

MIT License - feel free to use this for your own portfolio!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request