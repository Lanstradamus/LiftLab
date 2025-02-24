import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uqmnmhpnrlgpldytdwlm.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxbW5taHBucmxncGxkeXRkd2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMzM0NjAsImV4cCI6MjA1NTYwOTQ2MH0.RxSS-brN8VudHSVwGOi0yn2U0qFWAPRo3WweMb_BPV4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
