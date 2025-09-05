# ConscioCMS

## License

ConcidusCMS License (Adapted from Apache 2.0 + CC BY 4.0)

ConcidusCMS is licensed under the Apache 2.0 and CC BY 4.0 licenses. This means that anyone is free to use, modify, and redistribute the code, provided the following conditions are met:

1. **Preservation of notices**  
   The original copyright and license notices must be preserved in any modified or redistributed version (Apache 2.0).

2. **Attribution**  
   Credit must be given to the original project, ConcidusCMS, by clearly mentioning its origin (CC BY 4.0).

3. **Integrity of purpose**  
   Any modification that removes or disables features, documentation or comment that promoting the sustainability of information (truth, quality, and ethical publishing) must also remove the reference to ConcidusCMS. Such modified versions may not be presented or branded as ConsciusCMS.

By adopting this licensing approach, we ensure that ConcidusCMS remains free, open, and accessible to all. This model encourages innovation and collaboration while protecting both the recognition and the ethical integrity of the project.

---

**ConsciusCMS** is a modern, responsive Content Management System built with React, TypeScript, and Redux Toolkit. Designed for photographers, artists, and creative professionals, it provides an intuitive interface for managing portfolios, galleries, and dynamic content with touch-enabled navigation and responsive design.

## 🌟 Features

### Core Functionality
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🎨 Interactive Image Gallery**: Touch-enabled navigation with smooth transitions
- **✏️ Rich Content Editor**: Built-in WYSIWYG editor with React Quill
- **🗂️ Project Management**: Organize content into projects with multiple slides
- **🔐 Authentication**: Secure login system with AWS Cognito integration
- **🌐 Multi-language Support**: Built-in internationalization (EN, ES, CAT)
- **📊 Schema Management**: Dynamic content structure with customizable fields

### User Experience
- **⌨️ Keyboard Navigation**: Arrow key support for gallery navigation
- **👆 Touch Gestures**: Swipe navigation for mobile devices
- **🎯 SEO Optimized**: Meta tags and Open Graph integration with React Helmet
- **⚡ Fast Loading**: Optimized with Vite build system and code splitting
- **🎭 Modal System**: Elegant modal dialogs for detailed content viewing

### Technical Features
- **🔄 State Management**: Redux Toolkit with type-safe actions and reducers
- **📝 TypeScript**: 100% TypeScript implementation with strict type checking
- **🧪 Modern React**: React 18.3+ with hooks and functional components
- **🎨 Bootstrap Integration**: React Bootstrap components for consistent UI
- **📱 PWA Ready**: Progressive Web App capabilities
- **☁️ Cloud Integration**: AWS S3 bucket integration for media storage

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ConscioCMS.git
   cd ConscioCMS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create a .env file with your configuration
   VITE_CONTENT_BUCKET_URL=your-s3-bucket-url
   VITE_API_ENDPOINT=your-api-endpoint
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🛠️ Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint for code quality
npm run lint
```

### Project Structure

```
ConscioCMS/
├── public/                 # Static assets
│   ├── favicon.png
│   └── Login.jpeg
├── src/                   # Source code
│   ├── assets/           # Images and static files
│   ├── Classes/          # Class management components
│   ├── Editor/           # Content editor components
│   ├── Entities/         # Entity management
│   ├── Layout/           # Layout components
│   ├── Pages/            # Main application pages
│   ├── Schema/           # Schema management
│   ├── Settings/         # Configuration components
│   └── doucumentacion/   # Project documentation (see softwareArchitecutre.md)
│   ├── users/            # User authentication
│   ├── util/             # Utility functions
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   ├── store.tsx         # Redux store configuration
│   └── types.ts          # TypeScript type definitions
├── admin/                # Admin interface
├── package.json
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build configuration
└── README.md
```

## 📋 Core Components

### Gallery Navigation (`inicio.tsx`)
- Interactive image gallery with touch and keyboard navigation
- Project-based slide organization
- Mobile-responsive design with gesture support
- Dynamic content loading and transitions

### Content Editor (`Editor.tsx`)
- Rich text editing with React Quill
- Field management system
- Schema-based content structure
- Modal-based editing interface

### State Management
- **pageSlice.ts**: Page content and navigation state
- **editorSlice.ts**: Editor state and content management
- **schemaSlice.tsx**: Dynamic schema definitions

## 🎨 Styling and Theming

The application uses a combination of:
- **CSS Modules**: Component-specific styles
- **SCSS**: Advanced styling with variables and mixins
- **Bootstrap**: Responsive grid system and components
- **Custom CSS**: Unique design elements and animations

### Key Style Files
- `src/App.css`: Global application styles
- `src/Pages/inicio.css`: Gallery and navigation styles
- `src/Editor/editor.css`: Editor interface styles
- `src/custom.scss`: Custom Bootstrap theme

## 🔧 Configuration

### TypeScript Configuration
The project uses strict TypeScript configuration with:
- Strict type checking enabled
- Module resolution for React components
- Path mapping for cleaner imports

### Vite Configuration
- React SWC for fast refresh
- Optimized build output
- Development server with HMR

### Feature flags via environment variables
The application supports a simple feature flag to enable or disable public signup from the login page:

- `VITE_ALLOW_SIGNUP` — set to `1` or `true` to show the "Crear cuenta" link on the login page; set to `0` or leave unset to hide it.

Example .env:

```text
VITE_CONTENT_BUCKET_URL=https://your-bucket-url
VITE_API_ENDPOINT=https://your-api
VITE_ALLOW_SIGNUP=1
```

### About the `.env` and `.env.example` files

This project uses Vite environment variables (all starting with `VITE_`) stored in a `.env` file at the project root.

- `.env.example` (checked into the repo) documents the expected variables and contains safe example placeholders.
- Copy `.env.example` to `.env` and update values for your local environment. For example:

```bash
cp .env.example .env
# then edit .env with real values
```

- Important: Vite loads env values at startup. If you change `.env`, restart the dev server (`npm run dev`).

Security note: Do not commit secrets or production credentials to version control. Keep `.env` out of source control and only commit `.env.example`.


## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript strict mode
- Use functional components with hooks
- Maintain responsive design principles
- Write meaningful commit messages
- Test on multiple devices and browsers

## 📱 Browser Compatibility

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile browsers**: iOS 14+, Android 8+

## 🔒 Security

- AWS Cognito authentication
- Secure API endpoints
- Input validation and sanitization
- CSRF protection
- Secure cookie handling

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Redux Toolkit** for state management
- **Vite** for the fast build system
- **Bootstrap** for responsive components
- **AWS** for cloud infrastructure

## 📞 Support

For support, email [your-email@domain.com] or open an issue in the GitHub repository.

---

**Built with ❤️ for the creative community**
