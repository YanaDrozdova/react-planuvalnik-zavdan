import { statusFilters } from "./constants";
import { createSelector } from "@reduxjs/toolkit";

export const getTasks = (state) => state.tasks.items;

export const getIsLoading = (state) => state.tasks.isLoading;

export const getError = (state) => state.tasks.error;

export const getStatusFilter = (state) => state.filters.status;

//

export const selectVisibleTasks = createSelector(
  [getTasks, getStatusFilter],
  (tasks, statusFilter) => {
    console.log("Calculating visible tasks. Now memoized!");

    switch (statusFilter) {
      case statusFilters.active:
        return tasks.filter((task) => !task.completed);
      case statusFilters.completed:
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }
);

// export const selectTaskCount = (state) => {
//   const tasks = getTasks(state);

//   return tasks.reduce(
//     (count, task) => {
//       if (task.completed) {
//         count.completed += 1;
//       } else {
//         count.active += 1;
//       }
//       return count;
//     },
//     { active: 0, completed: 0 }
//   );
// };

export const selectTaskCount = createSelector([getTasks], (tasks) => {
  console.log("Calculating task count. Now memoized!");

  return tasks.reduce(
    (count, task) => {
      if (task.completed) {
        count.completed += 1;
      } else {
        count.active += 1;
      }
      return count;
    },
    { active: 0, completed: 0 }
  );
});
