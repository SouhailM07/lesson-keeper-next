export interface IFile {
  fileId: string;
  fileName: string;
  fileMimiType: string;
  fileUrl: string;
  filePreview: string;
}
export interface ILesson {
  name: string;
  moduleBy: any;
  file: IFile;
}
