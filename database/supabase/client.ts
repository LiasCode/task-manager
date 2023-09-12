import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://crdukdfgkdycchkgesrn.supabase.co";

const supabaseKey = process.env.NEXT_SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

export default supabase;
