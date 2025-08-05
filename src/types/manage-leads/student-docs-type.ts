export interface StudentDocsType {
  leadDocAttachmentIdV1: number;
  coreCareerDocumentsId: number;
  coreCareerDocumentsName: string;
  name: string;
  leadCaptureId: number;
  modifiedBy: string;
  status: string | null; // Allows for `null` or a string value
}
