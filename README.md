# Mono repo boilerplate

* server - typeorm, type-graphql, typescript, postgresql, apollo-express...
* web - react, typescript.

```bash
yarn install
```

## Folder structure

```txt
README.md
package.json
lerna.json
packages/
    ├── server
    │   └── src
    │        ├── modules
    │        │    ├── common
    │        │    │    ├── models
    │        │    │    └── types
    │        │    │    ...
    │        │    ├── user
    │        │    │    ├── models
    │        │    │    ├── types
    │        │    │    └── resolvers
    │        │    ... // TODO
    │        ├── server.ts
    │        ├── entities.ts
    │        └── resolvers.ts
    ├── web           // TODO
    ├── common        // TODO
    └── ui            // TODO

```

inspired by, [benawad/monorepo-boilerplate](https://github.com/benawad/monorepo-boilerplate/tree/master/packages)

## NOTES

### Flow for Creating a New Package

[A Beginner's Guide to Lerna with Yarn Workspaces](https://medium.com/@jsilvax/a-workflow-guide-for-lerna-with-yarn-workspaces-60f97481149d)

New packages need to be created under the packages directory. Let’s create a dummy form package

```bash
cd packages
```

Once we’re in the correct directory, we can create and cd into our new package

```bash
mkdir my-design-system-form && cd my-design-system-form
```

then we create a new package.json by running yarn init:

```bash
yarn init
```

The new name should follow our NPM Org scope ex. @my-scope-name

It’s also important to have the new package start at a version like 0.0.0  
because once we do our first publish using Lerna,  
it’ll be published at 0.1.0 or 1.0.0.

```json
// package.json
{
  "name": "@my-scope-name/my-design-system-form",
  "version" : "0.0.0",
  "main" : "index.js"
}
```

If you have an NPM Org Account which supports private packages, you can add the following to your module’s individual package.json

```json
"publishConfig": {
    "access": "restricted"
}
```

### Adding a Local Sibling Dependency to a Specific Package

Now that we know the flow for creating new packages, let’s say we ended up with a structure like:

```txt
my-design-system/
    packages/
        my-design-system-core/
        my-design-system-form/
        my-design-system-button/
```

If we wanted to add the my-design-system-button as a dependency to our my-design-system-form and have Lerna symlink them, we can do so by cd into that package

```bash
cd my-design-system-form
```

and then running the following:

```bash
lerna add @my-scope-name/design-system-button --scope=@my-scope-name/my-design-system-form
```

This will update the package.json of @my-scope-name/my-design-system-form.

Our package.json should look like:

```json
// package.json
{
  "name": "@my-scope-name/my-design-system-form",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "@my-scope-name/my-design-system-button": "^1.0.0"
  }
}
```

Now you can reference this local dependency in index.js like

```javascript
import Button from '@my-scope-name/my-design-system-button';
```
