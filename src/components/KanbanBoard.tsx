import { useState } from "react";

// Define el tipo para una tarjeta individual
type Card = {
  id: string;
  section_id: string;
  title: string;
  content: string;
  position: number;
};

// Define el tipo para la estructura del objeto completo
type Column = {
  id: string;
  user_id: string;
  title: string;
  cards: Card[];
};

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "123",
      user_id: "345",
      title: "Titulo del elemento",
      cards: [
        {
          id: "123",
          section_id: "345",
          title: "titulo",
          content: "contenido",
          position: 123,
        },
      ],
    },
    {
      id: "13",
      user_id: "35",
      title: "Titulo del segundo elemento",
      cards: [
        {
          id: "143",
          section_id: "345",
          title: "titulo 2",
          content: "contenido 2",
          position: 123,
        },
      ],
    },
  ]);

  return (
    <div>
      {columns.map((col) => (
        <div>{col.title}</div>
      ))}
    </div>
  );
}

function createNewColumn() {
  const columnToAdd: Column = {
    id: "123",
    user_id: "345",
    title: "Titulo del elemento",
    cards: [
      {
        id: "123",
        section_id: "345",
        title: "titulo",
        content: "contenido",
        position: 123,
      },
    ],
  };
}

export default KanbanBoard;
