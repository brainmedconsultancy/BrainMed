import { format } from "../../utils/formatDate";
import { LoaderCircle, LogOut, Users, UserPlus, Star, FileText, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
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
    const loadingToast = toast.loading("Updating status...");
    try {
      await updateDoc(doc(db, "students", studentId), {
        status: newStatus
      });
      toast.success(`Status updated to ${newStatus}`, { id: loadingToast });
      loadStudents();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status", { id: loadingToast });
    }
  };

  const handleExportCSV = async () => {
    const loadingToast = toast.loading(`Preparing ${exportMonth} export...`);
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
        toast.error(`No students found for ${exportMonth} ${year}.`, { id: loadingToast });
        return;
      }
      
      const headers = [
        "Name", 
        "Phone", 
        "Parent Phone", 
        "Email", 
        "Country Interested", 
        "Course",
        "Intake",
        "Status", 
        "Marks (PUC/12th)",
        "Entrance Rank",
        "Passing Year",
        "Source", 
        "Lead Notes",
        "Created At"
      ];
      
      const csvRows = [
        headers.join(","),
        ...querySnapshot.docs.map(docSnap => {
          const s = docSnap.data();
          const name = `"${(s.name || '').replace(/"/g, '""')}"`;
          const phone = `"${(s.phone || '').replace(/"/g, '""')}"`;
          const parentPhone = `"${(s.parentPhone || '').replace(/"/g, '""')}"`;
          const email = `"${(s.email || '').replace(/"/g, '""')}"`;
          const country = `"${(s.countryInterested || '').replace(/"/g, '""')}"`;
          const course = `"${(s.courseInterested || 'MBBS').replace(/"/g, '""')}"`;
          const intake = `"${(s.intake || '').replace(/"/g, '""')}"`;
          const status = `"${(s.status || 'new').replace(/"/g, '""')}"`;
          const marks = `"${(s.pucMarks || '').replace(/"/g, '""')}"`;
          const rank = `"${(s.entranceExamRank || '').replace(/"/g, '""')}"`;
          const passingYear = `"${(s.yearOfPassing || '').replace(/"/g, '""')}"`;
          const source = `"${(s.source || 'offline').replace(/"/g, '""')}"`;
          const notes = `"${(s.notes || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`;
          const createdAt = `"${s.createdAt ? format(s.createdAt) : ''}"`;
          
          return [
            name, 
            phone, 
            parentPhone, 
            email, 
            country, 
            course,
            intake,
            status, 
            marks,
            rank,
            passingYear,
            source, 
            notes,
            createdAt
          ].join(",");
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
      
      toast.success("CSV exported successfully", { id: loadingToast });
    } catch (error) {
      console.error("Error exporting CSV:", error);
      toast.error("Failed to export students. Please try again.", { id: loadingToast });
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
            <div className="flex flex-wrap gap-3">
              <div className="flex flex-1 items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 sm:flex-initial">
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
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-brand-50 px-4 text-sm font-bold text-brand-700 transition hover:bg-brand-100"
                >
                  Export
                </button>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 px-5 text-sm font-bold text-white transition hover:bg-brand-700 sm:flex-initial"
              >
                Create Student
              </button>
              <button
                type="button"
                onClick={logoutAdmin}
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 transition hover:border-brand-200 hover:text-brand-700 sm:px-5"
                aria-label="Logout"
              >
                <LogOut size={16} />
                <span className="ml-2 hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5 lg:gap-6">
          <StatCard 
            label="Total" 
            value={stats.total} 
            icon={<Users className="text-brand-600" size={20} />} 
            color="bg-brand-50" 
            textColor="text-brand-600"
          />
          <StatCard 
            label="New" 
            value={stats.new} 
            icon={<UserPlus className="text-sky-600" size={20} />} 
            color="bg-sky-50" 
            textColor="text-sky-600"
          />
          <StatCard 
            label="Interested" 
            value={stats.interested} 
            icon={<Star className="text-amber-600" size={20} />} 
            color="bg-amber-50" 
            textColor="text-amber-600"
          />
          <StatCard 
            label="Applied" 
            value={stats.applied} 
            icon={<FileText className="text-purple-600" size={20} />} 
            color="bg-purple-50" 
            textColor="text-purple-600"
          />
          <StatCard 
            label="Enrolled" 
            value={stats.enrolled} 
            icon={<CheckCircle className="text-emerald-600" size={20} />} 
            color="bg-emerald-50" 
            textColor="text-emerald-600"
          />
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
          <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-2xl font-bold text-ink">Students Directory</h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
              <input
                type="text"
                placeholder="Search student..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-brand-500 sm:w-64"
              />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-3 sm:flex-initial">
                  <label htmlFor="countryFilter" className="whitespace-nowrap text-xs font-bold uppercase tracking-wider text-slate-400 sm:text-slate-700">Country:</label>
                  <select 
                    id="countryFilter"
                    value={countryFilter}
                    onChange={(e) => {
                      setCountryFilter(e.target.value);
                      loadStudents(e.target.value, statusFilter);
                    }}
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-brand-500 sm:flex-initial"
                  >
                    <option value="All">All</option>
                    {COUNTRIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-1 items-center gap-3 sm:flex-initial">
                  <label htmlFor="statusFilter" className="whitespace-nowrap text-xs font-bold uppercase tracking-wider text-slate-400 sm:text-slate-700">Status:</label>
                  <select 
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      loadStudents(countryFilter, e.target.value);
                    }}
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-brand-500 sm:flex-initial"
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

function StatCard({ label, value, icon, color, textColor }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-white p-5 shadow-soft border border-slate-50 transition hover:shadow-md md:p-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 md:text-xs">
            {label}
          </p>
          <p className={`mt-1 text-2xl font-bold md:text-3xl ${textColor}`}>
            {value}
          </p>
        </div>
      </div>
      {/* Decorative corner accent */}
      <div className={`absolute -right-2 -top-2 h-12 w-12 rounded-full opacity-10 blur-xl ${color}`} />
    </div>
  );
}
