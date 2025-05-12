export const transformAcademicDetails = (academicDetials: any) => {
  const result: any[] = [];
 
  if (academicDetials?.detailsForTenthDTO) {
    result.push({
      exam: "High School",
      subject: "", // You can replace with real subject if available
      board: academicDetials.detailsForTenthDTO.tenthBoardName || "",
      school: academicDetials.detailsForTenthDTO.school || "",
      year: "", // Add year if available
      marks: academicDetials.detailsForTenthDTO.tenthMarksOrGrade || "",
      percentage: "", // Add calculated percentage if available
    });
  }
 
  if (academicDetials?.leadAcademicDetailsTwelfthDTO) {
    result.push({
      exam: "Intermediate",
      subject: "", // Replace with actual subject if available
      board: academicDetials.leadAcademicDetailsTwelfthDTO.twelveBoardName || "",
      school: academicDetials.leadAcademicDetailsTwelfthDTO.school || "",
      year: "", // Add year if available
      marks: academicDetials.leadAcademicDetailsTwelfthDTO.twelveMarksOrGrade || "",
      percentage: "", // Add calculated percentage if available
    });
  }
 
  if (academicDetials?.leadAcademicDetailsUGDTO) {
    result.push({
      exam: "Graduation",
      subject: "", // Replace if available
      board: academicDetials.leadAcademicDetailsUGDTO.universityName || "",
      school: academicDetials.leadAcademicDetailsUGDTO.collegeName || "",
      year: "", // Add year if available
      marks: academicDetials.leadAcademicDetailsUGDTO.totalMarks || "",
      percentage: academicDetials.leadAcademicDetailsUGDTO.percentage || "",
    });
  }
 
  if (academicDetials?.leadAcademicDetailsDiplomaDTO) {
    result.push({
      exam: "Diploma",
      subject: "", // Replace if available
      board: academicDetials.leadAcademicDetailsDiplomaDTO.boardName || "",
      school: academicDetials.leadAcademicDetailsDiplomaDTO.schoolName || "",
      year: "", // Add year if available
      marks: academicDetials.leadAcademicDetailsDiplomaDTO.marks || "",
      percentage: academicDetials.leadAcademicDetailsDiplomaDTO.percentage || "",
    });
  }
 
  return result;
};
 
 