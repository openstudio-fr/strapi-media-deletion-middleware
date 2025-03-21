import { ConfigListElement, MediaMorphType } from './mediaMiddleware.types';

/**
 * Verify if the medias returned by the query can be deleted or not
 * regarding the config black and white lists
 * Returns the list of media that can't be deleted
 */
export const findNotDeletableMedia = (
  queriedMedias: MediaMorphType[],
  blackList: ConfigListElement[],
  whiteList: ConfigListElement[],
) => {
  return queriedMedias.filter((media) => {
    // First we check if the media can be deleted
    if (whiteList.length > 0) {
      if (
        whiteList.some(
          (deletableElement) =>
            deletableElement.relatedType === media.related_type &&
            deletableElement.field === media.field,
        )
      ) {
        // if this media can be deleted we remove it from the initial list
        return false;
      }
    }

    // If we don't have a whiteList or media is not in it we check the blacklist
    if (blackList.length > 0) {
      if (
        blackList.some(
          (protectedElement) =>
            protectedElement.relatedType === media.related_type &&
            protectedElement.field === media.field,
        )
      ) {
        // We found it in the blacklist so we can't delete it
        return true;
      }
      // Media is not in the blacklist, so it can be deleted
      return false;
    }
    // If no blackList is provided, no media are deletable when used
    return true;
  });
};
