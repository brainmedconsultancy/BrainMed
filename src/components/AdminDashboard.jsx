import { format } from "./formatDate";
import { LoaderCircle, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { logoutAdmin } from "../lib/auth";
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, updateDoc, doc, arrayUnion, where } from "firebase/firestore";
import { db } from "../lib/firebase";

const COUNTRIES = ["Russia", "USA", "Georgia", "Kyrgyzstan", "UK", "China", "Singapore", "Malaysia", "Turkey"];
const STATUSES = ["new", "contacted", "interested", "documents_pending", "applied", "enrolled", "rejected", "archived"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function AdminDashboard({ user }) {
  const [allStudents, setAllStudents] = useState([]);
  
  const [students, setStudents] = useState([]);
  const [studentStatus, setStudentStatus] = useState({ loading: true, error: "" });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditingStudent, setIsEditingStudent] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [countryFilter, setCountryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [exportMonth, setExportMonth] = useState(MONTHS[new Date().getMonth()]);
  const [stats, setStats] = useState({ total: 0, new: 0, interested: 0, applied: 0, enrolled: 0 });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    countryInterested: COUNTRIES[0]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState("");
  const [createError, setCreateError] = useState("");
  const [editError, setEditError] = useState("");

  const validateForm = (data) => {
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



  async function loadStudents(currentCountry = countryFilter, currentStatus = statusFilter) {
    setStudentStatus({ loading: true, error: "" });
    try {
      const q = query(collection(db, "students"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      let allResults = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setAllStudents(allResults);

      setStats({
        total: allResults.filter(s => s.status !== "archived").length,
        new: allResults.filter(s => s.status === "new").length,
        interested: allResults.filter(s => s.status === "interested").length,
        applied: allResults.filter(s => s.status === "applied").length,
        enrolled: allResults.filter(s => s.status === "enrolled").length,
      });

      let results = [...allResults];
      if (currentStatus !== "All") {
        results = results.filter(student => student.status === currentStatus);
      } else {
        results = results.filter(student => student.status !== "archived");
      }

      if (currentCountry !== "All") {
        results = results.filter(student => student.countryInterested === currentCountry);
      }

      setStudents(results);
      setStudentStatus({ loading: false, error: "" });
    } catch (error) {
      setStudentStatus({ loading: false, error: error.message || "Unable to load students." });
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  const handleQuickStatusUpdate = async (studentId, newStatus) => {
    try {
      await updateDoc(doc(db, "students", studentId), {
        status: newStatus
      });
      loadStudents();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    setCreateError("");
    const errorMsg = validateForm(formData);
    if (errorMsg) {
      setCreateError(errorMsg);
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "students"), {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        countryInterested: formData.countryInterested,
        source: "offline",
        status: "new",
        createdAt: serverTimestamp(),
        notes: ""
      });
      console.log("Student created successfully");
      setIsModalOpen(false);
      setFormData({ name: "", phone: "", email: "", countryInterested: COUNTRIES[0] });
      loadStudents();
    } catch (error) {
      console.error("Error creating student:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = () => {
    setIsEditingStudent(true);
    setEditFormData({
      name: selectedStudent.name || "",
      phone: selectedStudent.phone || "",
      email: selectedStudent.email || "",
      countryInterested: selectedStudent.countryInterested || COUNTRIES[0],
      status: selectedStudent.status || "new",
      notes: selectedStudent.notes || "",
      pucMarks: selectedStudent.pucMarks || "",
      entranceExamRank: selectedStudent.entranceExamRank || "",
      qualification: selectedStudent.qualification || "",
      yearOfPassing: selectedStudent.yearOfPassing || "",
      courseInterested: selectedStudent.courseInterested || "MBBS",
      intake: selectedStudent.intake || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setEditError("");
    const errorMsg = validateForm(editFormData);
    if (errorMsg) {
      setEditError(errorMsg);
      return;
    }
    setIsSubmitting(true);
    try {
      await updateDoc(doc(db, "students", selectedStudent.id), {
        name: editFormData.name,
        phone: editFormData.phone,
        email: editFormData.email,
        countryInterested: editFormData.countryInterested,
        status: editFormData.status,
        notes: editFormData.notes,
        pucMarks: editFormData.pucMarks,
        entranceExamRank: editFormData.entranceExamRank,
        qualification: editFormData.qualification,
        yearOfPassing: editFormData.yearOfPassing,
        courseInterested: editFormData.courseInterested,
        intake: editFormData.intake,
      });
      console.log("Student updated successfully");
      setIsEditingStudent(false);
      setSelectedStudent(null);
      loadStudents();
    } catch (error) {
      console.error("Error updating student:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStudent = async () => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }
    setIsSubmitting(true);
    try {
      await updateDoc(doc(db, "students", selectedStudent.id), {
        status: "archived"
      });
      console.log("Student archived successfully");
      setSelectedStudent(null);
      loadStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNoteText.trim()) return;
    setIsAddingNote(true);
    try {
      const newNote = {
        text: newNoteText.trim(),
        createdAt: new Date().toISOString()
      };
      await updateDoc(doc(db, "students", selectedStudent.id), {
        notesHistory: arrayUnion(newNote)
      });
      setSelectedStudent(prev => ({
        ...prev,
        notesHistory: [...(prev.notesHistory || []), newNote]
      }));
      setNewNoteText("");
      loadStudents();
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setIsAddingNote(false);
    }
  };

  const handleDeleteNote = async (noteToDelete) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const updatedNotes = (selectedStudent.notesHistory || []).filter(n => n.createdAt !== noteToDelete.createdAt);
      await updateDoc(doc(db, "students", selectedStudent.id), {
        notesHistory: updatedNotes
      });
      setSelectedStudent(prev => ({ ...prev, notesHistory: updatedNotes }));
      loadStudents();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleUpdateNote = async (originalNote) => {
    if (!editingNoteText.trim()) return;
    try {
      const updatedNotes = (selectedStudent.notesHistory || []).map(n => {
        if (n.createdAt === originalNote.createdAt) {
          return { ...n, text: editingNoteText.trim() };
        }
        return n;
      });
      await updateDoc(doc(db, "students", selectedStudent.id), {
        notesHistory: updatedNotes
      });
      setSelectedStudent(prev => ({ ...prev, notesHistory: updatedNotes }));
      setEditingNoteId(null);
      setEditingNoteText("");
      loadStudents();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleExportCSV = async () => {
    try {
      const year = new Date().getFullYear();
      const monthIndex = MONTHS.indexOf(exportMonth);
      const startDate = new Date(year, monthIndex, 1);
      const endDate = new Date(year, monthIndex + 1, 1);

      const q = query(
        collection(db, "students"), 
        where("createdAt", ">=", startDate),
        where("createdAt", "<", endDate),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        alert(`No students found for ${exportMonth} ${year}.`);
        return;
      }
      
      const headers = ["Name", "Phone", "Email", "Country Interested", "Status", "Source", "Created At"];
      
      const csvRows = [
        headers.join(","),
        ...querySnapshot.docs.map(docSnap => {
          const s = docSnap.data();
          const name = `"${(s.name || '').replace(/"/g, '""')}"`;
          const phone = `"${(s.phone || '').replace(/"/g, '""')}"`;
          const email = `"${(s.email || '').replace(/"/g, '""')}"`;
          const country = `"${(s.countryInterested || '').replace(/"/g, '""')}"`;
          const status = `"${(s.status || 'new').replace(/"/g, '""')}"`;
          const source = `"${(s.source || 'offline').replace(/"/g, '""')}"`;
          const createdAt = `"${s.createdAt ? format(s.createdAt) : ''}"`;
          return [name, phone, email, country, status, source, createdAt].join(",");
        })
      ];

      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `students_${exportMonth.toLowerCase()}_${year}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("Failed to export students. Please try again.");
    }
  };

  const inquiries = allStudents.filter(s => s.source === "online" && s.status === "new");

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel rounded-[2rem] p-6 shadow-panel md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-sm uppercase tracking-[0.35em] text-brand-600">Dashboard</p>
              <h1 className="mt-3 text-3xl font-bold text-ink md:text-4xl">Admin Dashboard</h1>
              <p className="mt-2 text-slate-600">Signed in as {user?.email}</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1">
                <select 
                  value={exportMonth} 
                  onChange={(e) => setExportMonth(e.target.value)}
                  className="rounded-full bg-transparent px-3 py-2 text-sm font-bold text-slate-700 outline-none"
                >
                  {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700 transition hover:bg-brand-100"
                >
                  Export CSV
                </button>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-700"
              >
                Create Student
              </button>
              <button
                type="button"
                onClick={logoutAdmin}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-brand-200 hover:text-brand-700"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
          <div className="rounded-[1.5rem] bg-white p-6 shadow-soft text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Total</p>
            <p className="mt-2 text-3xl font-bold text-brand-600">{stats.total}</p>
          </div>
          <div className="rounded-[1.5rem] bg-white p-6 shadow-soft text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-500">New</p>
            <p className="mt-2 text-3xl font-bold text-sky-600">{stats.new}</p>
          </div>
          <div className="rounded-[1.5rem] bg-white p-6 shadow-soft text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Interested</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">{stats.interested}</p>
          </div>
          <div className="rounded-[1.5rem] bg-white p-6 shadow-soft text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Applied</p>
            <p className="mt-2 text-3xl font-bold text-purple-600">{stats.applied}</p>
          </div>
          <div className="rounded-[1.5rem] bg-white p-6 shadow-soft text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Enrolled</p>
            <p className="mt-2 text-3xl font-bold text-emerald-600">{stats.enrolled}</p>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] bg-white p-6 shadow-soft md:p-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-bold text-ink">Inquiry Board</h2>
          </div>
          {studentStatus.loading ? (
            <div className="flex min-h-56 items-center justify-center">
              <LoaderCircle className="animate-spin text-brand-600" size={28} />
            </div>
          ) : inquiries.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-700">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Country</th>
                    <th className="px-4 py-3">Created Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-4 font-semibold text-ink">{inquiry.name}</td>
                      <td className="whitespace-nowrap px-4 py-4">{inquiry.phone}</td>
                      <td className="whitespace-nowrap px-4 py-4">{inquiry.countryInterested}</td>
                      <td className="whitespace-nowrap px-4 py-4">{format(inquiry.createdAt)}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-right flex gap-2 justify-end">
                        <button type="button" onClick={() => handleQuickStatusUpdate(inquiry.id, 'contacted')} className="rounded bg-sky-100 px-2 py-1 text-xs font-bold text-sky-700 hover:bg-sky-200">Contacted</button>
                        <button type="button" onClick={() => handleQuickStatusUpdate(inquiry.id, 'interested')} className="rounded bg-amber-100 px-2 py-1 text-xs font-bold text-amber-700 hover:bg-amber-200">Interested</button>
                        <button type="button" onClick={() => handleQuickStatusUpdate(inquiry.id, 'rejected')} className="rounded bg-rose-100 px-2 py-1 text-xs font-bold text-rose-700 hover:bg-rose-200">Reject</button>
                        <button type="button" onClick={() => setSelectedStudent(inquiry)} className="rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-[1.75rem] bg-slate-50 p-8 text-center">
              <p className="text-lg font-bold text-ink">No new inquiries.</p>
              <p className="mt-2 text-slate-600">New online leads from the website will appear here.</p>
            </div>
          )}
        </div>

        <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft md:p-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-bold text-ink">Students Directory</h2>
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <input
                type="text"
                placeholder="Search student by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-brand-500"
              />
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3">
                  <label htmlFor="countryFilter" className="text-sm font-bold text-slate-700">Filter by Country:</label>
                  <select 
                    id="countryFilter"
                    value={countryFilter}
                    onChange={(e) => {
                      setCountryFilter(e.target.value);
                      loadStudents(e.target.value, statusFilter);
                    }}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-brand-500"
                  >
                    <option value="All">All</option>
                    {COUNTRIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <label htmlFor="statusFilter" className="text-sm font-bold text-slate-700">Filter by Status:</label>
                  <select 
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      loadStudents(countryFilter, e.target.value);
                    }}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-brand-500"
                  >
                    <option value="All">All</option>
                    {STATUSES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          {studentStatus.loading ? (
            <div className="flex min-h-56 items-center justify-center">
              <LoaderCircle className="animate-spin text-brand-600" size={28} />
            </div>
          ) : studentStatus.error ? (
            <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {studentStatus.error}
            </div>
          ) : students.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-700">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Country</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Source</th>
                    <th className="px-4 py-3">Created Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students
                    .filter((student) => student.name?.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((student) => (
                    <tr 
                      key={student.id} 
                      onClick={() => setSelectedStudent(student)}
                      className="cursor-pointer border-b border-slate-100 transition hover:bg-slate-50/50"
                    >
                      <td className="whitespace-nowrap px-4 py-4 font-semibold text-ink">{student.name}</td>
                      <td className="whitespace-nowrap px-4 py-4">{student.phone}</td>
                      <td className="whitespace-nowrap px-4 py-4">{student.email}</td>
                      <td className="whitespace-nowrap px-4 py-4">{student.countryInterested}</td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold uppercase text-slate-700">
                          {student.status || "new"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 capitalize">{student.source || "offline"}</td>
                      <td className="whitespace-nowrap px-4 py-4">{format(student.createdAt)}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-right">
                        <button type="button" className="font-semibold text-brand-600 hover:text-brand-700 hover:underline">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-[1.75rem] bg-slate-50 p-8 text-center">
              <p className="text-lg font-bold text-ink">No students found.</p>
              <p className="mt-2 text-slate-600">Try adjusting your filters or search query, or click "Create Student" to add a new one.</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 50 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', minWidth: '300px' }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>Create Student</h2>
            {createError && <div style={{ padding: '0.75rem', marginBottom: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 'bold' }}>{createError}</div>}
            <form onSubmit={handleCreateStudent} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Phone</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Country Interested</label>
                <select name="countryInterested" value={formData.countryInterested} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                  {COUNTRIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '0.5rem 1rem', border: 'none', background: '#ccc', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={isSubmitting} style={{ padding: '0.5rem 1rem', border: 'none', background: '#0056b3', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedStudent && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 50, padding: '1rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', minWidth: '350px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Student Details</h2>
              {!isEditingStudent && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="button" onClick={handleEditClick} style={{ padding: '0.25rem 0.75rem', border: '1px solid #ccc', background: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem' }}>
                    Edit
                  </button>
                  <button type="button" onClick={handleDeleteStudent} disabled={isSubmitting} style={{ padding: '0.25rem 0.75rem', border: '1px solid #ef4444', background: '#fef2f2', color: '#ef4444', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem' }}>
                    {isSubmitting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              )}
            </div>
            
            {isEditingStudent ? (
              <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {editError && <div style={{ padding: '0.75rem', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 'bold' }}>{editError}</div>}
                
                {/* Basic Info */}
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e293b' }}>Basic Information</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666', fontSize: '0.875rem', fontWeight: 'bold' }}>Name</label>
                      <input required type="text" name="name" value={editFormData.name} onChange={handleEditChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666', fontSize: '0.875rem', fontWeight: 'bold' }}>Phone</label>
                      <input required type="tel" name="phone" value={editFormData.phone} onChange={handleEditChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666', fontSize: '0.875rem', fontWeight: 'bold' }}>Email</label>
                      <input type="email" name="email" value={editFormData.email} onChange={handleEditChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666', fontSize: '0.875rem', fontWeight: 'bold' }}>Country Interested</label>
                      <select name="countryInterested" value={editFormData.countryInterested} onChange={handleEditChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                        {COUNTRIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666', fontSize: '0.875rem', fontWeight: 'bold' }}>Status</label>
                      <select name="status" value={editFormData.status} onChange={handleEditChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                        {STATUSES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Academic Info */}
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e293b', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>Academic Information</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666', fontSize: '0.875rem', fontWeight: 'bold' }}>PUC / 12th Marks</label>
                      <input type="text" name="pucMarks" value={editFormData.pucMarks} onChange={handleEditChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666', fontSize: '0.875rem', fontWeight: 'bold' }}>Entrance Exam Rank</label>
                      <input type="text" name="entranceExamRank" value={editFormData.entranceExamRank} onChange={handleEditChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666', fontSize: '0.875rem', fontWeight: 'bold' }}>Qualification</label>
                      <input type="text" name="qualification" value={editFormData.qualification} onChange={handleEditChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666', fontSize: '0.875rem', fontWeight: 'bold' }}>Year of Passing</label>
                      <input type="text" name="yearOfPassing" value={editFormData.yearOfPassing} onChange={handleEditChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                  </div>
                </div>

                {/* Application Info */}
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e293b', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>Application Information</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666', fontSize: '0.875rem', fontWeight: 'bold' }}>Course Interested</label>
                      <select name="courseInterested" value={editFormData.courseInterested || "MBBS"} onChange={handleEditChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                        <option value="MBBS">MBBS</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666', fontSize: '0.875rem', fontWeight: 'bold' }}>Intake</label>
                      <input type="text" name="intake" value={editFormData.intake} onChange={handleEditChange} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e293b', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>Notes</h3>
                  <textarea name="notes" value={editFormData.notes} onChange={handleEditChange} rows={3} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setIsEditingStudent(false)} style={{ padding: '0.5rem 1rem', border: 'none', background: '#ccc', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" disabled={isSubmitting} style={{ padding: '0.5rem 1rem', border: 'none', background: '#0056b3', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {/* Basic Information */}
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>Basic Information</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div>
                        <strong style={{ display: 'block', color: '#666', fontSize: '0.875rem' }}>Name</strong>
                        <p style={{ margin: 0 }}>{selectedStudent.name || "Not provided"}</p>
                      </div>
                      <div>
                        <strong style={{ display: 'block', color: '#666', fontSize: '0.875rem' }}>Phone</strong>
                        <p style={{ margin: 0 }}>{selectedStudent.phone || "Not provided"}</p>
                      </div>
                      <div>
                        <strong style={{ display: 'block', color: '#666', fontSize: '0.875rem' }}>Email</strong>
                        <p style={{ margin: 0 }}>{selectedStudent.email || "Not provided"}</p>
                      </div>
                      <div>
                        <strong style={{ display: 'block', color: '#666', fontSize: '0.875rem' }}>Country Interested</strong>
                        <p style={{ margin: 0 }}>{selectedStudent.countryInterested || "Not provided"}</p>
                      </div>
                      <div>
                        <strong style={{ display: 'block', color: '#666', fontSize: '0.875rem' }}>Status</strong>
                        <p style={{ margin: 0, textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold' }}>{selectedStudent.status || "new"}</p>
                      </div>
                      <div>
                        <strong style={{ display: 'block', color: '#666', fontSize: '0.875rem' }}>Source</strong>
                        <p style={{ margin: 0, textTransform: 'capitalize' }}>{selectedStudent.source || "offline"}</p>
                      </div>
                      <div>
                        <strong style={{ display: 'block', color: '#666', fontSize: '0.875rem' }}>Created Date</strong>
                        <p style={{ margin: 0 }}>{selectedStudent.createdAt ? format(selectedStudent.createdAt) : "Not provided"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>Academic Information</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div>
                        <strong style={{ display: 'block', color: '#666', fontSize: '0.875rem' }}>PUC / 12th Marks</strong>
                        <p style={{ margin: 0 }}>{selectedStudent.pucMarks || "Not provided"}</p>
                      </div>
                      <div>
                        <strong style={{ display: 'block', color: '#666', fontSize: '0.875rem' }}>Entrance Exam Rank</strong>
                        <p style={{ margin: 0 }}>{selectedStudent.entranceExamRank || "Not provided"}</p>
                      </div>
                      <div>
                        <strong style={{ display: 'block', color: '#666', fontSize: '0.875rem' }}>Qualification</strong>
                        <p style={{ margin: 0 }}>{selectedStudent.qualification || "Not provided"}</p>
                      </div>
                      <div>
                        <strong style={{ display: 'block', color: '#666', fontSize: '0.875rem' }}>Year of Passing</strong>
                        <p style={{ margin: 0 }}>{selectedStudent.yearOfPassing || "Not provided"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Application Information */}
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>Application Information</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div>
                        <strong style={{ display: 'block', color: '#666', fontSize: '0.875rem' }}>Course Interested</strong>
                        <p style={{ margin: 0 }}>{selectedStudent.courseInterested || "Not provided"}</p>
                      </div>
                      <div>
                        <strong style={{ display: 'block', color: '#666', fontSize: '0.875rem' }}>Intake</strong>
                        <p style={{ margin: 0 }}>{selectedStudent.intake || "Not provided"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>Student Message</h3>
                    <div style={{ margin: 0, padding: '0.75rem', background: '#f8fafc', borderRadius: '4px', minHeight: '60px' }}>
                      {selectedStudent.notes || "Not provided"}
                    </div>
                  </div>

                  {/* Notes History */}
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>Notes History</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input 
                          type="text" 
                          placeholder="Write note..." 
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          style={{ flex: 1, padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                        <button 
                          type="button" 
                          onClick={handleAddNote}
                          disabled={isAddingNote || !newNoteText.trim()}
                          style={{ padding: '0.5rem 1rem', background: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          {isAddingNote ? 'Adding...' : 'Add Note'}
                        </button>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                        {(selectedStudent.notesHistory || [])
                          .slice()
                          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                          .map((note, index) => (
                            <div key={index} style={{ padding: '0.75rem', background: '#f1f5f9', borderRadius: '6px', borderLeft: '4px solid #0056b3' }}>
                              {editingNoteId === note.createdAt ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                  <textarea 
                                    value={editingNoteText} 
                                    onChange={(e) => setEditingNoteText(e.target.value)} 
                                    rows={2} 
                                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} 
                                  />
                                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                    <button type="button" onClick={() => setEditingNoteId(null)} style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                                    <button type="button" onClick={() => handleUpdateNote(note)} style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', background: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <p style={{ margin: 0, color: '#334155', fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>{note.text}</p>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                                    <small style={{ color: '#64748b', fontSize: '0.75rem' }}>
                                      {format(note.createdAt)}
                                    </small>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                      <button 
                                        type="button" 
                                        onClick={() => { setEditingNoteId(note.createdAt); setEditingNoteText(note.text); }}
                                        style={{ background: 'none', border: 'none', color: '#0056b3', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}
                                      >
                                        Edit
                                      </button>
                                      <button 
                                        type="button" 
                                        onClick={() => handleDeleteNote(note)}
                                        style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                        ))}
                        {(!selectedStudent.notesHistory || selectedStudent.notesHistory.length === 0) && (
                          <p style={{ color: '#94a3b8', fontSize: '0.875rem', fontStyle: 'italic', margin: 0 }}>No notes added yet.</p>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                  <button 
                    type="button" 
                    onClick={() => { setSelectedStudent(null); setIsEditingStudent(false); }} 
                    style={{ padding: '0.5rem 1.5rem', border: 'none', background: '#475569', color: 'white', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
