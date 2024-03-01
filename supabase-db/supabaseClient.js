const createClient = require("@supabase/supabase-js").createClient

const supabaseUrl = "https://lucfvsgvqjrznyarsrdb.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1Y2Z2c2d2cWpyem55YXJzcmRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5Njk2ODMsImV4cCI6MjAxODU0NTY4M30.mPa4ke8dL8VFltMZV8jhmvUw7soXc_FvzLSw6TOSG1U"

const otherOptions = {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
};

const supabaseInstance = createClient(supabaseUrl, serviceRoleKey, otherOptions);

module.exports = { supabaseInstance };