export const initialData = {
  tasks: {
    "task-1": { id: "task-1", description: "descrizione1" },
    "task-2": { id: "task-2", description: "descrizione2" },
    "task-3": { id: "task-3", description: "descrizione3" },
    "task-4": { id: "task-4", description: "descrizione4" }
  },
  columns: {
    "column-1": { id: "column-1", title: "11/03/2020", taskIds: ["task-1", "task-2", "task-3", "task-4"] },
    "column-2": { id: "column-2", title: "12/03/2020", taskIds: [] },
    "column-3": { id: "column-3", title: "13/03/2020", taskIds: [] }
  },
  columnOrder: ["column-1", "column-2", "column-3"]
};
