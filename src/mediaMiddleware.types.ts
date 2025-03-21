export type ConfigListElement = { relatedType: string; field: string };

/**
 * This middleware config parameters
 */
export type MediaMiddlewareConfigType = {
  strapiMajor?: number;
  blackList?: ConfigListElement[];
  whiteList?: ConfigListElement[];
};

/**
 * Strapi morph db table
 */
export type MediaMorphType = {
  id: number;
  file_id: number;
  related_id: number;
  related_type: string;
  field: string;
  order: number;
};
