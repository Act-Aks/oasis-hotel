import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://obdblklzmkxcxebzcxvs.supabase.co'
// eslint-disable-next-line no-undef
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
