# AlignAI - AI-Powered Interview Platform

AlignAI is a comprehensive AI-powered interview platform that helps candidates practice and improve their interview skills through intelligent AI interviewers. The platform offers real-time voice and text-based interviews across multiple domains with detailed feedback and analytics.

## 🚀 Features

### Core Features
- **AI-Powered Interviews**: Real-time conversations with intelligent AI interviewers
- **Voice & Text Support**: Choose between voice or text-based interviews with male/female AI voices
- **Multiple Domains**: 16+ interview categories including Software, Data Science, Finance, Consulting, and more
- **Real-time Feedback**: Instant feedback on performance and areas for improvement
- **Performance Analytics**: Track progress with detailed analytics and performance trends
- **Resume Integration**: AI analyzes resumes to ask relevant questions
- **Interview History**: Complete history of past interviews with results

### Interview Categories
- **Software Engineering**: Technical interviews, algorithms, system design
- **Data Science**: ML, statistics, data analysis, big data
- **Finance**: Behavioral finance, portfolio management, risk assessment
- **Consulting**: Case interviews, problem-solving, strategic thinking
- **Product Management**: Product strategy, agile methodologies, metrics
- **Business**: Business models, market analysis, digital transformation
- **And 10+ more categories**

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: Database ORM
- **PostgreSQL/SQLite**: Database
- **Redis**: Caching and session management
- **OpenAI/Anthropic**: AI interview generation
- **JWT**: Authentication
- **WebSocket**: Real-time communication

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **React Hook Form**: Form handling
- **Axios**: HTTP client
- **Socket.io**: Real-time communication

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- Redis (optional for development)

### Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd alignai
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && pip install -r requirements.txt
```

3. **Set up environment variables**
```bash
# Create .env file in backend directory
cd backend
cp .env.example .env

# Edit .env with your configuration
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
SECRET_KEY=your_secret_key
```

4. **Initialize the database**
```bash
cd backend
python scripts/populate_templates.py
```

5. **Start the development servers**
```bash
# From the root directory
npm run dev
```

This will start:
- Backend: http://localhost:8000
- Frontend: http://localhost:3000

## 🏃‍♂️ Running the Application

### Development Mode
```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:backend  # Backend only
npm run dev:frontend # Frontend only
```

### Production Build
```bash
# Build frontend
cd frontend && npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
alignai/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── config.py               # Configuration settings
│   ├── database.py             # Database models and setup
│   ├── requirements.txt        # Python dependencies
│   ├── routers/               # API routes
│   │   ├── auth.py            # Authentication routes
│   │   ├── ai_interview.py    # AI interview routes
│   │   ├── interviews.py      # Interview management
│   │   ├── users.py           # User management
│   │   └── analytics.py       # Analytics routes
│   ├── services/              # Business logic
│   │   ├── ai_service.py      # AI interview logic
│   │   └── voice_service.py   # Text-to-speech service
│   ├── schemas/               # Pydantic models
│   └── scripts/               # Database scripts
├── frontend/
│   ├── app/                   # Next.js app directory
│   │   ├── page.tsx          # Landing page
│   │   ├── dashboard/        # Dashboard pages
│   │   ├── auth/             # Authentication pages
│   │   └── globals.css       # Global styles
│   ├── contexts/             # React contexts
│   │   └── AuthContext.tsx   # Authentication context
│   └── package.json          # Frontend dependencies
├── package.json              # Root package.json
└── README.md                # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database
DATABASE_URL=sqlite:///./alignai.db

# JWT
SECRET_KEY=your-secret-key-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30

# AI Services
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key

# Redis (optional)
REDIS_URL=redis://localhost:6379

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### AI Configuration

The platform supports multiple AI providers:

1. **OpenAI GPT-4** (Recommended)
   - Set `OPENAI_API_KEY` in environment
   - Used for interview generation and responses

2. **Anthropic Claude**
   - Set `ANTHROPIC_API_KEY` in environment
   - Alternative AI provider

3. **Mock Mode** (Development)
   - No API keys required
   - Uses predefined responses for testing

## 🎯 Usage

### For Candidates

1. **Register/Login**: Create an account or sign in
2. **Choose Category**: Select from 16+ interview categories
3. **Start Interview**: Begin AI-powered interview with voice or text
4. **Get Feedback**: Receive detailed feedback and scores
5. **Track Progress**: Monitor performance with analytics

### For Recruiters

1. **Review Candidates**: View interview results and analytics
2. **Customize Questions**: Add company-specific questions
3. **Generate Reports**: Export candidate performance data

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Interviews
- `GET /api/interviews/templates` - Get interview templates
- `GET /api/interviews/my-interviews` - Get user's interview history
- `POST /api/ai-interview/start` - Start new AI interview
- `GET /api/ai-interview/history` - Get interview history

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/upload-resume` - Upload resume

### Analytics
- `GET /api/analytics/dashboard` - Get analytics dashboard
- `GET /api/analytics/performance-trends` - Get performance trends
- `GET /api/analytics/category-performance` - Get category performance

## 🧪 Testing

### Backend Tests
```bash
cd backend
python -m pytest tests/
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment

1. **Docker** (Recommended)
```bash
docker build -t alignai-backend ./backend
docker run -p 8000:8000 alignai-backend
```

2. **Heroku**
```bash
heroku create alignai-backend
git push heroku main
```

3. **Railway/Render**
- Connect GitHub repository
- Set environment variables
- Deploy automatically

### Frontend Deployment

1. **Vercel** (Recommended)
```bash
npm install -g vercel
vercel --prod
```

2. **Netlify**
- Connect GitHub repository
- Build command: `npm run build`
- Publish directory: `frontend/.next`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)
- **Discord**: [Community Server](link-to-discord)

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Anthropic for Claude API
- FastAPI team for the excellent framework
- Next.js team for the React framework
- All contributors and users

---

**AlignAI** - Your perfect interview starts here! 🚀