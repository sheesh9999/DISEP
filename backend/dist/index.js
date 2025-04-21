"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("./controllers/auth");
const profile_1 = require("./controllers/profile");
const drugInteraction_1 = require("./controllers/drugInteraction");
const auth_2 = require("./middleware/auth");
const database_1 = __importDefault(require("./config/database"));
const drugData_1 = require("./seeders/drugData");
// Import models with associations
require("./models/index");
// Load environment variables
dotenv_1.default.config();
// Initialize app
const app = (0, express_1.default)();
// Set up middleware
app.use((0, cors_1.default)({
    origin: '*', // Allow all origins for testing
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json());
// Test database connection and sync models
database_1.default.authenticate()
    .then(() => {
    console.log('Connected to SQLite database successfully');
    return database_1.default.sync({ alter: true }); // This will update tables without dropping data
})
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Database synchronized successfully');
    // Seed initial data
    try {
        yield (0, drugData_1.seedDrugs)();
    }
    catch (error) {
        console.error('Error seeding data:', error);
    }
}))
    .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
});
// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'MediPredict API is running' });
});
// Auth routes
app.post('/api/auth/register', auth_1.register);
app.post('/api/auth/login', auth_1.login);
app.post('/api/auth/logout', auth_2.protect, auth_1.logout);
// Profile routes
app.get('/api/profile', auth_2.protect, profile_1.getProfile);
app.put('/api/profile', auth_2.protect, profile_1.updateProfile);
// Drug interaction routes
app.get('/api/drugs', drugInteraction_1.getAllDrugs);
app.get('/api/interactions/:drug1Id/:drug2Id', drugInteraction_1.checkInteraction);
app.post('/api/interactions', auth_2.protect, drugInteraction_1.addInteraction);
// Protected route
app.get('/api/user/profile', auth_2.protect, (req, res) => {
    res.json({
        status: 'success',
        data: {
            user: req.user
        }
    });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal server error'
    });
});
// Start server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
