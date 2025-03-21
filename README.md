# strapi-media-deletion-middleware

Check if a media is used in any content before deleting it.

Works with strapi 4 and 5

## Install

```sh
npm i @openstudio/strapi-media-deletion-middleware
# Or
yarn add @openstudio/strapi-media-deletion-middleware
```

## Configuration

### Basic

Add in `config/middleware.ts`

```ts
module.exports = ({ env }) => [
  // ...
  {
    resolve: '@openstudio/strapi-media-deletion-middleware',
  },
  // ...
];
```

### Custom

To modify some default values add a config object with the config key you want to edit.

```ts
module.exports = ({ env }) => [
  // ...
  {
    resolve: '@openstudio/strapi-media-deletion-middleware',
    config: {
      strapiMajor: 4,
      blackList: [{ relatedType: 'api::article.article', field: 'cover' }],
      whiteList: [
        { relatedType: 'api::article.article', field: 'optionalField' },
      ],
    },
  },
  // ...
];
```

### Config parameters

| key         | description                                                                                                                          | default |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| strapiMajor | Strapi Major version in this project <br>possible values : 4 or 5                                                                    | 5       |
| blackList   | Specify a list of elements whose medias CAN'T be deleted, an empty list means everything is in the black list                        | []      |
| whiteList   | Specify a list of elements whose medias CAN be deleted, for instance if a media is in an optional field you might allow to delete it | []      |
