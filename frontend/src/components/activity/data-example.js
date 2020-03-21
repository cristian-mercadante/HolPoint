export const initialData = {
  activities: {
    "activity-1": { id: "activity-1", description: "descrizione1" },
    "activity-2": { id: "activity-2", description: "descrizione2" },
    "activity-3": { id: "activity-3", description: "descrizione3" },
    "activity-4": { id: "activity-4", description: "descrizione4" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "11/03/2020",
      actIds: ["activity-1", "activity-2", "activity-3", "activity-4"]
    },
    "column-2": { id: "column-2", title: "12/03/2020", actIds: [] },
    "column-3": { id: "column-3", title: "13/03/2020", actIds: [] },
    "column-4": { id: "column-4", title: "14/03/2020", actIds: [] },
    "column-5": { id: "column-5", title: "15/03/2020", actIds: [] },
    "column-6": { id: "column-6", title: "16/03/2020", actIds: [] }
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-5", "column-6"]
};

export const initialData2 = {
  activities: [
    { id: "1", description: "descrizione1" },
    { id: "2", description: "descrizione2" },
    { id: "3", description: "descrizione3" },
    { id: "4", description: "descrizione4" }
  ],
  columns: {
    "column-1": {
      id: "column-1",
      title: "11/03/2020",
      actIds: ["1", "2", "3", "4"]
    },
    "column-2": {
      id: "column-2",
      title: "12/03/2020",
      actIds: []
    },
    "column-3": {
      id: "column-3",
      title: "13/03/2020",
      actIds: []
    }
  },
  columnOrder: ["column-1", "column-2", "column-3"]
};
