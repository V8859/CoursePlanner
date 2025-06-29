import { useEffect, useState } from "react";
import { ChevronDown, X, ChevronLast } from "lucide-react";
function EditableCourseItem({ course, onUpdate, onDelete }) {
  const [editingCode, setEditingCode] = useState(course.code);
  const [editingName, setEditingName] = useState(course.name);
  const [editingCredits, setEditingCredits] = useState(course.credits);

  useEffect(() => {
    setEditingCode(course.code);
    setEditingName(course.name);
    setEditingCredits(course.credits);
  }, [course.code, course.name, course.credits]);

  const handleUpdate = () => {
    onUpdate(course.id, editingCode, editingName, editingCredits);
  };

  const handleDelete = () => {
    onDelete(course.id);
  };

  return (
    <div className="border border-gray-200 p-2 mb-2 rounded-lg bg-white shadow-sm flex gap-1">
      <div className="flex justify-between items-center"></div>
      <input
        placeholder="Course Code"
        title="Course Code"
        value={editingCode}
        onChange={(e) => setEditingCode(e.target.value)}
        onBlur={handleUpdate}
        className="p-2 border border-gray-300 rounded-md w-[30%]"
      />
      <input
        placeholder="Course Name"
        title="Course Name"
        value={editingName}
        onChange={(e) => setEditingName(e.target.value)}
        onBlur={handleUpdate}
        className="p-2 border border-gray-300 rounded-md w-[50%]"
      />
      <input
        placeholder="Credit Points"
        title="Credit Points"
        value={editingCredits}
        onChange={(e) => setEditingCredits(e.target.value)}
        onBlur={handleUpdate}
        className="p-2 border border-gray-300 rounded-md w-[20%]"
      />
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white border-none rounded-md px-2 py-1 cursor-pointer text-sm hover:bg-red-600 transition-colors"
      >
        <X />
      </button>
    </div>
  );
}

function CourseManager({
  courses,
  onUpdateCourse,
  onAddCourse,
  onDeleteCourse,
}) {
  const [newCourseCode, setNewCourseCode] = useState("");
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseCredits, setNewCourseCredits] = useState("");
  const [collapse, setCollapse] = useState(true);

  const handleAddCourse = () => {
    if (newCourseCode || newCourseName || newCourseCredits) {
      onAddCourse({
        code: newCourseCode,
        name: newCourseName,
        credits: newCourseCredits,
      });
      setNewCourseCode("");
      setNewCourseName("");
      setNewCourseCredits("");
    } else {
      alert("Please fill at least one field for the new course.");
    }
  };

  return (
    <div
      className={`relative flex bg-inherit items-center justify-center h-fit ${
        collapse ? "w-[70rem]" : ""
      }`}
    >
      {!collapse && (
        <button className="cursor-pointer" onClick={() => setCollapse(true)}>
          <ChevronLast></ChevronLast>
        </button>
      )}
      {collapse && (
        <div className="p-4 border border-gray-200 rounded-lg bg-white w-[93%] my-4 shadow-2xl drop-shadow-xl">
          <button
            onClick={() => setCollapse(false)}
            className="top-4 cursor-pointer absolute right-4 z-[1000]"
          >
            <ChevronDown></ChevronDown>
          </button>
          <h2 className="mb-5 text-gray-800 text-2xl font-semibold">
            Course Manager
          </h2>
          <div className="mb-8 p-4 border border-dashed border-gray-400 rounded-lg bg-white">
            <h3 className="mb-3 text-gray-700 text-xl font-medium">
              Add New Course
            </h3>
            <div className="flex my-2 gap-1">
              <input
                placeholder="Code"
                value={newCourseCode}
                onChange={(e) => setNewCourseCode(e.target.value)}
                className="block w-[30%] p-2 rounded-md border border-gray-400"
              />
              <span className="block py-2 ">
                <strong>:</strong>
              </span>
              <input
                title="Course Name"
                placeholder="Course Name"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                className="block w-full p-2 rounded-md border border-gray-400"
              />
              <input
                title="Credits"
                placeholder="0"
                value={newCourseCredits}
                onChange={(e) => setNewCourseCredits(e.target.value)}
                className="block text-center focus:placeholder-transparent placeholder:text-center w-[10%] p-2 rounded-md border border-gray-400"
              />
            </div>

            <button
              onClick={handleAddCourse}
              className="bg-green-600 text-white border-none rounded-md px-4 py-2 cursor-pointer text-base w-full hover:bg-green-700 transition-colors"
            >
              Add Course
            </button>
          </div>

          <h3 className="mb-4 text-gray-800 text-xl font-medium">
            All Courses
          </h3>
          {courses.length === 0 ? (
            <p className="text-gray-600 text-center">No courses added yet.</p>
          ) : (
            courses.map((course) => (
              <EditableCourseItem
                key={course.id}
                course={course}
                onUpdate={onUpdateCourse}
                onDelete={onDeleteCourse}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default CourseManager;
