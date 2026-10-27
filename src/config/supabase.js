/**
 * Projet Supabase de l'application. La clé « anon » est publique (elle est
 * aussi embarquée dans l'app) : la table n'accepte qu'un INSERT borné par RLS,
 * aucune lecture (migration 11 de l'app). Domaine autorisé dans la CSP
 * (connect-src de vercel.json).
 */
export const SUPABASE_URL = 'https://evnkseprfmellflfymtu.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2bmtzZXByZm1lbGxmbGZ5bXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMTQ2NDEsImV4cCI6MjA4NzU5MDY0MX0.1Kb98ENxsmi54VOgkwiAJ67nut43_gm7k2_QFo50p6Y';
