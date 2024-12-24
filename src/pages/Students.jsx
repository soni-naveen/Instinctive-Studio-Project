import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import supabase from "../services/supabaseClient";
import { setStudents, deleteStudent } from "../store/studentSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Students() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id) => {
    const { error } = await supabase.from("Student").delete().match({ id });
    if (error) {
      console.error("Error deleting student:", error);
    } else {
      alert("Confirm to Delete Student!!");
      dispatch(deleteStudent(id));
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex min-h-[calc(100vh-100px)] justify-center items-center w-full">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="container mx-auto max-h-[calc(100vh-100px)] overflow-y-scroll p-4 mb-5">
          <h1 className="text-2xl font-bold mb-4">Students</h1>
          <h2 className="text-xl font-medium mb-2">Student List</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {students.map((student) => (
              <li
                key={student.id}
                className="bg-white shadow-md rounded-lg p-4 relative"
              >
                <button
                  onClick={() => handleDelete(student.id)}
                  className="absolute top-2 right-2 text-red-500 p-2 rounded-full"
                  aria-label="Delete student"
                >
                  <MdDelete className="text-xl" />
                </button>
                <div className="flex flex-col">
                  <p className="font-semibold text-lg mb-2">{student.name}</p>
                  <p className="text-sm sm:text-base">
                    <span className="font-medium">Cohort:</span>{" "}
                    {student.cohort}
                  </p>
                  <p className="text-sm sm:text-base">
                    <span className="font-medium">Courses:</span>{" "}
                    {student.courses.join(", ")}
                  </p>
                  <p className="text-sm sm:text-base">
                    <span className="font-medium">Date Joined:</span>{" "}
                    {new Date(student.dateJoined)
                      .toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      .replace(/ (\d{4})/, ", $1")}
                  </p>
                  <p className="text-sm sm:text-base">
                    <span className="font-medium">Last Login:</span>{" "}
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
                  </p>
                  <p className="text-sm sm:text-base">
                    <span className="font-medium">Status:</span>{" "}
                    {student.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
