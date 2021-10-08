import collatedTasks from "../Constants/collectedTasks";

export const collectedTaskExist = (selectedProject) =>
  collatedTasks.find((task) => task.key === selectedProject);
