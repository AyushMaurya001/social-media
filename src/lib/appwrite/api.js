import { ID } from 'appwrite';
import { account, appwriteConfig, avatars, databases } from "./config";
import { Query } from '@tanstack/react-query';

export async function createUserAccount(payload){
  try {

    const newAccount = await account.create(
      ID.unique(),
      payload.email,
      payload.password,
      payload.username,
    )
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(newAccount.name);
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: newAccount.email,
      imageUrl: avatarUrl,
    })
    return newUser;

  } catch (e){
    console.log(e);
    return null;
  }
}

export async function saveUserToDB(user){
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      // ID.unique(),
      user.accountId,
      user,
    )
    return newUser;
  } catch (e){
    console.log(e);
  }
}

export async function signinUserAccount(payload){
  try {
    
    const session = await account.createEmailPasswordSession(
      payload.email,
      payload.password,
    )
    return session;

  } catch (e) {
    console.log(e);
  }
}

export async function signOutUserAccount(payload){
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (e) {
    console.log(e);
  }
}

export async function getCurrentUser(){
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    // const currentUser = await databases.listDocuments(
    //   appwriteConfig.databaseId,
    //   appwriteConfig.userCollectionId,
    //   [
    //     Query.equal('accountId', currentAccount.$id)
    //   ]
    // )
    const currentUser = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      currentAccount.$id,
    )
    if (!currentUser) throw Error;
    return currentUser;
  } catch (e) {
    console.log(e);
  }
}