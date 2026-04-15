# Sharvatex - Premium Saree Wholesale

A modern, fast, and elegant React + Vite eCommerce catalyst built with TailwindCSS and Supabase, tailored for wholesale saree business.

## Features Built

* **React (Vite):** blazing fast, component-based frontend architecture.
* **Tailwind CSS v4:** beautiful, custom-themed styling with premium design language (Deep Green, Gold, Cremes) and `Cormorant Garamond` typography.
* **Supabase Integration:** dynamic product fetching wired to `@supabase/supabase-js`.
* **WhatsApp Integration:** dynamically generated one-click WhatsApp pre-filled links for direct inquiries.
* **Routing:** `react-router-dom` handles graceful transitions between Home, Collections, login and dashboard.
* **Robust Admin Dashboard:** custom CMS allowing full CRUD control on the Supabase dataset with secure mock-login (`admin123`).

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Setup Supabase:**
   Create a `.env.local` file with your credentials:
   ```env
   VITE_SUPABASE_URL=your_project_url_here
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```
   *Run the following SQL in the Supabase SQL editor limit public read, insert and delete (for demo MVP features to work correctly):*
   ```sql
   CREATE TABLE products (
     id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
     created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
     name text NOT NULL,
     category text NOT NULL,
     price numeric NOT NULL,
     badge text,
     description text NOT NULL,
     emoji text DEFAULT '🥻'::text,
     specs jsonb
   );
   
   -- Enable Row Level Security MVP
   ALTER TABLE products ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "Public read access" ON products FOR SELECT USING (true);
   CREATE POLICY "Public insert access" ON products FOR INSERT WITH CHECK (true);
   CREATE POLICY "Public delete access" ON products FOR DELETE USING (true);
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```

Deploy securely on Vercel by ensuring your Build Command is `npm run build` with Output directory `dist` and that you map `.env` variables under Environment in the deployment dashboard.
