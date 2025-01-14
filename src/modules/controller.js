import { deleteProject } from "./storage";

export function removeProject(id) {
  deleteProject(id);
}

export function isDueThisWeek(project) {
  const today = new Date();
  const startOfWeek = new Date(today);
  const endOfWeek = new Date(today);

  startOfWeek.setDate(today.getDate() - today.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);

  endOfWeek.setDate(today.getDate() - today.getDay() + 7);
  endOfWeek.setHours(23, 59, 59, 999);

  const projectDate = new Date(project.dueDate);

  return projectDate >= startOfWeek && projectDate <= endOfWeek;
}
export function isDueToday(project) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const todayFormatted = `${year}/${month}/${day}`;
  const projectDate = new Date(project.dueDate);
  const projectYear = projectDate.getFullYear();
  const projectMonth = String(projectDate.getMonth() + 1).padStart(2, "0");
  const projectDay = String(projectDate.getDate()).padStart(2, "0");

  const projectFormatted = `${projectYear}/${projectMonth}/${projectDay}`;
  return projectFormatted === todayFormatted;
}
