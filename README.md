<!-- README.md -->

# Better You App

Welcome to the Better You App! This is a web application designed to help users track habits, manage tasks, and engage with various tools for personal development and self-improvement.

## ✨ Features

*   **User Authentication:**
    *   Sign Up & Login using Email/Password.
    *   Sign Up & Login using Google OAuth.
    *   Secure session management.
    *   Email verification flow after signup.
*   **Dashboard:**
    *   Personalized welcome message and current date display.
    *   Dynamic header that fades on scroll.
    *   Sticky notification bar with tips or progress updates.
    *   Grid-based layout showcasing various feature widgets.
*   **Habit Tracking:**
    *   View daily habits and overall completion percentage.
    *   Mark habits as complete/incomplete.
    *   Detailed habit view with options for pinning, reminders, repeat schedules (daily, specific days), notes, and streak tracking.
    *   Edit habit settings through a dedicated interface.
    *   Start and track multi-day "Challenges" based on habit completion goals.
    *   Visualize challenge progress over time.
*   **Profile Management:**
    *   View user profile information (username, email, avatar).
    *   Edit profile: Update username and upload/remove avatar image (stored via Supabase Storage).
    *   Log out functionality.
*   **Modular Widgets:** (Many are placeholders for future development)
    *   **Todos:** Track daily tasks (UI placeholder).
    *   **AI Check-in:** Access AI guidance (UI placeholder).
    *   **Analytics:** View progress statistics (UI placeholder).
    *   **Wheel Tool:** Visualize life balance (UI placeholder).
    *   **Badges:** Earn achievements (UI placeholder).
    *   **Courses:** Access learning materials (UI placeholder).
    *   **Shop:** Browse related products/services (UI placeholder).
    *   **Ads/Promotions:** View special offers via a dismissible card and a carousel widget.
*   **AI Assistant:**
    *   Floating action button to open an AI Assistant chat drawer (basic UI).
*   **Notifications:**
    *   Dropdown menu to view notifications with a count indicator.
*   **Responsive Design:** Built with a mobile-first approach using Tailwind CSS.
*   **Theming:** Supports light and dark modes (defined via CSS variables).

## 🛠️ Tech Stack

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn/ui, Radix UI Primitives
*   **Icons:** Lucide React
*   **Backend & Database:** Supabase (Authentication, Database for profiles, Storage for avatars)
*   **Animation:** Framer Motion
*   **State Management:** React Hooks (`useState`, `useEffect`, `useContext`)
*   **Linting:** ESLint
*   **Code Formatting:** (Implicitly via ESLint/Prettier likely)

## 🚀 Getting Started

Follow these instructions to set up the project locally for development.

**Prerequisites:**

*   Node.js (Version specified in `package.json` or latest LTS recommended)
*   npm, yarn, or pnpm
*   A Supabase account (free tier available)

**Setup Steps:**

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up Supabase:**
    *   Create a new project on [Supabase](https://supabase.com/).
    *   Go to your project's **SQL Editor** and create the `profiles` table. You might need a schema like this (adapt based on `types/profile.ts` and `upsertProfile` usage):
        ```sql
        CREATE TABLE public.profiles (
          id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          username TEXT,
          avatar_url TEXT,
          created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
        );
        -- Enable Row Level Security (RLS)
        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
        -- Create policies for access (example: users can view/update their own profile)
        CREATE POLICY "Users can view their own profile." ON public.profiles FOR SELECT USING (auth.uid() = id);
        CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
        CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);
        ```
    *   Go to your project's **Storage** section and create a new bucket named `profiles`. Set appropriate access policies (e.g., public read access for avatars if desired, authenticated users can upload).
    *   Go to your project's **Authentication** -> **Providers** section and enable the providers you want (Email is enabled by default, enable Google if needed and configure credentials).
    *   Go to **Project Settings** -> **API**. Find your `Project URL` and `anon public` key.

4.  **Configure Environment Variables:**
    *   Create a file named `.env.local` in the root of the project.
    *   Add your Supabase URL and Anon Key to this file:
        ```.env.local
        NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
        NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
        ```
    *   Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with the actual values from your Supabase project settings.

5.  **Run the Development Server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

6.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📜 Available Scripts

In the project directory, you can run:

*   `npm run dev` or `yarn dev` or `pnpm dev`: Runs the app in development mode.
*   `npm run build` or `yarn build` or `pnpm build`: Builds the app for production.
*   `npm run start` or `yarn start` or `pnpm start`: Starts the production server.
*   `npm run lint` or `yarn lint` or `pnpm lint`: Lints the codebase using Next.js's built-in ESLint configuration.

---