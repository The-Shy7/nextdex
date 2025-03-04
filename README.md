# Pokédex Web Application

A modern, responsive web application that serves as a comprehensive Pokémon encyclopedia, built with Next.js, TypeScript, and Tailwind CSS.

## 🌟 Features

### Core Functionality
- **Pokémon Browsing**: View a paginated list of all Pokémon with beautiful cards
- **Detailed Information**: Each card displays comprehensive Pokémon data including:
  - Stats with visual progress bars
  - Abilities with descriptions
  - Moves with power, accuracy, and type information
  - Type classification with color coding

### Search & Navigation
- **Smart Search**: Find Pokémon by name with an improved search algorithm that prioritizes:
  - Exact matches
  - Names that start with the search term
  - Names containing the search term as a whole word
- **Pagination**: Navigate through the complete Pokémon database with an intuitive pagination system
  - Previous/Next buttons
  - Direct page selection
  - Current page indicator

### User Experience
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Type-Based Styling**: Visual elements are color-coded based on Pokémon types
- **Loading States**: Skeleton loaders provide visual feedback during data fetching
- **Error Handling**: Graceful error messages when API requests fail
- **Tooltips**: Hover over abilities and moves to see detailed descriptions
- **Animations**: Subtle animations enhance the user experience

### Technical Features
- **Client-Side Rendering**: Fast, interactive UI with React hooks
- **API Integration**: Fetches data from the PokeAPI
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern, utility-first styling approach
- **Shadcn UI Components**: High-quality, accessible UI components
- **Optimized API Calls**: Rate limiting and error handling for reliable performance

## 🚀 Implementation Details

### Components
- **PokemonCard**: Displays detailed information about a single Pokémon
- **Pagination**: Provides navigation between pages of Pokémon
- **UI Components**: 
  - **shadcn/ui**: Button, Input, Card, Badge, Tooltip
  - **next-themes**: ThemeProvider, ThemeToggle

### Data Handling
- **API Integration**: Fetches data from the PokeAPI with error handling and rate limiting
- **Search Logic**: Implements smart search to find Pokémon by name
- **Pagination**: Manages state for current page and total pages

### Styling
- **Type-Based Colors**: Each Pokémon type has a corresponding color scheme
- **Responsive Grid**: Adapts to different screen sizes
- **Dark Mode Support**: Color schemes for both light and dark modes
- **Glassmorphism**: Modern UI with backdrop blur effects

## 🛠️ Technical Stack

- **Framework**: Next.js 13
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (based on Radix UI)
- **Icons**: Lucide React
- **API**: PokeAPI (https://pokeapi.co/)

## 🧠 Design Decisions

### Why Next.js?
Next.js was chosen for its excellent developer experience, built-in TypeScript support, and optimized performance.

### Why Tailwind CSS?
Tailwind provides a utility-first approach that allows for rapid UI development while maintaining consistency.

### Why shadcn/ui?
These components offer accessibility, customizability, and a modern design language that integrates well with Tailwind CSS.

## 📱 Responsive Design

The application is fully responsive and works on:
- Mobile devices (portrait and landscape)
- Tablets
- Desktops and large screens

## 🔍 Search Implementation

The search functionality uses a sophisticated algorithm that:
1. Normalizes the search term (lowercase, trimmed)
2. Prioritizes exact matches
3. Includes Pokémon names that start with the search term
4. Matches Pokémon names that contain the search term as a whole word
5. Resets to page 1 when a new search is performed

## 🔄 Pagination System

The pagination component:
- Shows a limited number of page buttons with ellipsis for large page counts
- Always shows first and last page buttons
- Displays pages around the current page
- Disables Previous/Next buttons when at the first/last page
- Shows the current page and total pages

## 🎨 Visual Design

- **Color Scheme**: Gradient backgrounds with type-based accent colors
- **Card Design**: Clean, modern cards with hover effects
- **Typography**: Clear hierarchy with appropriate sizing
- **Spacing**: Consistent spacing throughout the application
- **Animations**: Subtle animations for interactions

## 🔮 Future Enhancements

Potential future improvements:
- Filtering by type, stats, etc.
- Comparison feature to compare multiple Pokémon
- Favorites system with local storage
- Team builder functionality
- Evolution chain visualization
- More detailed move information
- Performance optimizations for image loading

## 📄 License

This project is open source and available under the MIT License.