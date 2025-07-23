export async function fetchLabelOptions() {
  const response = await fetch('http://localhost:5000/label-options');
  if (!response.ok) throw new Error('Failed to fetch label options');
  return await response.json();
}
