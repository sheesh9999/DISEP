# MediPredict - Drug Interaction & Side Effect Prediction

MediPredict is a comprehensive web application designed to help users and healthcare professionals check drug interactions and predict potential side effects of medications. The application provides a user-friendly interface for analyzing potential interactions between multiple drugs and predicting possible side effects, helping to prevent adverse drug reactions.

## Live Application 🌐

Access the application at: [http://127.0.0.1:3000](http://127.0.0.1:3000)

## Features

- Drug Interaction Checker
- Side Effect Predictor
- User Profile Management
- Dark Mode Support
- Responsive Design
- Real-time Interaction Analysis
- Comprehensive Drug Database

## Technology Stack

### Frontend
- **Framework**: React 18.2.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React Hooks
- **UI Components**: Custom Components with Tailwind
- **Data Processing**: TensorFlow.js for ML predictions

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **API**: RESTful Architecture
- **Validation**: Zod
- **Security**: bcrypt for password hashing

## Project Structure
```
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── data/              # Drug datasets
│   ├── contexts/          # React contexts
│   └── types/             # TypeScript types
├── backend/               # Backend source code
│   ├── src/              # Backend source
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Database models
│   │   └── middleware/   # Custom middleware
│   └── .env              # Environment configuration
```

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
