# StrokePredict - AI-Powered Stroke Risk Assessment

A production-ready React frontend for stroke prediction using machine learning. Built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Running stroke prediction API backend

### Installation

1. **Clone and install dependencies:**
```bash
git clone <your-repo-url>
cd stroke-prediction-frontend
npm install
```

2. **Environment Setup:**
```bash
# Copy environment template
cp .env.example .env

# Edit .env and set your API URL
VITE_API_BASE_URL=http://localhost:8000
# or for production:
# VITE_API_BASE_URL=https://your-stroke-prediction-api.com
```

3. **Development:**
```bash
npm run dev
```
Open http://localhost:8080

4. **Production Build:**
```bash
npm run build
npm run preview  # Test production build locally
```

## 🏗️ Architecture

### Project Structure
```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── StrokePredictionForm.tsx
│   └── ResultsCard.tsx
├── services/            # API service layer
│   └── api.ts          # Backend API integration
├── lib/                # Utilities and validations
│   ├── validations.ts  # Zod schemas
│   └── utils.ts       # Helper functions
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   └── Index.tsx      # Main application page
└── index.css          # Design system and global styles
```

### Key Features
- ✅ **Complete Form Validation** - Zod schema validation with real-time feedback
- ✅ **Responsive Design** - Mobile-first, fully responsive interface
- ✅ **Medical UI Theme** - Professional healthcare-inspired design
- ✅ **Error Handling** - Comprehensive error states and user feedback
- ✅ **Loading States** - Smooth loading indicators and transitions
- ✅ **Results Visualization** - Clear risk assessment display with progress bars
- ✅ **TypeScript** - Full type safety and IntelliSense
- ✅ **Environment Configuration** - Configurable API endpoints
- ✅ **Accessibility** - ARIA labels and keyboard navigation

## 🔌 API Integration

### Backend Requirements
Your stroke prediction API should implement:

**Endpoint:** `POST /api/predict`

**Request Body:**
```json
{
  "gender": "Male" | "Female" | "Other",
  "age": number,
  "hypertension": 0 | 1,
  "heart_disease": 0 | 1,
  "ever_married": "Yes" | "No",
  "work_type": "Private" | "Self-employed" | "Govt_job" | "children" | "Never_worked",
  "Residence_type": "Urban" | "Rural",
  "avg_glucose_level": number,
  "bmi": number,
  "smoking_status": "formerly smoked" | "never smoked" | "smokes" | null,
  "threshold": number
}
```

**Response:**
```json
{
  "probability": float,
  "prediction": 0 | 1,
  "threshold": float
}
```

### CORS Configuration
Ensure your backend API allows requests from your frontend domain:
```python
# Example for FastAPI
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🎨 Design System

The application uses a custom medical-themed design system:

- **Colors:** Medical blues, success greens, warning ambers
- **Typography:** Clean, readable fonts with proper hierarchy
- **Components:** Consistent spacing, shadows, and interactions
- **Responsive:** Mobile-first design with desktop enhancements

All design tokens are defined in `src/index.css` and extended in `tailwind.config.ts`.

## 🚀 Deployment

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variable: `VITE_API_BASE_URL=https://your-api-url.com`

### Vercel
1. Connect your repository to Vercel
2. Set environment variable: `VITE_API_BASE_URL=https://your-api-url.com`
3. Deploy automatically on push

### Docker
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

### Environment Variables for Production
- `VITE_API_BASE_URL`: Your backend API base URL

## 🔒 Security Considerations

- ✅ Input validation with Zod schemas
- ✅ HTTPS enforcement for production
- ✅ No sensitive data logging
- ✅ Secure API communication
- ✅ Error messages don't expose internal details

## 🧪 Testing

Run the development server and test:
1. Form validation (try submitting empty/invalid data)
2. API integration (check network tab for requests)
3. Error handling (disconnect network, invalid API responses)
4. Responsive design (test on different screen sizes)

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Follow the existing code style
2. Add proper TypeScript types
3. Update validation schemas when adding fields
4. Test on multiple devices/browsers
5. Update documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Medical Disclaimer:** This tool is for educational and informational purposes only. Always consult qualified healthcare professionals for medical advice.