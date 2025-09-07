
# Reality-to-Code AI Builder

## What is this application?

Reality-to-Code AI Builder is a modern web application that allows users to:
- **Upload hand-drawn UI sketches** (image-based wireframes)
- **Describe the app's desired behavior** in natural language
- **Generate production-ready app code** using AI vision and code generation
- **Edit generated code** in a professional embedded IDE (Monaco Editor)
- **Deploy apps with one-click** to Vercel or Netlify
- **View AI confidence scores** for generation quality assessment
- **Save, rename, and delete past generations** as projects, each with its prompt, sketch image, and file tree
- **Securely authenticate** via Supabase (email/password)
- **Instantly preview generated apps** by clicking on a project
- All user-generated data is secured by Row Level Security in Supabase

---

## User Features, at a Glance

- **Generate apps from sketches + English**: Just sketch + describe what you want!
- **Sketch upload**: PNG/JPG up to 5MB per image.
- **Prompt smarter apps**: Describe the desired features/logic.
- **Edit generated code**: Professional Monaco Editor with syntax highlighting
- **One-click deployment**: Deploy to Vercel or Netlify instantly
- **AI confidence scores**: See how confident the AI is in the generation
- **Private profile**: Your projects and sketches are accessible only by you.
- **Rename/Delete Projects**: Use the action menu on each past generation.
- **Resume Work**: Instantly reload/preview prior generations in the UI.
- **Error Handling**: If your session expires, you'll be gently guided to log in again.
- **No login required to browse**: See the workflow—even as a guest.
- **Premium UI**: Glassmorphism effects, smooth animations, mobile-optimized

---

## Developer Guide

### Architecture

- **Frontend**: React (functional components), TypeScript, Tailwind CSS, Shadcn UI, Lucide Icons, Framer Motion
- **Backend**: Supabase (auth, database, storage, edge functions)
    - `projects` table (core user data with code storage)
    - `deployments` table (deployment tracking)
    - Storage bucket: `project-images`
    - Edge Functions: `interpret-sketch`, `deploy`
- **AI Integration**: Google Gemini 1.5 Pro for vision and code generation
- **Code Editor**: Monaco Editor (VS Code) for embedded editing
- **Deployment**: Vercel API integration for one-click deployment

### Supabase Database Schema

#### Main Table: `projects`

Stores metadata for each user-generated project:

| Column          | Type        | Description                          |
| --------------- | ---------- | ------------------------------------ |
| id              | string     | Primary key                          |
| project_id      | string     | AI-generated unique project id        |
| user_id         | string     | Foreign key, Supabase user id         |
| name            | string     | Name/title for the generation         |
| prompt          | string     | The prompt describing the app         |
| files           | string[]   | File names for preview                |
| image_url       | string     | Public URL for the sketch image       |
| code_response   | text       | Generated code from AI                |
| confidence_score| decimal    | AI confidence score (0.0-1.0)         |
| created_at      | timestamp  | Project creation time                 |
| updated_at      | timestamp  | Last update time                      |
| description     | string?    | (optional)                            |
| is_public       | boolean    | For future (currently always false)   |

#### Table: `deployments`

Tracks deployment information:

| Column       | Type        | Description                       |
| ------------ | ---------- | --------------------------------- |
| id           | string     | Primary key                       |
| project_id   | string     | Foreign key to projects           |
| provider     | string     | 'vercel', 'netlify'               |
| repo_url     | string     | Repository URL                    |
| deployment_url| string    | Live deployment URL               |
| status       | string     | Deployment status                 |
| created_at   | timestamp  | Deployment creation time          |
| updated_at   | timestamp  | Last update time                  |

Row Level Security (RLS) is **enabled** on all tables: each user can see only their own data by default!

### Supabase Authentication

- Email/password login and registration (no social logins by default)
- Make sure "Confirm email" is *disabled* in Supabase settings for easier onboarding/testing
- Redirects back to "/" upon success
- Guest users can view only informational UI, not saved projects

### Running & Developing

**Prerequisites:**
- Node.js 18+
- npm or yarn
- Supabase account
- Google Gemini API key
- Vercel/Netlify account (for deployment features)

**Local development:**

1. Clone the repo: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Set up environment variables (see below)
4. Set up Supabase project and run migrations
5. `npm run dev` to start local dev environment
6. Visit `http://localhost:5173` in your browser

**Environment Variables:**

Create a `.env` file in the root directory:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# AI API Keys
GEMINI_API_KEY=your-gemini-api-key-here

