<div align="center">
  <h1>Event Spark</h1>
  <p><strong>Enterprise-Grade Event Management & Registration Platform</strong></p>

  <div>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  </div>
</div>

---

## Overview

Event Spark is a modern, full-stack event management application engineered to handle end-to-end event lifecycles. It equips organizers with robust capabilities to deploy events, manage attendee data, facilitate on-site check-ins via QR codes, and analyze registration metrics through a centralized, high-performance dashboard.

## Core Capabilities

### Event Administration
- **Centralized Dashboard:** A comprehensive administrative interface for monitoring ongoing, upcoming, and historical events.
- **Event Publishing Engine:** Streamlined event creation forms featuring live template previews prior to publication.
- **AI-Powered Copywriting:** Integration with Edge Functions to programmatically enhance and professionalize event descriptions.

### Attendee Management
- **Registration Workflows:** Seamless, conversion-optimized registration processes for attendees.
- **QR Code Check-ins:** Auto-generation of unique QR codes for registrants to ensure frictionless on-site access control.
- **Real-Time Data Grids:** Advanced data tables providing real-time tracking of RSVPs, capacity limits, and check-in statuses.

### Platform Security & Architecture
- **Authentication & Authorization:** Secure user authentication workflows, including user registration, session management, and rigid route protection managed by Supabase Auth.
- **Responsive Interface:** A mobile-first, highly responsive design system architected with Tailwind CSS and UI components dynamically adapted for all screen variables.
- **Type-Safe Ecosystem:** End-to-end type safety utilizing TypeScript, strict form validations via Zod, and optimized data fetching through TanStack Query.

## Technical Architecture

### Frontend Ecosystem
- **Core System:** React 18, Vite, TypeScript
- **User Interface:** Tailwind CSS, shadcn/ui components, Framer Motion
- **State & Data Management:** TanStack React Query (v5), React Hook Form, Zod Configuration
- **Routing Infrastructure:** React Router DOM v6

### Backend Infrastructure
- **Primary Database:** PostgreSQL (Hosted via Supabase)
- **Identity & Authentication:** Supabase Auth
- **Serverless Compute:** Supabase Edge Functions (Deno runtime)
- **Asset Storage:** Supabase Storage

## Development Environment Setup

Follow the deployment procedures outlined below to initialize the application in a local development environment.

### 1. System Prerequisites

Ensure the following dependencies are present on the host machine:
- [Bun](https://bun.sh/) or an equivalent Node.js package manager (v18+)
- [Git](https://git-scm.com/) version control system
- [Supabase CLI](https://supabase.com/docs/guides/cli#installation) for local database manipulation

### 2. Repository Initialization

Clone the project repository and resolve dependencies:

```bash
git clone https://github.com/AymanSdk/event-spark.git
cd event-spark
bun install
```

### 3. Environment Configuration

Define local environment variables. Create a `.env` file at the repository root based on the provided specifications.

```env
VITE_SUPABASE_URL="https://[YOUR_PROJECT_ID].supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="[YOUR_ANON_KEY]"
VITE_SUPABASE_PROJECT_ID="[YOUR_PROJECT_ID]"
```
*Note: Authentication credentials can be provisioned through the Supabase Administrative Console under `Project Settings > API`.*

### 4. Database & Infrastructure Synchronization

Authenticate the core CLI and align the remote backend schema with the local repository specifications:

```bash
# Authenticate with the Supabase platform infrastructure
bunx supabase login

# Establish a secure link to the cloud infrastructure
bunx supabase link --project-ref [YOUR_PROJECT_ID]

# Execute SQL migrations to provision the remote database schema
bunx supabase db push

# Deploy serverless edge compute functions
bunx supabase functions deploy
```

### 5. Application Execution

Initialize the local Vite development server:

```bash
bun dev
```
The application interface will be accessible at `http://localhost:5173`.

## Source Code Organization

```text
src/
├── assets/          # Static media and JSON configurations
├── components/      # Modular UI architecture (shadcn/ui, layouts, granular parts)
├── contexts/        # React Context wrappers (e.g., AuthContext)
├── hooks/           # Encapsulated state and business logic React hooks
├── integrations/    # Third-party SDK integrations (Supabase, Lovable)
├── lib/             # Core utility functions and formatters
├── pages/           # Primary application view components
└── App.tsx          # Application entry point and primary route definition

supabase/
├── functions/       # Serverless Edge Functions deployments
└── migrations/      # Sequential SQL schema migrations
```

## CLI Operations Reference

The following operational commands are defined within the `package.json`:

- `bun dev` - Launches the Vite development server with Hot Module Replacement.
- `bun build` - Compiles and minifies the application for production deployment.
- `bun lint` - Executes process to static-check code structure and formatting conventions.
- `bun test` - Initiates the Vitest execution environment for unit assessments.

## Enterprise Contribution Guidelines

Standard Git flow methodologies apply. Contributors are advised to initiate a feature branch from the primary branch, implement changes adhering to strict TypeScript standards, pass local deployment directives, and submit a detailed Pull Request for engineering review.

## License

Distribution and usage of this software are governed by the MIT License.
