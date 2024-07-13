import { Context, useContext, useState, createContext } from "react";

const KanbanContext: Context<any> = createContext({});

interface Column {
  id: number;
  user_id: number;
  title: string;
  position: number;
}

interface Task {
  id: number;
  column_id: number;
  user_id: number;
  title: string;
  description: string;
  position: number;
  position_column: number;
}


export const KanbanProvider = ({ children }: { children: React.ReactNode }) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <KanbanContext.Provider value={{ columns, tasks, setColumns, setTasks }}>
      {children}
    </KanbanContext.Provider>
  );
};

// export use kanban with types

export const useKanban = () => {
  return useContext(KanbanContext) as {
    columns: Column[];
    tasks: Task[];
    setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  };
};