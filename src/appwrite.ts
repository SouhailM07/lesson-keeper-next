import { Client, Account, Storage } from "appwrite";

export const client = new Client();
export const storage = new Storage(client);

export const appwriteKeys = {
  endpointId: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
};

client.setEndpoint(appwriteKeys.endpointId).setProject(appwriteKeys.projectId); // Replace with your project ID

export const account = new Account(client);
export { ID } from "appwrite";
