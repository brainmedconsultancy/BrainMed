export const COUNTRIES = ["Russia", "USA", "Georgia", "Kyrgyzstan", "UK", "China", "Singapore", "Malaysia", "Turkey"];
export const STATUSES = ["new", "contacted", "interested", "documents_pending", "applied", "enrolled", "rejected", "archived"];
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const validateForm = (data) => {
  if (!data.name?.trim()) return "Name is required.";
  if (!data.phone?.trim()) return "Phone is required.";
  
  const phoneDigits = data.phone.replace(/\D/g, "");
  if (phoneDigits.length !== 10) return "Phone must be exactly 10 digits.";
  
  if (!data.countryInterested) return "Country interested is required.";
  
  if (data.email?.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) return "Email format is invalid.";
  }
  
  return null;
};
