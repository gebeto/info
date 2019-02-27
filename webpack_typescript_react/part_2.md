---
title: Part 2
parent: Webpack + TypeScript + React
nav_order: 1
---


# webpack + TypeScript + React: Part 2

Having built our “hello world” *TypeScript* web application, we introduce
third-party libraries (in particular *React*).

![](https://cdn-images-1.medium.com/max/800/1*KtC8Txt4_xtBxCMavLz68w.jpeg)

This article is part of a series starting with [webpack + TypeScript + React:
Part 1](https://codeburst.io/webpack-typescript-react-part-1-dc154e250f23). All
of the examples are also available for
[download](https://github.com/larkintuckerllc/webpack-typescript-patterns).

**Source Map**

As we likely want to be able to use the browser’s development tools to debug our
*TypeScript*, we can include a source map. Starting from the previous example we
update:

*source-map/tsconfig.json*
```javascript
{
  "compilerOptions": {
    "noImplicitAny": true,
    "sourceMap": true, // new line
    "target": "es5"
  }
}
```

*source-map/webpack.config.js*
```javascript
{
  //...
  devtool: 'source-map', //new line
  module: {
    rules: []
  //...
  }
}
```

Now running the following will generate a *main.bundle.js.map* in the dist folder:
```shellsession
./node_modules/.bin/webpack
```

**React**

Let us now refactor our previous example into a *React* application.
```shellsession
npm install react
npm install react-dom
npm install @types/react
npm install @types/react-dom
```

Observations:

* First, you can shorten the previous command into a single line as *npm* can
accept multiple package names; broke apart in this article for clarity
* Installing versioned third-party declaration files is preferable compared to the
current state of affairs with *Flow;* where you have to check-in the
[third-party library
definitions](https://github.com/flowtype/flow-typed/blob/master/README.md) into
your repository.
* Not exactly sure why, but the *react-dom* declaration package depended on the
*node* one (no big deal, but odd).

Next we need to update:

*react/tsconfig.json*
```javascript
{
  "compilerOptions": {
    "noImplicitAny": true,
    "sourceMap": true,
    "target": "es5"
  }
}
```

Next we update:

*webpack.config.js*
```javascript
const path = require('path');

module.exports = {
output: {
  filename: '[name].bundle.js',
  path: path.resolve(__dirname, 'dist'),
},
devtool: 'source-map',
module: {
  rules: [
    {
      loader: 'awesome-typescript-loader',
    },
  ],
},
};
```

Observations:

* The official *TypeScript* [React &
webpack](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)
tutorial includes
[source-map-loader](https://www.npmjs.com/package/source-map-loader); did not
use in this example as it was not clear that it was necessary (confirmed that
the source maps were properly generated with this configuration).
* Their tutorial also uses the *webpack*
[externals](https://webpack.js.org/configuration/externals/) option using the
argument of keeping the vendor code out of the main bundle for download and
caching performance reasons. Given a proper bundle splitting *webpack*
configuration is is a non issue (this simple example, however, outputs a
monolithic bundle).

We add a *root* div to:

*react/public/index.html*
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>webpack TypeScript Patterns</title>
  </head>
  <body>
<script src="main.bundle.js"></script>
  </body>
</html>
```
We replace the *index.js* file with an *index.jsx* and include *App.jsx:*

*react/src/index.tsx*
```jsx
import * as React from 'react';
import { render } from 'react-dom';
import App from './components/App';

render(
    <App message="World" />,
    document.getElementById('root'),
);
```

*react/src/components/App.tsx*
```jsx
import * as React from 'react';

interface AppProps {
    message: string,
};

export default function({ message }: AppProps ) {
    return <h1>Hello {message}</h1>;
};
```

**note**: Apparently the use of *import * as React from ‘react’;* instead of the
more common *import React from ‘react’; *is due to a difference in opinion
between *TypeScript* and *Babel* on handling *CommonJS* modules.

As I am using an editor that supports *TypeScript* out of the box (the no-cost
[Visual Studio Code](https://code.visualstudio.com/)), I get some immediate
benefits from using *TypeScript*. As we have included the type declarations for
the third-party libraries, we get code completion.

Another interesting pattern with *TypeScript* is to **not** use the *React*
component’s *propTypes* property to enforce proper component usage (at
run-time). Instead, we use *TypeScript* for this purpose (the *interface
AppProps*). The big benefit of this is that we get these as compile-time errors.
Say we forget to provide the *message* property for the *App* component:

**note**: With *Visual Studio Code *we also see this same error while editing
the file.

To build and run we, as before, copy of the *index.html* file an run *webpack*.
```shellsession
cp public/index.html dist
./node_modules/.bin/webpack
```

We can then open *index.html* in a browser to see the resulting web application.

**Next Steps**

In the next article, [webpack + TypeScript + React: Part
3](https://medium.com/@johntucker_48673/webpack-typescript-react-part-3-82ce3000d25e),
we explore our linting options.

* [JavaScript](https://codeburst.io/tagged/javascript?source=post)
* [Typescript](https://codeburst.io/tagged/typescript?source=post)
* [React](https://codeburst.io/tagged/react?source=post)
* [Web Development](https://codeburst.io/tagged/web-development?source=post)

By clapping more or less, you can signal to us which stories really stand out.

### [John Tucker](https://codeburst.io/@johntucker_48673)

Director of Engineering @ SharpSpring

### [codeburst](https://codeburst.io/?source=footer_card)

Bursts of code to power through your day. Web Development articles, tutorials,
and news.
