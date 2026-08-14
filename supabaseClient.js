// ============================================================
// Fill these in after creating your Supabase project:
// Supabase Dashboard → Project Settings → API
// ============================================================
const SUPABASE_URL = "https://dcbxecrunlbtfwbzkju.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjYnhlY3J1eW5sYnRmd2J6a2p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2NTU4NjIsImV4cCI6MjEwMjIzMTg2Mn0.3u1BDWlULCi622FN67zmB2Pgz_607xVov_-qpGMYklA";

var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------- Shared auth helpers, used by every page ----------

async function getCurrentProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  if (error) {
    console.error('Failed to load profile', error);
    return null;
  }
  return profile;
}

// Redirects to the right home page based on role. Call this on protected pages.
async function requireRole(expectedRole) {
  const profile = await getCurrentProfile();
  if (!profile) {
    window.location.href = 'index.html';
    return null;
  }
  if (profile.role !== expectedRole) {
    window.location.href = profile.role === 'owner' ? 'owner.html' : 'keeper.html';
    return null;
  }
  return profile;
}

async function signOut() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
}
window.getCurrentProfile = getCurrentProfile;
