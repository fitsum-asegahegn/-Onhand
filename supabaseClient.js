const SUPABASE_URL = "https://dcbxecruynlbtfwbzkju.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_zV4sIl58hanoYCEoUQn46w_EfpdHvQT";

// Make supabase global
var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
