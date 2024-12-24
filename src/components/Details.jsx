import React, { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../services/supabaseClient";
import { setStudents } from "../store/studentSlice";
import AddStudentForm from "./AddStudentForm";

export default function StudentTable() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("Student").select("*");
      if (error) {
        console.error("Error fetching students:", error);
        return;
      }
      const structuredData = data.map((student) => ({
        ...student,
        name: student.name,
        cohort: student.cohort,
        courses: student.courses.split(","),
        dateJoined: student.dateJoined,
        lastLogin: student.lastLogin,
        status: student.status,
      }));
      dispatch(setStudents(structuredData));
      setLoading(false);
    } catch (err) {
      console.error("Unexpected error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className="flex min-h-[calc(100vh-100px)] justify-center items-center w-full">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="bg-white px-6 py-4 overflow-y-scroll max-h-[calc(100vh-100px)] rounded-sm border border-gray-200 flex-1">
          <div className="flex justify-between items-center mb-4">
            <strong className="font-bold text-sm sm:text-lg">
              All Records
            </strong>
            <button
              onClick={() => {
                setShowForm(true);
              }}
              className="bg-slate-200 text-sm sm:text-base font-bold flex items-center gap-2 text-slate-600 px-2 py-1.5 sm:px-3 sm:py-2 rounded-md"
            >
              <MdAdd className="text-base sm:text-2xl " /> Add new Student
            </button>
          </div>
          {showForm && <AddStudentForm onClose={() => setShowForm(false)} />}
          <div className="overflow-x-auto mt-4 text-xs sm:text-base">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Student Name</th>
                  <th className="p-2 text-left">Cohort</th>
                  <th className="p-2 text-left">Courses</th>
                  <th className="p-2 text-left">Date Joined</th>
                  <th className="p-2 text-left">Last Login</th>
                  <th className="p-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="p-2 cursor-pointer">{student.name}</td>
                    <td className="p-2">{student.cohort}</td>
                    <td className="p-2">
                      {student.courses.slice(0, 3).map((course, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 bg-gray-100 text-sm px-1.5 py-1 rounded-md mr-2"
                        >
                          <img
                            src={`https://api.dicebear.com/9.x/initials/svg?seed=${course}&chars=1`}
                            alt={course}
                            className="w-5 h-5 rounded"
                          />
                          {course}
                        </span>
                      ))}
                    </td>
                    <td className="p-2">
                      {new Date(student.dateJoined)
                        .toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        .replace(/ (\d{4})/, ", $1")}
                    </td>
                    <td className="p-2">
                      {new Date(student.lastLogin)
                        .toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
                        .replace(/ (\d{4})/, ", $1")
                        .replace(/, (\d{1,2}:\d{2})/, " $1")
                        .replace("pm", "PM")
                        .replace("am", "AM")}
                    </td>
                    <td className="p-2 text-center">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${
                          student.status === "active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
