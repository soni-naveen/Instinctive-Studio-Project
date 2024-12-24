import React, { useState } from "react";
import { useDispatch } from "react-redux";
import supabase from "../services/supabaseClient";
import { addStudent } from "../store/studentSlice";

export default function AddStudentForm({ onClose }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [cohort, setCohort] = useState("AY 2024-2025");
  const [courses, setCourses] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [status, setStatus] = useState("active");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const coursesArray =
      courses.split(",") ||
      courses.split(", ") ||
      courses.split(" ,") ||
      courses.split(" , ");
    const { error } = await supabase.from("Student").insert([
      {
        name,
        cohort,
        courses: coursesArray.join(", "),
        dateJoined,
        lastLogin,
        status,
      },
    ]);

    if (error) {
      console.error("Error adding student:", error);
    } else {
      dispatch(
        addStudent({
          name,
          cohort,
          courses: coursesArray,
          dateJoined,
          lastLogin,
          status,
        })
      );
      onClose();
      alert("Student added successfully!");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-sm w-full max-w-md mx-4"
      >
        <h2 className="font-semibold text-lg mb-2">Add new Student</h2>
        <div className="mb-2">
          <label className="block text-gray-600 mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-sm"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-600 mb-1">Cohort</label>
          <select
            name="cohort"
            value={cohort}
            onChange={(e) => setCohort(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-sm"
            required
          >
            <option value="AY 2024-2025">AY 2024-2025</option>
            <option value="AY 2023-2024">AY 2023-2024</option>
            <option value="AY 2022-2023">AY 2022-2023</option>
            <option value="AY 2020-2021">AY 2020-2021</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-gray-600 mb-1">
            Courses (maximum 3, comma separated)
          </label>
          <input
            type="text"
            name="courses"
            placeholder="e.g English, Hindi, Maths, Physics"
            value={courses}
            // onChange={(e) => setCourses(e.target.value)}
            onChange={(e) => {
              const enteredCourses = e.target.value
                .split(",")
                .map((course) => course.trim());
              if (enteredCourses.length <= 3) {
                setCourses(e.target.value);
              } else {
                alert("You can only add up to 3 courses.");
              }
            }}
            className="w-full p-2 border border-gray-300 rounded-sm"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-600 mb-1">Date Joined</label>
          <input
            type="date"
            name="dateJoined"
            value={dateJoined}
            onChange={(e) => setDateJoined(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-sm"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-600 mb-1">Last Login</label>
          <input
            type="datetime-local"
            name="lastLogin"
            value={lastLogin}
            onChange={(e) => setLastLogin(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-sm"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-600 mb-1">Status</label>
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-sm"
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex justify-end gap-5 mt-5">
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Student
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
