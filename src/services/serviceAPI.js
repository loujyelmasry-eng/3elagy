/**
 * Fetch services. Replace with your real API URL when backend is ready.
 */
export async function getServices() {
  try {
    const res = await fetch("/api/services");
    if (!res.ok) return [];
    return res.json();
  } catch {
    // Fallback when no API: return empty or mock data so the app runs locally
    return [];
  }
}
