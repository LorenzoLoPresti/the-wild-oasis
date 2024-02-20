import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://goqelaurlzleuvuykflo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcWVsYXVybHpsZXV2dXlrZmxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NDQ3NjcsImV4cCI6MjAxNzUyMDc2N30.VW4CPgh-awmEHayHMTrYa-JiqaCCeS6YjWtb1YzkCWI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
