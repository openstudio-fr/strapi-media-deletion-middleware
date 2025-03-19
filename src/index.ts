/**
 * `media` middleware
 */
import { Core } from '@strapi/types';

const MediaMiddleware: Core.MiddlewareFactory<{ strapiMajor?: number }> = (
  config,
  { strapi },
) => {
  const tableName =
    config.strapiMajor === 4 ? 'files_related_morphs' : 'files_related_mph';

  return async (ctx, next) => {
    if (
      // Catch delete actions from media list
      ctx.request.method === 'POST' &&
      ctx.request?.url === '/upload/actions/bulk-delete'
    ) {
      const fileList = ctx.request.body?.fileIds;
      const result = await strapi.db.connection
        .queryBuilder()
        .select('*')
        .from(tableName)
        .whereIn('file_id', fileList);

      if (result.length > 0) {
        return ctx.badRequest('At least one media is used in a content');
      }
    } else if (
      // Catch delete actions from media detail modal
      ctx.request.method === 'DELETE' &&
      ctx.request.url.indexOf('/upload/files/') === 0
    ) {
      const fileId = ctx.request.url.split('/').pop();
      const result = await strapi.db.connection
        .queryBuilder()
        .select('*')
        .from(tableName)
        .where('file_id', fileId);

      if (result.length > 0) {
        return ctx.badRequest('This media is used in at least one content');
      }
    }
    await next();
  };
};

export default MediaMiddleware;
