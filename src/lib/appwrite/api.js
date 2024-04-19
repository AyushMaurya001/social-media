import { ID, Query } from 'appwrite';
import { account, appwriteConfig, avatars, databases, storage } from "./config";

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
    
    const session = await account.createEmailSession(
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
    const cookieCallback = localStorage.removeItem('cookieCallback');
    return session || cookieCallback;
  } catch (e) {
    console.log(e);
  }
}

export async function getCurrentUser(){
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.equal('accountId', currentAccount.$id)
      ]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function uploadFile(file){
  try {

    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;

  } catch (e) {
    console.log(e);
  }
}

export async function deleteFile(fileId){
  try {
    
    await storage.deleteFile(
      appwriteConfig.storageId,
      fileId
    );

  } catch (e) {
    console.log(e);
  }
}

export async function getPreviewUrl(fileId){
  try {
    
    const fileUrl = await storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    )
    if (!fileUrl) throw Error;
    return fileUrl;

  } catch (e) {
    console.log(e);
  }
}

export async function createPost(payload){
  try {

    const uploadedFile = await uploadFile(payload.files[0]);
    if (!uploadedFile) throw Error;

    const previewUrl = await getPreviewUrl(uploadedFile.$id);
    if (!previewUrl){
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    const tags = payload.tags.replaceAll(" ", "").split(",");

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: payload.userId,
        caption: payload.caption,
        imageUrl: previewUrl,
        imageId: uploadedFile.$id,
        location: payload.location,
        tags: tags,
      }
    )
    if (!newPost){
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    console.log(newPost);
    return newPost;

  } catch (e){
    console.log(e);
  }
}

export async function updatePost(payload){

  const addedNewFile = payload.data.files.length;
  try {

    let imageData = {
      imageUrl: payload.post.imageUrl,
      imageId: payload.post.imageId,
    }

    if (addedNewFile){
      const uploadedFile = await uploadFile(payload.data.files[0]);
      if (!uploadedFile) throw Error;
      const previewUrl = await getPreviewUrl(uploadedFile.$id);
      if (!previewUrl){
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
      imageData.imageId = uploadedFile.$id;
      imageData.imageUrl = previewUrl;
    }

    const tags = payload.data.tags.replaceAll(" ", "").split(",");
    
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      payload.post.$id,
      {
        caption: payload.data.caption,
        imageUrl: imageData.imageUrl,
        imageId: imageData.imageId,
        location: payload.data.location,
        tags: tags,
      }
    )
    if (!updatedPost){
      await deleteFile(imageData.imageId);
      throw Error;
    }
    
    return updatedPost;

  } catch (e){
    console.log(e);
  }

}

export async function getRecentPosts(){
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"),Query.limit(20)]
    );
    // console.log(posts);
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function likePost(postId, likesArray){
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes: likesArray
      }
    )
    if (!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function savePost(postId, userId){
  try {
    const updatedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId
      }
    )
    if (!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSavedPost(savedPostId){
  try {
    const deletedSavedPost = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedPostId
    );
    if (!deletedSavedPost) throw Error;
    return {
      'status': 'ok'
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getPostById(postId){
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );
    if (!post) return {
      status: "error"
    };
    // console.log(post);
    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePost(payload){
  try {
    const deletedSave = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      payload.postId
    )
    return payload;
  } catch (error) {
    console.log(error);
  }
}