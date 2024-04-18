import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function timeFormat(date){
  const currentTime = new Date();
  const inputTime = new Date(date);

  const timeDiff = currentTime.getTime() - inputTime.getTime();
  
  const secondsDiff = timeDiff/1000;
  if (secondsDiff < 60){
    return `${Math.floor(secondsDiff)} seconds ago`
  } else if (secondsDiff < 60*60){
    return `${Math.floor(secondsDiff/60)} minutes ago`
  } else if (secondsDiff < 24*60*60){
    return `${Math.floor(secondsDiff/(60*60))} hours ago`
  } else {
    return `${Math.floor(secondsDiff/(60*60*24))} days ago`
  }
}

export function checkIsLiked(likesList, userId){
  return likesList.includes(userId);
}