// Components/Droppable.js
import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  return (
    <div className="bg-white text-black rounded my-2" ref={setNodeRef}>
      {props.children}
    </div>
  );
}
