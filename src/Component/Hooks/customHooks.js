import { useState, useEffect } from "react";
import db from "../../firebase";
import { collectedTaskExist } from "../Helpers/helper";
import moment from "moment";

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = db
      .collection("tasks")
      .where("userId", "==", "ACUIC2DW1Pe4MSBFA74I");

    console.log("Unsubscribe before :: ", unsubscribe);

    // when there No collected Tasks for selectedProject i.e from "Inbox,today,next 7 days"-> Go through all the tasks
    // BASICALLY GO AND GET ME TASK
    unsubscribe =
      selectedProject && !collectedTaskExist(selectedProject)
        ? (unsubscribe = unsubscribe.where("projectId", "==", selectedProject))
        : selectedProject === "TODAY"
        ? (unsubscribe = unsubscribe.where(
            "data",
            "==",
            moment().format("DD/MM/YYYY")
            // Moment is NPM LIBRARY
          ))
        : selectedProject === "INBOX" || selectedProject === 0
        ? (unsubscribe = unsubscribe.where("date", "==", ""))
        : unsubscribe;

    console.log("Unsubscribe middle :: ", unsubscribe);

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((tast) => ({
        id: tast.id,
        ...tast.data(),
      }));
      console.log("Unsubscribe after :: ", unsubscribe);
      console.log("NewTask before :: ", newTasks);

      //   console.log("before filter set:: ", tasks);
      //   console.log("before filter set:: ", archivedTasks);

      setTasks(
        selectedProject === "NEXT_7"
          ? newTasks.filter(
              (task) =>
                moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                task.archieved !== true
              //check if task occurs in less than or equal to 7 days or not and also task is not archieved
            )
          : newTasks.filter((task) => task.archieved !== true)
        //   if not then
        //gives all the task which are not archieved(not equal to)
      );

      setArchivedTasks(newTasks.filter((task) => task.archieved === true));
      //gives all the archieved tasks

      //   console.log("after filter set:: ", tasks);
      //   console.log("after filter set:: ", archivedTasks);
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    db.collection("projects")
      .where("userId", "==", "ACUIC2DW1Pe4MSBFA74I")
      .orderBy("projectId")
      .onSnapshot((snapshot) => {
        const getAllProjects = snapshot.docs.map((projectData) => ({
          docId: projectData.id,
          ...projectData.data(),
        }));

        if (JSON.stringify(getAllProjects) !== JSON.stringify(projects)) {
          setProjects(getAllProjects);
        }
        //basically if we do not use if condintion then it will rerun in infinite loop as setproject =>will change [projects] value => which cause rerun the use Effects
      });
  }, [projects]);
  return { projects, setProjects };
};
