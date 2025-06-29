import { useState, useEffect } from "react";

function Course({ courseData, onUpdate, alternate }) {
  const [editingCode, setEditingCode] = useState(courseData.code);
  const [editingName, setEditingName] = useState(courseData.name);
  const [editingCredits, setEditingCredits] = useState(courseData.credits);

  useEffect(() => {
    setEditingCode(courseData.code);
    setEditingName(courseData.name);
    setEditingCredits(courseData.credits);
  }, [courseData.code, courseData.name, courseData.credits]);

  const handleInputChange = (setter, e) => {
    const newValue = e.target.value;
    setter(newValue);
    let updatedCode = editingCode;
    let updatedName = editingName;
    let updatedCredits = editingCredits;

    if (setter === setEditingCode) {
      updatedCode = newValue;
    } else if (setter === setEditingName) {
      updatedName = newValue;
    } else if (setter === setEditingCredits) {
      updatedCredits = newValue;
    }

    onUpdate(updatedCode, updatedName, updatedCredits);
  };

  return (
    <div className="border border-gray-300 p-3 mb-[1px] rounded-md bg-white w-[93%] shadow-xl drop-shadow-xl">
      {!alternate ? (
        <div className="flex flex-col gap-1">
          <input
            className="p-1 border border-gray-300 rounded-sm w-full text-sm"
            placeholder="Course Code"
            value={editingCode}
            onChange={(e) => handleInputChange(setEditingCode, e)}
            onClick={(e) => e.stopPropagation()}
          />
          <input
            className="p-1 border border-gray-300 rounded-sm w-full text-sm"
            placeholder="Course Name"
            value={editingName}
            onChange={(e) => handleInputChange(setEditingName, e)}
            onClick={(e) => e.stopPropagation()}
          />
          <input
            className="p-1 border border-gray-300 rounded-sm w-full text-sm"
            placeholder="Credit Points"
            value={editingCredits}
            onChange={(e) => handleInputChange(setEditingCredits, e)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : (
        <div className="w-fit gap-1 p-1">
          <span className="text-wrap">{`${editingCode} : ${editingName} ${editingCredits} credits`}</span>
        </div>
      )}
    </div>
  );
}

export default Course;
