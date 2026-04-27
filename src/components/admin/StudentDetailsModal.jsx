import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { db } from "../../lib/firebase";
import { format } from "../../utils/formatDate";
import { COUNTRIES, STATUSES, validateForm } from "./constants";

export default function StudentDetailsModal({ isOpen, student, onClose, onSuccess }) {
  const [isEditingStudent, setIsEditingStudent] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState("");

  useEffect(() => {
    if (isOpen && student) {
      setIsEditingStudent(false);
      setEditFormData({
        name: student.name || "",
        phone: student.phone || "",
        parentPhone: student.parentPhone || "",
        email: student.email || "",
        countryInterested: student.countryInterested || COUNTRIES[0],
        status: student.status || "new",
        notes: student.notes || "",
        pucMarks: student.pucMarks || "",
        entranceExamRank: student.entranceExamRank || "",
        qualification: student.qualification || "",
        yearOfPassing: student.yearOfPassing || "",
        courseInterested: student.courseInterested || "MBBS",
        intake: student.intake || "",
      });
      setNewNoteText("");
      setEditingNoteId(null);
      setEditingNoteText("");
    }
  }, [isOpen, student]);

  if (!isOpen || !student) return null;

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const errorMsg = validateForm(editFormData);
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }
    setIsSubmitting(true);
    try {
      await updateDoc(doc(db, "students", student.id), {
        name: editFormData.name,
        phone: editFormData.phone,
        parentPhone: editFormData.parentPhone,
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
      toast.success("Student updated successfully");
      setIsEditingStudent(false);
      onSuccess(); // reload parent
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Failed to update student.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStudent = async () => {
    if (!window.confirm("Are you sure you want to archive this student?")) {
      return;
    }
    setIsSubmitting(true);
    try {
      await updateDoc(doc(db, "students", student.id), {
        status: "archived"
      });
      toast.success("Student archived successfully");
      onSuccess(); // reload parent
      onClose(); // close modal
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to archive student.");
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
      await updateDoc(doc(db, "students", student.id), {
        notesHistory: arrayUnion(newNote)
      });
      toast.success("Note added successfully");
      setNewNoteText("");
      onSuccess();
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error("Failed to add note.");
    } finally {
      setIsAddingNote(false);
    }
  };

  const handleDeleteNote = async (noteToDelete) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const updatedNotes = (student.notesHistory || []).filter(n => n.createdAt !== noteToDelete.createdAt);
      await updateDoc(doc(db, "students", student.id), {
        notesHistory: updatedNotes
      });
      toast.success("Note deleted");
      onSuccess();
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note.");
    }
  };

  const handleUpdateNote = async (originalNote) => {
    if (!editingNoteText.trim()) return;
    try {
      const updatedNotes = (student.notesHistory || []).map(n => {
        if (n.createdAt === originalNote.createdAt) {
          return { ...n, text: editingNoteText.trim() };
        }
        return n;
      });
      await updateDoc(doc(db, "students", student.id), {
        notesHistory: updatedNotes
      });
      toast.success("Note updated");
      setEditingNoteId(null);
      setEditingNoteText("");
      onSuccess();
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-[2.5rem] bg-white shadow-2xl ring-1 ring-slate-200 flex flex-col"
          >
            {/* Header */}
            <div className="flex flex-col border-b border-slate-100 bg-slate-50/50 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8 md:py-6">
              <div className="mb-4 flex items-center justify-between md:mb-0">
                <h2 className="text-xl font-bold text-ink md:text-2xl">Student Profile</h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600 md:hidden"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                {!isEditingStudent && (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsEditingStudent(true)}
                      className="flex-1 items-center justify-center rounded-full bg-brand-50 px-4 py-2.5 text-xs font-bold text-brand-700 transition hover:bg-brand-100 md:px-5 md:py-2 md:text-sm"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteStudent}
                      disabled={isSubmitting}
                      className="flex-1 items-center justify-center rounded-full bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-600 transition hover:bg-rose-100 md:px-5 md:py-2 md:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Wait..." : "Archive"}
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="hidden rounded-full p-2 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600 md:block"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8">
              {isEditingStudent ? (
                <form onSubmit={handleSaveEdit} className="space-y-8">
                  <SectionTitle title="Basic Information" />
                  <div className="grid gap-5 md:grid-cols-2">
                    <InputField label="Full Name" name="name" value={editFormData.name} onChange={handleEditChange} required />
                    <InputField label="Phone" name="phone" type="tel" value={editFormData.phone} onChange={handleEditChange} required />
                    <InputField label="Parent/Father Number" name="parentPhone" type="tel" value={editFormData.parentPhone} onChange={handleEditChange} />
                    <InputField label="Email Address" name="email" type="email" value={editFormData.email} onChange={handleEditChange} />
                    <SelectField label="Country Interested" name="countryInterested" value={editFormData.countryInterested} onChange={handleEditChange} options={COUNTRIES} />
                    <SelectField label="Status" name="status" value={editFormData.status} onChange={handleEditChange} options={STATUSES} />
                  </div>

                  <SectionTitle title="Academic & Application" />
                  <div className="grid gap-5 md:grid-cols-2">
                    <InputField label="PUC / 12th Marks" name="pucMarks" value={editFormData.pucMarks} onChange={handleEditChange} placeholder="e.g. 92% or 540/600" />
                    <InputField label="Entrance Rank" name="entranceExamRank" value={editFormData.entranceExamRank} onChange={handleEditChange} placeholder="e.g. NEET 12000" />
                    <InputField label="Year of Passing" name="yearOfPassing" value={editFormData.yearOfPassing} onChange={handleEditChange} />
                    <InputField label="Intake" name="intake" value={editFormData.intake} onChange={handleEditChange} placeholder="e.g. Sept 2024" />
                    <div className="md:col-span-2">
                      <SelectField label="Course Interested" name="courseInterested" value={editFormData.courseInterested} onChange={handleEditChange} options={["MBBS"]} />
                    </div>
                  </div>

                  <SectionTitle title="Lead Notes" />
                  <textarea
                    name="notes"
                    value={editFormData.notes}
                    onChange={handleEditChange}
                    rows={4}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-800 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
                    placeholder="Add primary details about this lead..."
                  />

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditingStudent(false)}
                      className="rounded-full px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-full bg-brand-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-brand-700 shadow-lg shadow-brand-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-10">
                  {/* View Mode */}
                  <div>
                    <SectionTitle title="Information Summary" />
                    <div className="grid gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                      <DataPoint label="Name" value={student.name} />
                      <DataPoint label="Phone" value={student.phone} />
                      <DataPoint label="Parent" value={student.parentPhone} />
                      <DataPoint label="Email" value={student.email} className="col-span-2 md:col-span-1" />
                      <DataPoint label="Country" value={student.countryInterested} />
                      <DataPoint 
                        label="Status" 
                        value={
                          <span className="inline-flex rounded-full bg-brand-50 px-2.5 py-0.5 text-[10px] font-bold uppercase text-brand-700 ring-1 ring-inset ring-brand-600/20">
                            {student.status || "new"}
                          </span>
                        } 
                      />
                    </div>
                  </div>

                  <div className="grid gap-10 md:grid-cols-2">
                    <div>
                      <SectionTitle title="Academics" />
                      <div className="space-y-4">
                        <DataPoint label="12th Marks" value={student.pucMarks} />
                        <DataPoint label="Entrance Rank" value={student.entranceExamRank} />
                        <DataPoint label="Passing Year" value={student.yearOfPassing} />
                      </div>
                    </div>
                    <div>
                      <SectionTitle title="Application" />
                      <div className="space-y-4">
                        <DataPoint label="Course" value={student.courseInterested || "MBBS"} />
                        <DataPoint label="Intake" value={student.intake} />
                        <DataPoint label="Created" value={student.createdAt ? format(student.createdAt) : null} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <SectionTitle title="Original Inquiry" />
                    <div className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-600 italic border border-slate-100 break-words overflow-hidden">
                      {student.notes || "No initial message provided."}
                    </div>
                  </div>

                  {/* Notes History */}
                  <div className="space-y-6">
                    <SectionTitle title="Updates & Follow-ups" />
                    
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        type="text"
                        placeholder="Type a follow-up note..."
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        className="flex-1 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
                      />
                      <button
                        type="button"
                        onClick={handleAddNote}
                        disabled={isAddingNote || !newNoteText.trim()}
                        className="rounded-2xl bg-brand-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed sm:py-3"
                      >
                        {isAddingNote ? "Adding..." : "Add"}
                      </button>
                    </div>

                    <div className="space-y-4 pt-2">
                      {(student.notesHistory || [])
                        .slice()
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((note, index) => (
                          <div key={index} className="group relative rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md">
                            {editingNoteId === note.createdAt ? (
                              <div className="space-y-3">
                                <textarea
                                  value={editingNoteText}
                                  onChange={(e) => setEditingNoteText(e.target.value)}
                                  className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-brand-500"
                                  rows={3}
                                />
                                <div className="flex justify-end gap-2">
                                  <button onClick={() => setEditingNoteId(null)} className="text-xs font-bold text-slate-500">Cancel</button>
                                  <button onClick={() => handleUpdateNote(note)} className="text-xs font-bold text-brand-600">Save</button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap break-words">{note.text}</p>
                                <div className="mt-3 flex items-center justify-between border-t border-slate-50 pt-3">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    {format(note.createdAt)}
                                  </span>
                                  <div className="flex gap-4 opacity-0 transition group-hover:opacity-100">
                                    <button 
                                      onClick={() => { setEditingNoteId(note.createdAt); setEditingNoteText(note.text); }}
                                      className="text-[11px] font-bold text-brand-600 hover:underline"
                                    >
                                      Edit
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteNote(note)}
                                      className="text-[11px] font-bold text-rose-500 hover:underline"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </>
                              )}
                            </div>
                        ))}
                      {(!student.notesHistory || student.notesHistory.length === 0) && (
                        <div className="rounded-2xl border-2 border-dashed border-slate-100 py-8 text-center">
                          <p className="text-sm font-medium text-slate-400">No follow-up notes yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-4 flex justify-end md:px-8">
               <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-full bg-white border border-slate-200 px-8 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 shadow-sm md:w-auto md:py-2.5"
                >
                  Close
                </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Helper Components
function SectionTitle({ title }) {
  return <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">{title}</h3>;
}

function DataPoint({ label, value, className = "" }) {
  return (
    <div className={className}>
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink break-words">{value || "—"}</p>
    </div>
  );
}

function InputField({ label, ...props }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-600 ml-1">{label}</label>
      <input
        {...props}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-800 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
      />
    </div>
  );
}

function SelectField({ label, options, ...props }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-slate-600 ml-1">{label}</label>
      <select
        {...props}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-800 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

