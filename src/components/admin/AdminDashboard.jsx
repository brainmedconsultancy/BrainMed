import { format } from "../../utils/formatDate";
import { LoaderCircle, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { logoutAdmin } from "../../lib/auth";
import { collection, getDocs, query, orderBy, updateDoc, doc, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { COUNTRIES, STATUSES, MONTHS } from "./constants";
import CreateStudentModal from "./CreateStudentModal";
import StudentDetailsModal from "./StudentDetailsModal";

export default function AdminDashboard({ user }) {
  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentStatus, setStudentStatus] = useState({ loading: true, error: "" });
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  const [countryFilter, setCountryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [exportMonth, setExportMonth] = useState(MONTHS[new Date().getMonth()]);
  const [stats, setStats] = useState({ total: 0, new: 0, interested: 0, applied: 0, enrolled: 0 });
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
      
      // If a student is currently selected, update their data in the modal
      if (selectedStudent) {
        const updatedStudent = allResults.find(s => s.id === selectedStudent.id);
        if (updatedStudent) {
          setSelectedStudent(updatedStudent);
        } else {
          // If archived/deleted
          setSelectedStudent(null);
        }
      }

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
      
      const headers = ["Name", "Phone", "Parent Phone", "Email", "Country Interested", "Status", "Source", "Created At"];
      
      const csvRows = [
        headers.join(","),
        ...querySnapshot.docs.map(docSnap => {
          const s = docSnap.data();
          const name = `"${(s.name || '').replace(/"/g, '""')}"`;
          const phone = `"${(s.phone || '').replace(/"/g, '""')}"`;
          const parentPhone = `"${(s.parentPhone || '').replace(/"/g, '""')}"`;
          const email = `"${(s.email || '').replace(/"/g, '""')}"`;
          const country = `"${(s.countryInterested || '').replace(/"/g, '""')}"`;
          const status = `"${(s.status || 'new').replace(/"/g, '""')}"`;
          const source = `"${(s.source || 'offline').replace(/"/g, '""')}"`;
          const createdAt = `"${s.createdAt ? format(s.createdAt) : ''}"`;
          return [name, phone, parentPhone, email, country, status, source, createdAt].join(",");
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
                onClick={() => setIsCreateModalOpen(true)}
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

      <CreateStudentModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={() => loadStudents()} 
      />

      <StudentDetailsModal 
        isOpen={!!selectedStudent} 
        student={selectedStudent} 
        onClose={() => setSelectedStudent(null)} 
        onSuccess={() => loadStudents()} 
      />
    </div>
  );
}
