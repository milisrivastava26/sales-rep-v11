export const transformAcademicDetails = (academicDetials: any) => {
  const result: any[] = [];
 
  if (academicDetials?.detailsForTenthDTO) {
    result.push({
      exam: "High School",
      subject: academicDetials.detailsForTenthDTO.stream, 
      board: academicDetials.detailsForTenthDTO.tenthBoardName || "",
      school: academicDetials.detailsForTenthDTO.school || "",
      year: academicDetials.detailsForTenthDTO.yearOfPassing, // Add year if available
      marks: academicDetials.detailsForTenthDTO.marksScored || "",
      percentage: academicDetials.detailsForTenthDTO.tenthMarksOrGrade, // Add calculated percentage if available
    });
  }
 
  if (academicDetials?.leadAcademicDetailsTwelfthDTO) {
    result.push({
      exam: "Intermediate",
      subject: academicDetials.leadAcademicDetailsTwelfthDTO.stream, 
      board: academicDetials.leadAcademicDetailsTwelfthDTO.twelveBoardName || "",
      school: academicDetials.leadAcademicDetailsTwelfthDTO.school || "",
      year: academicDetials.leadAcademicDetailsTwelfthDTO.yearOfPassing,
      marks: academicDetials.leadAcademicDetailsTwelfthDTO.marksScored || "",
      percentage: academicDetials.leadAcademicDetailsTwelfthDTO.twelveMarksOrGrade, // Add calculated percentage if available
    });
  }
 
  if (academicDetials?.leadAcademicDetailsUGDTO) {
    result.push({
      exam: "Graduation",
      subject: academicDetials.leadAcademicDetailsUGDTO.program, // Replace if available
      board: academicDetials.leadAcademicDetailsUGDTO.program || "",
      school: academicDetials.leadAcademicDetailsUGDTO.degree || "",
      year: academicDetials.leadAcademicDetailsUGDTO.yearOfPassing, // Add year if available
      marks: academicDetials.leadAcademicDetailsUGDTO.marksScored || "",
      percentage: academicDetials.leadAcademicDetailsUGDTO.marks || "",
    });
  }
 
  if (academicDetials?.leadAcademicDetailsDiplomaDTO) {
    result.push({
      exam: "Diploma",
      subject: academicDetials.leadAcademicDetailsDiplomaDTO.program, 
      board: academicDetials.leadAcademicDetailsDiplomaDTO.diplomaBoard || "",
      school: academicDetials.leadAcademicDetailsDiplomaDTO.school || "",
      year: academicDetials.leadAcademicDetailsDiplomaDTO.yearOfPassing , 
      marks: academicDetials.leadAcademicDetailsDiplomaDTO.marksScored || "",
      percentage: academicDetials.leadAcademicDetailsDiplomaDTO.marks || "",
    });
  }
 
  return result;
};
 
 