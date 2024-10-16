
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uvaveiynqvzqwaamrzbv.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2YXZlaXlucXZ6cXdhYW1yemJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4MjE5MTUsImV4cCI6MjA0NDM5NzkxNX0.C9IPvmwS6TB3Fcz-tUn2BhJINPmSR4OUqeASrZ0M0Uk"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;