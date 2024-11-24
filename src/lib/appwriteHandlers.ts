import { storage, ID, appwriteKeys } from "@/appwrite";

export const uploadFile = async (file) => {
  try {
    const { $id, name, mimeType } = await storage.createFile(
      appwriteKeys.bucketId,
      ID.unique(),
      file
      //   onProgress
    );
    let fileHref = await downloadFile($id);
    return { $id, name, mimeType, fileHref };
  } catch (error) {
    console.log(error);
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

export const editFile = async (fileId, file) => {
  try {
    await deleteFile(fileId);
    let newFileData = await uploadFile(file);
    return newFileData;
  } catch (error) {
    console.log(error);
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
