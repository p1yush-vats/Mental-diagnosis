export async function fetchLabelOptions() {
  const response = await fetch('https://mental-diagnosis.onrender.com/label-options');
  if (!response.ok) throw new Error('Failed to fetch label options');
  return await response.json();
}
