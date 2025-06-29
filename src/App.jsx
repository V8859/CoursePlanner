import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "./Components/Draggable";
import { Droppable } from "./Components/Droppable";
import CourseManager from "./Components/CourseManager";
import Course from "./Components/Course";

import "./App.css";

function App() {
  const [coursesData, setCoursesData] = useState([
    { id: "1", code: "6203", name: "C programming", credits: "10" },
    {
      id: "2",
      code: "2013",
      name: "Fundamentals of programming",
      credits: "10",
    },
    { id: "3", code: "2407", name: "Discrete Mathematics", credits: "20" },
    { id: "4", code: "1044", name: "Calculus 1", credits: "10" },
    { id: "5", code: "2044", name: "Calculus 2", credits: "30" },
  ]);

  const [containers, setContainers] = useState(["1", "2", "3"]);

  const [droppedItems, setDroppedItems] = useState({});

  const updateCourseData = (id, newCode, newName, newCredits) => {
    setCoursesData((prevData) =>
      prevData.map((course) =>
        course.id === id
          ? { ...course, code: newCode, name: newName, credits: newCredits }
          : course
      )
    );
  };

  const addCourse = (newCourseDetails) => {
    const newId = `course-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    setCoursesData((prevData) => [
      ...prevData,
      { id: newId, ...newCourseDetails },
    ]);
  };

  const deleteCourse = (idToDelete) => {
    setCoursesData((prevData) =>
      prevData.filter((course) => course.id !== idToDelete)
    );
    setDroppedItems((prevDropped) => {
      const newDropped = { ...prevDropped };
      for (const containerId in newDropped) {
        newDropped[containerId] = newDropped[containerId].filter(
          (id) => id !== idToDelete
        );
      }
      return newDropped;
    });
  };

  const addContainer = () => {
    const newId = String(
      containers.length > 0 ? Math.max(...containers.map(Number)) + 1 : 1
    );
    setContainers((prevContainers) => [...prevContainers, newId]);
  };

  const deleteContainer = (idToDelete) => {
    setContainers((prevContainers) =>
      prevContainers.filter((id) => id !== idToDelete)
    );
    setDroppedItems((prevDropped) => {
      const newDropped = { ...prevDropped };
      delete newDropped[idToDelete];
      return newDropped;
    });
  };

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) {
      setDroppedItems((prev) => {
        const newDroppedItems = { ...prev };
        for (const containerId in newDroppedItems) {
          newDroppedItems[containerId] = newDroppedItems[containerId].filter(
            (id) => id !== active.id
          );
        }
        return newDroppedItems;
      });
      return;
    }

    const newContainerId = over.id;
    const draggableId = active.id;

    setDroppedItems((prev) => {
      const newDroppedItems = { ...prev };

      for (const containerId in newDroppedItems) {
        newDroppedItems[containerId] = newDroppedItems[containerId].filter(
          (id) => id !== draggableId
        );
      }

      if (!newDroppedItems[newContainerId]) {
        newDroppedItems[newContainerId] = [];
      }
      newDroppedItems[newContainerId].push(draggableId);

      return newDroppedItems;
    });
  }

  return (
    <>
      <div>
        <header className="bg-blue-100 text-xl p-4 rounded sticky top-0 z-[4000]">
          <span className="flex items-center">
            <img className="w-10 h-10" src="vite.svg"></img>
            <a href="/">Course Planner</a>
          </span>
        </header>
        <div className="flex items-start w-screen h-screen">
          <CourseManager
            courses={coursesData}
            onUpdateCourse={updateCourseData}
            onAddCourse={addCourse}
            onDeleteCourse={deleteCourse}
          />

          <DndContext onDragEnd={handleDragEnd}>
            <div className="flex-grow flex items-start justify-start h-screen">
              <div className="unassigned-draggables flex-col flex py-4 border-r border-gray-200 min-w-[15rem] p-4">
                <h3 className="text-black font-bold mb-4">
                  Unassigned Courses
                </h3>
                {coursesData.map((course) => {
                  const isInContainer = Object.values(droppedItems).some(
                    (ids) => ids.includes(course.id)
                  );
                  return !isInContainer ? (
                    <Draggable key={course.id} id={course.id}>
                      <Course
                        courseData={course}
                        onUpdate={(newCode, newName, newCredits) =>
                          updateCourseData(
                            course.id,
                            newCode,
                            newName,
                            newCredits
                          )
                        }
                      />
                    </Draggable>
                  ) : null;
                })}
              </div>

              <div className="flex flex-col flex-grow p-4">
                <div className="mb-4 flex items-center">
                  <h2 className="text-xl font-bold mr-4">
                    Trimesters/Semesters
                  </h2>
                  <button
                    onClick={addContainer}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow transition-colors"
                  >
                    Add Trimester/Semester
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {containers.map((containerId) => (
                    <div className="border-1 border-gray-700 p-1 rounded">
                      <Droppable key={containerId} id={containerId}>
                        <div className="flex justify-between items-center w-full mb-2">
                          <h3 className="text-black font-bold">{`Trimester/Semester ${containerId}`}</h3>
                          <button
                            onClick={() => deleteContainer(containerId)}
                            className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-2 rounded-md transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                        {droppedItems[containerId] &&
                          droppedItems[containerId].map((draggableId) => {
                            const course = coursesData.find(
                              (d) => d.id === draggableId
                            );
                            return course ? (
                              <Draggable key={course.id} id={course.id}>
                                <Course
                                  alternate={true}
                                  courseData={course}
                                  onUpdate={(newCode, newName, newCredits) =>
                                    updateCourseData(
                                      course.id,
                                      newCode,
                                      newName,
                                      newCredits
                                    )
                                  }
                                />
                              </Draggable>
                            ) : null;
                          })}
                        {(!droppedItems[containerId] ||
                          droppedItems[containerId].length === 0) && (
                          <p className="text-gray-400">Drop here</p>
                        )}
                      </Droppable>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DndContext>
        </div>
      </div>
    </>
  );
}

export default App;
