import { storage, ID, appwriteKeys } from "@/appwrite";

export interface IUploadFile {
  $id: string;
  name: string;
  mimeType: string;
  fileUrl: string;
  filePreview: string;
}

export const uploadFile = async (file): Promise<IUploadFile> => {
  try {
    const { $id, name, mimeType } = await storage.createFile(
      appwriteKeys.bucketId,
      ID.unique(),
      file
      //   onProgress
    );
    let fileUrl = await downloadFile($id);
    let filePreview: any = await getFilePreview($id);
    return { $id, name, mimeType, fileUrl, filePreview };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteFile = async (fileId) => {
  try {
    await storage.deleteFile(appwriteKeys.bucketId, fileId);
    console.log("File deleted successfully");
  } catch (error) {
    console.log(error);
  }
};

export const editFile = async (file, fileId): Promise<IUploadFile> => {
  try {
    await deleteFile(fileId);
    let newFileData = await uploadFile(file);
    return newFileData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const downloadFile = async (fileId) => {
  try {
    const fileUrl: any = await storage.getFileDownload(
      appwriteKeys.bucketId,
      fileId
    );
    return fileUrl;
  } catch (error) {
    console.log(error);
  }
};

export const getFilePreview = async (fileId: string) => {
  try {
    const filePreview = await storage.getFileView(
      appwriteKeys.bucketId,
      fileId
    );
    return filePreview;
  } catch (error) {
    console.log(error);
  }
};
