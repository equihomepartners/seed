# Equihome Dashboard

A modern, interactive single-page application showcasing Equihome Partners' home equity investment platform.

## Features

- Animated Hero Section with dynamic statistics
- Interactive Business Model flow diagram
- Deal Example calculator with real-time updates
- Competitive Market Position matrix
- Strategic Partnership showcase
- AI-powered chat assistant
- Responsive design for all devices

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- React Spring

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/equihome-dashboard.git
cd equihome-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Then edit the `.env` file and add your actual values for:
- `OPENAI_API_KEY`: Your OpenAI API key for the chat functionality
- `EMAIL_USER`: Email address used for sending notifications
- `EMAIL_PASSWORD`: Password for the email account
- `TEAM_EMAIL`: Email address to receive admin notifications

4. Start the development server:
```bash
npm start
```
This will start both the frontend (Vite) and backend (Express) servers.

5. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx
│   ├── BusinessModel.tsx
│   ├── DealExample.tsx
│   ├── MarketPosition.tsx
│   ├── Partnerships.tsx
│   ├── ChatBot.tsx
│   └── Navigation.tsx
├── styles/
│   └── theme.ts
├── App.tsx
└── main.tsx
```

## Design System

- **Colors**
  - Primary: White (#FFFFFF)
  - Accent: Blue (#3B82F6)
  - Background: Linear gradient from #0A0A0A to #1A1A1A

- **Typography**
  - Font Family: SF Pro Display
  - Headings: 72px, 48px, 32px
  - Body: 16px, 14px

- **Breakpoints**
  - Desktop: 1440px
  - Laptop: 1024px
  - Tablet: 768px
  - Mobile: 375px

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. All rights reserved.
