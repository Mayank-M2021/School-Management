# 🏫 School Directory Management System

A modern, responsive web application for managing school information with a clean, user-friendly interface. Built with Next.js and featuring comprehensive form validation, image uploads, and a beautiful grid-based school listing.

## ✨ Features

### 🎯 Core Functionality
- **Add Schools**: Comprehensive form to add new schools with detailed information
- **View Schools**: Beautiful grid-based listing of all schools
- **Image Upload**: Support for school images with Cloudinary integration
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

### 🛡️ Advanced Validation
- **Real-time Validation**: Instant feedback as users type
- **Email Validation**: Proper email format checking
- **Phone Validation**: Flexible phone number format support
- **File Validation**: Image type and size restrictions
- **Form Security**: Comprehensive input sanitization

### 🎨 Modern UI/UX
- **Clean Design**: Modern, professional appearance
- **Hover Effects**: Smooth animations and transitions
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Clear error messages and recovery options
- **Accessibility**: Proper form labels and semantic HTML

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- A Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/school-directory.git
   cd school-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database Configuration
   DATABASE_URL="your-database-connection-string"
   
   # Cloudinary Configuration (for image uploads)
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   
   # Next.js Configuration
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Database Setup**
   ```bash
   # Run database migrations
   npm run db:migrate
   
   # Seed initial data (optional)
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
school-directory/
├── 📁 components/
│   ├── SchoolCard.js          # Individual school card component
│   └── Layout.js              # Main layout wrapper
├── 📁 pages/
│   ├── addSchool.jsx          # Add new school form
│   ├── showSchools.jsx        # Schools listing page
│   └── api/
│       └── schools/
│           ├── index.js       # Schools API endpoints
│           └── upload.js      # Image upload handler
├── 📁 styles/
│   └── globals.css            # Global styles and components
├── 📁 public/
│   └── placeholder-school.jpg # Default school image
├── 📁 lib/
│   └── database.js            # Database configuration
└── README.md
```

## 🎨 Styling Architecture

### CSS Framework
- **Custom CSS**: Handcrafted styles for unique design
- **Responsive Grid**: CSS Grid for perfect school card layouts
- **Modern Animations**: Smooth hover effects and transitions
- **Mobile-First**: Responsive design principles

### Design System
- **Primary Color**: `#007bff` (Bootstrap Blue)
- **Success Color**: `#28a745` (Green)
- **Error Color**: `#dc3545` (Red)
- **Gray Scale**: Modern gray palette for text and backgrounds

## 📝 API Endpoints

### Schools API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/schools` | Fetch all schools |
| `POST` | `/api/schools` | Add a new school |
| `GET` | `/api/schools/[id]` | Get specific school |
| `PUT` | `/api/schools/[id]` | Update school |
| `DELETE` | `/api/schools/[id]` | Delete school |

### Image Upload API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/schools/upload` | Upload school image |


## 🧪 Form Validation Rules

### School Name
- ✅ Required field
- ✅ 3-100 characters
- ✅ Letters, numbers, spaces, and basic punctuation only

### Address
- ✅ Required field
- ✅ 10-200 characters
- ✅ Complete address format

### City & State
- ✅ Required fields
- ✅ 2-50 characters each
- ✅ Letters, spaces, hyphens, and apostrophes only

### Contact Number
- ✅ Required field
- ✅ 10-15 digits
- ✅ Supports international formats
- ✅ Flexible formatting (+91 9876543210, 9876543210, etc.)

### Email
- ✅ Required field
- ✅ Valid email format
- ✅ Maximum 100 characters

### Image Upload
- ✅ Optional field
- ✅ JPEG, PNG, GIF, WebP formats only
- ✅ Maximum 5MB file size
- ✅ Automatic cloud upload

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |


**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Mayank Malhotra ](https://github.com/Mayank-M2021)

