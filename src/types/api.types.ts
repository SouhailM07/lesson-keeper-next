export interface ILesson {
  name: string;
  moduleBy: any;
  file: {
    fileId: string;
    fileName: string;
    fileMimiType: string;
    fileUrl: string;
    filePreview: string;
  };
}
