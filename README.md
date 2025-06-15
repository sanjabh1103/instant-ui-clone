
# Reality-to-Code AI Builder

## What is this application?

Reality-to-Code AI Builder is a modern web application that allows users to:
- **Upload hand-drawn UI sketches** (image-based wireframes)
- **Describe the app's desired behavior** in natural language
- **Generate production-ready app code** using AI vision and code generation
- **Save, rename, and delete past generations** as projects, each with its prompt, sketch image, and file tree
- **Securely authenticate** via Supabase (email/password)
- **Instantly preview generated apps** by clicking on a project
- All user-generated data is secured by Row Level Security in Supabase

---

## User Features, at a Glance

- **Generate apps from sketches + English**: Just sketch + describe what you want!
- **Sketch upload**: PNG/JPG up to 5MB per image.
- **Prompt smarter apps**: Describe the desired features/logic.
- **Private profile**: Your projects and sketches are accessible only by you.
- **Rename/Delete Projects**: Use the action menu on each past generation.
- **Resume Work**: Instantly reload/preview prior generations in the UI.
- **Error Handling**: If your session expires, you'll be gently guided to log in again.
- **No login required to browse**: See the workflow—even as a guest.

---

## Developer Guide

### Architecture

- **Frontend**: React (functional components), TypeScript, Tailwind CSS, Shadcn UI, Lucide Icons
- **Backend**: Supabase (auth, database, storage)
    - `projects` table (core user data)
    - Storage bucket: `project-images`

### Main Supabase Table: `projects`

Stores metadata for each user-generated project:

| Column       | Type        | Description                       |
| ------------ | ---------- | --------------------------------- |
| id           | string     | Primary key                       |
| project_id   | string     | AI-generated unique project id     |
| user_id      | string     | Foreign key, Supabase user id      |
| name         | string     | Name/title for the generation      |
| prompt       | string     | The prompt describing the app      |
| files        | string[]   | File names for preview             |
| image_url    | string     | Public URL for the sketch image    |
| created_at   | timestamp  | Project creation time              |
| updated_at   | timestamp  | Last update time                   |
| description  | string?    | (optional)                         |
| is_public    | boolean    | For future (currently always false)|

Row Level Security (RLS) is **enabled**: each user can see only their own projects by default!

### Supabase Authentication

- Email/password login and registration (no social logins by default)
- Make sure "Confirm email" is *disabled* in Supabase settings for easier onboarding/testing
- Redirects back to "/" upon success
- Guest users can view only informational UI, not saved projects

### Running & Developing

**Local development:**

1. Clone the repo, run `npm install`
2. Set up your own Supabase project (see below) or use the default
3. `npm run dev` to start local dev environment (hot reload + live preview)
4. Visit `http://localhost:5173` in your browser

**Environment / Critical settings:**

- Supabase project id: `kvunnankqgfokeufvsrv`
- Supabase anon key: (see in Supabase dashboard or ask dev lead)
- Storage bucket: `project-images`
- Main table: `projects`
- If starting from scratch, set up Supabase as described in the migrations: see `/supabase/migrations/` for schema reference (especially for the `projects` table and associated RLS).

---

## Extending/Improving

- **Add social logins**: update Supabase Auth Providers
- **Support additional file types** or larger images by editing file validation
- **Team/collaboration**: add shared project tables and adjust RLS
- **Use custom edge functions** (see `/supabase/functions/`)
- **Advanced error telemetry**: add error logging to analytics_events table

## File Structure

All new React components should be atomic and concise—avoid "giant" files. Here are some key files/components and what they do:

- `src/pages/Index.tsx` — Main application hub; orchestrates layout & state
- `src/components/SketchUploader.tsx` — Handles image file selection and preview
- `src/components/PromptPanel.tsx` — AI prompt UI for describing the app
- `src/components/PastGenerations.tsx`, `PastGenerationActions.tsx` — List, reload, rename, and delete previous generations
- `src/components/GeneratedPreview.tsx` — Shows the generated project and link to preview
- `src/hooks/usePastGenerationsFetcher.ts`, `useGenerateApp.ts` — Core data logic
- `src/pages/ProjectPage.tsx` — Full project preview per generation

---

## Critical Developer Notes

- **Database security:** Row Level Security (RLS) is enforced!
- **Never expose your Supabase service key in frontend code!** Use anon key only.
- **Prompt/AI interaction code is in `src/lib/interpreterApi.ts`** and expects compatible backend endpoints.
- **All auth, file upload, and storage logic is centralized in hooks/components:** Please keep them modular when extending functionality.

---

## License & Credits

- Built with [Lovable](https://lovable.dev/) — React, Vite, Shadcn UI, and Supabase
- Icons by [Lucide](https://lucide.dev/)
- For questions, improvements, or deployment help, see project settings or open an issue.

---

### Contact / Contributing

Open PRs, improvements, or feature requests are welcome. Please reference which feature or file you're updating, and ensure all code is **fully typed and modularized**.

---

