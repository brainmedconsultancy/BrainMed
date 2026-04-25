import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

const COUNTRIES = ["Russia", "USA", "Georgia", "Kyrgyzstan", "UK", "China", "Singapore", "Malaysia", "Turkey"];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  countryInterested: COUNTRIES[0],
  marks: "",
};

export default function StudentInquiryForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await addDoc(collection(db, "students"), {
        name: form.name,
        phone: form.phone,
        email: form.email,
        countryInterested: form.countryInterested,
        pucMarks: form.marks, // Saving as pucMarks to map perfectly into your Admin Dashboard CRM
        courseInterested: "MBBS", // Kept this rule active!
        source: "online",
        status: "new",
        notes: "",
        notesHistory: [],
        createdAt: serverTimestamp(),
      });

      setForm(initialForm);
      setStatus({
        type: "success",
        message: "Your inquiry has been submitted successfully.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong while submitting your inquiry.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '0 auto', background: '#f8fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#1e293b' }}>Student Inquiry</h2>
      
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#475569', fontSize: '0.875rem' }}>Name</label>
        <input required type="text" name="name" value={form.name} onChange={updateField} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#475569', fontSize: '0.875rem' }}>Phone</label>
        <input required type="tel" name="phone" value={form.phone} onChange={updateField} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#475569', fontSize: '0.875rem' }}>Email</label>
        <input required type="email" name="email" value={form.email} onChange={updateField} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#475569', fontSize: '0.875rem' }}>Country Interested</label>
        <select required name="countryInterested" value={form.countryInterested} onChange={updateField} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}>
          {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#475569', fontSize: '0.875rem' }}>Marks (Optional)</label>
        <input type="text" name="marks" value={form.marks} onChange={updateField} placeholder="e.g. 90% in 12th" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      
      {status.message && (
        <div style={{ padding: '1rem', borderRadius: '4px', background: status.type === 'success' ? '#dcfce7' : '#fee2e2', color: status.type === 'success' ? '#166534' : '#991b1b', fontWeight: 'bold', fontSize: '0.875rem' }}>
          {status.message}
        </div>
      )}

      <button type="submit" disabled={submitting} style={{ marginTop: '0.5rem', padding: '0.75rem', background: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: submitting ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
        {submitting ? 'Submitting...' : 'Submit Inquiry'}
      </button>
    </form>
  );
}
