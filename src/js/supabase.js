import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ygwkvhysvevvmmgarpmm.supabase.co";
const supabaseKey = "sb_publishable_53hJrU1hyBZF7XXmUQNbPw_8WcFmdMH";

export const supabase = createClient(supabaseUrl, supabaseKey);
