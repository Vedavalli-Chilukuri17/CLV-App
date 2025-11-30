# CLV Maximizer Application

A comprehensive ServiceNow application for incident response management, built to maximize Customer Lifetime Value (CLV) through efficient incident handling and resolution.

## 📋 Overview

The CLV Maximizer Application provides a modern, React-based incident management system within ServiceNow. It enables organizations to create, track, and resolve incidents efficiently while maintaining high customer satisfaction levels.

## ✨ Features

- **Modern React UI**: Clean, responsive interface for incident management
- **Custom Incident Table**: Purpose-built incident tracking with comprehensive fields
- **Real-time Operations**: Create, read, update, and delete incidents seamlessly
- **Priority Management**: Configurable priority levels (Critical, High, Moderate, Low)
- **Status Tracking**: Complete incident lifecycle from New to Closed
- **Auto-numbering**: Automatic incident number generation with INC prefix
- **Web Service Ready**: Full REST API access for external integrations

## 🏗️ Architecture

### Frontend Components
- **App Component**: Main application container and state management
- **IncidentList**: Display and manage incident listings
- **IncidentForm**: Create and edit incident forms
- **IncidentService**: API service layer for backend communication

### Backend Metadata
- **Custom Table**: `x_hete_clv_maximiz_incident` with comprehensive schema
- **UI Page**: Embedded React application endpoint
- **ServiceNow Fluent DSL**: Type-safe metadata definitions

## 📊 Data Model

### Incident Table Schema
| Field | Type | Description |
|-------|------|-------------|
| `number` | String | Auto-generated incident number (INC0001000+) |
| `short_description` | String | Brief incident summary (mandatory) |
| `description` | String | Detailed incident description |
| `status` | Choice | New, In Progress, On Hold, Resolved, Closed |
| `priority` | Integer | Critical (1), High (2), Moderate (3), Low (4) |
| `opened_at` | DateTime | When the incident was created |
| `resolved_at` | DateTime | When the incident was resolved |

## 🚀 Getting Started

### Prerequisites
- ServiceNow instance with scope `x_hete_clv_maximiz`
- Node.js and npm
- ServiceNow SDK 4.1.0+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clv-maximizer-application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the application**
   ```bash
   npm run build
   ```

4. **Deploy to ServiceNow**
   ```bash
   npm run deploy
   ```

### Available Scripts

- `npm run build` - Build the application for deployment
- `npm run deploy` - Install the application to your ServiceNow instance  
- `npm run transform` - Transform source files
- `npm run types` - Generate TypeScript definitions

## 📁 Project Structure

```
src/
├── client/                    # React frontend
│   ├── app.jsx               # Main application component
│   ├── app.css               # Application styles
│   ├── index.html            # HTML entry point
│   ├── main.jsx              # React app bootstrap
│   ├── components/           # React components
│   │   ├── IncidentForm.jsx  # Incident creation/editing form
│   │   ├── IncidentList.jsx  # Incident listing component
│   │   └── *.css             # Component styles
│   └── services/
│       └── IncidentService.js # API service layer
└── fluent/                   # ServiceNow metadata
    ├── index.now.ts          # Application entry point
    ├── tables/
    │   └── incident.now.ts   # Custom incident table
    └── ui-pages/
        └── incident-manager.now.ts # UI page definition
```

## 🔧 Development

### Working with ServiceNow Fluent

This application uses ServiceNow Fluent DSL for metadata definition:

- **Tables**: Defined in `src/fluent/tables/`
- **UI Pages**: Defined in `src/fluent/ui-pages/`
- **Type Safety**: Full TypeScript support for metadata

### React Development

The frontend is built with React 19 and includes:
- Modern hooks-based components
- CSS modules for styling
- Service layer for API abstraction
- Error handling and loading states

## 🌐 Usage

### Accessing the Application

Once deployed, access the incident manager at:
```
https://<your-instance>.service-now.com/x_hete_clv_maximiz_incident_manager.do
```

### API Endpoints

The custom incident table supports full CRUD operations via ServiceNow's Table API:
```
GET /api/now/table/x_hete_clv_maximiz_incident
POST /api/now/table/x_hete_clv_maximiz_incident
PUT /api/now/table/x_hete_clv_maximiz_incident/{sys_id}
DELETE /api/now/table/x_hete_clv_maximiz_incident/{sys_id}
```

## 🔍 Key Features

### Incident Lifecycle Management
- Create new incidents with auto-generated numbers
- Track progress through defined status workflow
- Set and modify priority levels
- Capture detailed descriptions and resolution information

### Modern User Experience
- Responsive React-based interface
- Real-time updates and error handling
- Intuitive form controls and validation
- Mobile-friendly design

### Integration Ready
- REST API endpoints for external systems
- Web service access enabled
- Standard ServiceNow platform integration

## 🛠️ Tech Stack

- **Frontend**: React 19, CSS3, HTML5
- **Backend**: ServiceNow Platform, Fluent DSL
- **Build Tools**: ServiceNow SDK, ESLint
- **Language**: TypeScript, JavaScript

## 📝 License

This project is unlicensed and proprietary.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Review the ServiceNow documentation
- Check the application logs in ServiceNow
- Consult the Fluent DSL documentation

---

Built with ❤️ using ServiceNow Fluent DSL and React