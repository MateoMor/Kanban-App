'use client'

import PlusIcon from "../../icons/PlusIcon";
import { useEffect, useState } from "react";
import { Column, Id, Task } from "../../types";
import ColumnContainer from "./ColumnContainer";
import { getUserData } from "@/api/calls";
import { useRouter } from "next/navigation";


import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
interface Card {
  id: string,
  title: string,
  content: string,
  section_id: string
  position: number
}
interface Section {
  id: string,
  title: string,
  user_id: string,
  cards: Card[],
  position:number
}
interface UserData {
  sections: Section[]
}

function KanbanBoard() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect( () => {
    async function getData() {
      const token = localStorage.getItem("token");
      if (token){
        const fetchedUserData: UserData = await getUserData(token);

        // Ordenar las secciones por su posición
        fetchedUserData.sections.sort((a, b) => a.position - b.position);

        // Ordenar las cartas dentro de cada sección por su posición
        fetchedUserData.sections.forEach(section => {
          section.cards.sort((a, b) => a.position - b.position);
        });

        setUserData(fetchedUserData)
      }
      else {
        router.push('/login')
      }
    }
    getData()
  })

  if (userData === null) {router.push('/login'); return}

  //

  const [activeColumn, setActiveColumn] = useState<Section | null>(null);

  const [activeTask, setActiveTask] = useState<Card | null>(null);

  // Se activa cada vez que hay una modificación de las secciones
  // useEffect(() => {
  //   console.log("Columns: ", columns); 
  // }, [columns])

  // Se activa cada vez que hay una modificación de las secciones
  // useEffect(() => {
  //   console.log("Tasks: ", Object.keys(tasks) ,tasks); 
  // }, [tasks])
  

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div className=" m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px] " >
      
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={userData.sections.map((section: Section) => section.id)}>

              {userData.sections.map((section: Section) => (

                <ColumnContainer
                  key={section.id}
                  column={section}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={section.cards}
                />

              ))}
            </SortableContext>

          </div>

          {/* Crear nueva columna boton */}
          <button
            onClick={() => {
              createNewColumn();
            }}
            className=" h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2 "
          >

            <PlusIcon />
            Add Column
          </button>
        </div>

        {typeof document !== 'undefined' && createPortal(

          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={activeColumn.cards}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
















  function createTask(section_id: string) {

  }

  function deleteTask(id: string) {

  }

  function updateTask(id: string, content: string) {
 
  }

  function createNewColumn() {
    
  }

  function deleteColumn(id: string) {
 
  }

  function updateColumn(id: string, title: string) {

  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}


export default KanbanBoard;
