export const getDepartment = (assigneeId: number, department: any[]) => {
  const dept = department.find((item: any) => item.assigneeId === assigneeId);
  return dept?.name || "N/A";
};

export const getAssignee = (depName: string, department: any[]) => {
    const dept = department.find((item: any) => item.name === depName);
    return dept?.assigneeUsername || "N/A";
}