import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qsmwanjvfuxnjnevcicq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzbXdhbmp2ZnV4bmpuZXZjaWNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg3MjQ2NDksImV4cCI6MjA0NDMwMDY0OX0.goA2bkHuQ0SXsnOpk2wt8-nqtejkVehiPNWwowcJgFw";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
