# Mansio - Immersive Real Estate Discovery Platform

Mansio revolutionizes real estate discovery by combining immersive video experiences with social-inspired interactions, making property hunting engaging and efficient.

## 🌟 Key Features

### For Home Buyers
- **TikTok-Style Property Feed**: Swipe through curated property videos
- **Immersive Virtual Tours**: Experience properties in stunning detail
- **Smart Filtering**: Advanced property recommendations based on user preferences
- **Live Auctions**: Participate in real-time property auctions
- **Social Integration**: Share, save, and discuss properties
- **Instant Agent Connect**: Direct communication with real estate agents

### For Real Estate Agents
- **Enhanced Property Showcase**: Upload high-quality video tours
- **Real-time Analytics**: Track viewer engagement and interest
- **Lead Generation**: Connect with qualified buyers
- **Auction Management**: Host and manage property auctions
- **Client Communication**: Built-in messaging system

## 🛠 Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **State Management**: React Query
- **UI Components**: 
  - Shadcn/ui
  - Radix UI
  - Tailwind CSS
- **Animations**: 
  - Framer Motion
  - CSS Animations
- **Video Playback**: Native HTML5 Video API
- **Form Handling**: React Hook Form + Zod

### Development Tools
- **Build Tool**: Vite
- **Package Manager**: npm/yarn
- **Code Quality**:
  - ESLint
  - TypeScript
  - Prettier

## 🏗 System Architecture

### Component Structure
```
src/
├── components/
│   ├── ui/          # Reusable UI components
│   ├── layout/      # Layout components
│   └── features/    # Feature-specific components
├── pages/           # Route pages
├── hooks/           # Custom React hooks
├── types/           # TypeScript types/interfaces
├── lib/            # Utility functions
└── data/           # Mock data and constants
```

### Data Flow
1. **Property Discovery**
   - Video preloading system
   - Lazy loading for images
   - Caching strategy for frequently accessed data

2. **User Interactions**
   - Real-time updates
   - Optimistic UI updates
   - Error boundary handling

3. **Authentication Flow**
   - JWT-based auth
   - Secure session management
   - Role-based access control

## 🗺 User Journey Map

### Buyer Journey
1. **Discovery Phase**
   - Landing page introduction
   - Feature showcase
   - Value proposition
   
2. **Exploration**
   - Immersive property feed
   - Search & filters
   - Save favorites
   
3. **Engagement**
   - Virtual tours
   - Property details
   - Agent communication
   
4. **Transaction**
   - Auction participation
   - Offer submission
   - Document handling

### Agent Journey
1. **Onboarding**
   - Profile creation
   - Property listing
   - Video upload
   
2. **Management**
   - Listing management
   - Auction setup
   - Lead tracking
   
3. **Communication**
   - Buyer interaction
   - Message handling
   - Showing scheduling

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/mansio.git

# Install dependencies
cd mansio
npm install

# Start development server
npm run dev
```

### Environment Variables
```env
VITE_API_URL=your_api_url
VITE_STORAGE_URL=your_storage_url
```

## 📱 Mobile Responsiveness
- Fluid layouts
- Touch-optimized interactions
- Adaptive video quality
- Progressive loading

## 🔒 Security Features
- Input validation
- XSS protection
- CSRF protection
- Rate limiting
- Secure data transmission

