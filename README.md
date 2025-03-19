# strapi-media-deletion-middleware

Check if a media is used in any content before deleting it.

Works with strapi 4 and 5

## Getting started

Add `config/middleware.ts`

```ts
module.exports = ({ env }) => [
  // ...
  {
    resolve: '@openstudio/strapi-media-deletion-middleware',
    config: {
      strapiMajor: 4, // Strapi Major version in this project, possible values : 4 or 5
    },
  },
  // ...
];
```
