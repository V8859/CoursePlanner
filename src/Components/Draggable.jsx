import React from "react";
import { useDraggable } from "@dnd-kit/core";

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        padding: "3px",
        backgroundColor: "#444f",
        cursor: "grab",
        borderRadius: "4px",
        zIndex: 1000,
      }
    : {
        padding: "3px",
        cursor: "grab",
        borderRadius: "4px",
      };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}