# Optional: Deployment tokens (user provides these in UI)
# VERCEL_TOKEN=your-vercel-token-here
# NETLIFY_TOKEN=your-netlify-token-here
```

**Supabase Setup:**

1. Create a new Supabase project
2. Run the migrations in `/supabase/migrations/` in order
3. Enable Row Level Security on all tables
4. Set up authentication providers (email/password enabled by default)
5. Create storage bucket: `project-images` with public access
6. Set up edge functions: `interpret-sketch` and `deploy`

**Database Tables:**
- `projects` - Core project data with generated code
- `deployments` - Deployment tracking and URLs
- Apply all migrations in chronological order

---

## Current Implementation Status

### ✅ **Implemented Features (4.8/5)**
- AI-powered sketch-to-code generation
- Embedded Monaco code editor
- One-click deployment to Vercel
- AI confidence score display
- Premium glassmorphism UI
- Mobile-responsive design
- Secure authentication and RLS
- Project management (CRUD operations)

### 🚧 **Pending Features (Future Development)**
- **Bulk upload**: Support for multiple sketch files/ZIP uploads
- **Collaboration**: Team sharing and role-based access
- **Offline caching**: localStorage for last 5 projects
- **OAuth integration**: Google/GitHub social logins
- **Usage dashboard**: Billing and analytics
- **Advanced deployment**: Netlify, GitHub integration
- **Real-time collaboration**: Live editing sessions
- **Template system**: Pre-built app templates
- **Export options**: Download as ZIP, Git repo creation

## Extending/Improving

- **Add social logins**: Configure Supabase Auth Providers
- **Support additional file types** or larger images by editing file validation
- **Team/collaboration**: Implement shared project tables and adjust RLS
- **Use custom edge functions** (see `/supabase/functions/`)
- **Advanced error telemetry**: Add error logging to analytics_events table
- **Performance optimization**: Add caching layers and lazy loading
- **Testing framework**: Implement Vitest + Playwright for comprehensive testing

## File Structure

All new React components should be atomic and concise—avoid "giant" files. Here are some key files/components and what they do:

### Core Pages
- `src/pages/Index.tsx` — Main application hub with premium hero section
- `src/pages/ProjectPage.tsx` — Project editor with Monaco code editor and deployment
- `src/pages/Auth.tsx` — Authentication page

### Components
- `src/components/CodeEditor.tsx` — Monaco-based code editor with syntax highlighting
- `src/components/SketchUploader.tsx` — Handles image file selection and preview
- `src/components/PromptPanel.tsx` — AI prompt UI for describing the app
- `src/components/PastGenerations.tsx`, `PastGenerationActions.tsx` — List, reload, rename, and delete previous generations
- `src/components/GeneratedPreview.tsx` — Shows the generated project and link to preview
- `src/components/ProjectStructurePanel.tsx` — Displays generated file structure

### Hooks & Logic
- `src/hooks/usePastGenerationsFetcher.ts` — Manages project CRUD operations
- `src/hooks/useGenerateApp.ts` — Handles AI generation workflow
- `src/hooks/useAuth.tsx` — Authentication state management
- `src/lib/interpreterApi.ts` — AI API integration
- `src/lib/utils.ts` — Utility functions

### Backend & Configuration
- `supabase/functions/interpret-sketch/` — AI interpretation edge function
- `supabase/functions/deploy/` — Deployment edge function
- `supabase/migrations/` — Database schema migrations
- `src/integrations/supabase/` — Supabase client and type definitions

---

## Critical Developer Notes

### Security & Best Practices
- **Database security:** Row Level Security (RLS) is enforced on all tables!
- **Environment variables:** Never commit `.env` files - use `.env.example` as template
- **API keys:** Store sensitive keys in Supabase edge function secrets, not client code
- **Authentication:** All routes validate user sessions before allowing operations
- **Input validation:** All user inputs are sanitized and validated
- **Never expose your Supabase service key in frontend code!** Use anon key only.

### Architecture Notes
- **AI Integration:** Code generation logic in `src/lib/interpreterApi.ts` and edge functions
- **State Management:** React Query for server state, local state for UI
- **Component Structure:** Atomic design pattern - keep components focused and reusable
- **Error Handling:** Comprehensive error boundaries and user feedback
- **Performance:** Lazy loading, code splitting, and optimized re-renders

### Development Workflow
- **Testing:** Implement tests for all new features using Vitest
- **Code Quality:** TypeScript strict mode, ESLint, Prettier
- **Git Flow:** Feature branches, comprehensive commit messages
- **Documentation:** Update this README for any new features

---

## License & Credits

- Built with [Lovable](https://lovable.dev/) — React, Vite, Shadcn UI, and Supabase
- Icons by [Lucide](https://lucide.dev/)
- For questions, improvements, or deployment help, see project settings or open an issue.

---

### Contact / Contributing

Open PRs, improvements, or feature requests are welcome. Please reference which feature or file you're updating, and ensure all code is **fully typed and modularized**.

---

