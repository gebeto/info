# webpack + TypeScript + React: Part 3

We continue to explore this development environment; including linting.

![](https://cdn-images-1.medium.com/max/1600/1*KtC8Txt4_xtBxCMavLz68w.jpeg)

This article is part of a series starting with [webpack + TypeScript + React:
Part 1](https://codeburst.io/webpack-typescript-react-part-1-dc154e250f23). All
of the examples are also available for
[download](https://github.com/larkintuckerllc/webpack-typescript-patterns).

**Fix**

In the previous *React* example, we had a fairly simple *TypeScript* compiler
configuration. At the same time, we had some oddities, e.g., the way we had to
import *React*. Happened to learn about a *create-react-app*
[option](https://www.npmjs.com/package/react-scripts-ts) that provides a sample
*tsconfig.json *configuration that addresses several issues.

Starting from our previous *React* example, we update:

*fix/tsconfig.json*
```javascript
{
  "compilerOptions": {
    "jsx": "react",
    "noImplicitAny": true,
    "sourceMap": true,
    "target": "es5"
  },
}
```

Observations:

* The *module* and *moduleResolution* properties configure *TypeScript* to treat
modules as *ESNext* modules (really same as *ES2015* as far as I can tell) and
to use *node_modules* for third-party packages.
* The *allowSyntheticDefaultImports* property appears to enable *TypeScript* to
treat *CommonJS* modules as *ESNext* modules; allowing use to just use *import
React from ‘react’*.
* Finally, we exclude *node_modules* as we do not want to transpile third-party
modules.

Also, there are some issues with viewing web pages from the file-system; so we
can simply run the following from the *dist* folder (downloads, caches, and runs
a lightweight HTTP server).
```shellsession
npx http-server
```

**Ant**

Next we will explore a third-party library that inherently supports
*TypesScript*; does not require a separate type declarations; [Ant
Design](https://ant.design/).

First we need to support importing CSS files in our *webpack* build:
```shellsession
npm install css-loader --save-dev
npm install style-loader --save-dev
```

*ant/webpack.config.js*
```javascript
{
//...
module: {
  rules: [
    {
      test: /\.(ts|tsx)$/,
      loader: 'awesome-typescript-loader',
    },       
  ],
}
//...
}
```

We then install *Ant Design *and use it.*
```shellsession
npm install antd
```

*ant/src/components/App.tsx*
```jsx
import React from 'react';

interface AppProps {
  message: string,
};

export default function({ message }: AppProps ) {
  return (
    <div>
        <h1>Hello {message}</h1>
    </div>
  );
};
```

Just so happens that *Ant Design* is written in *TypeScript* and as such we
benefit with some compile time checking; for example, we can immediately see
that the *Button* component does not support the *bogus* property (either in the
editor or when compiling).

**note**: I was really expecting to find that we additionally would have JSX
autocomplete features in *Visual Studio Code; *I could not find a definitive
answer on this.

**note**: *Ant Design*, with some additional changes to *webpack*, supports both
a more streamlined import and theme customization; applying the feature as
described in the series starting with [Ant Design by Example: Part
1](https://codeburst.io/ant-design-by-example-part-1-f915e4a5547), we end up
with this
[example](https://github.com/larkintuckerllc/webpack-typescript-patterns/tree/master/ant-themed).

**Linting**

Having become accustomed to strong opinionated linting with
[ESLint](https://eslint.org/) and
[eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)*, *I
was happy to learn that there is [TSLint](https://palantir.github.io/tslint/)
and [tslint-config-airbnb](https://www.npmjs.com/package/tslint-config-airbnb).

**note**: From what I can tell, much (if not all) of the compiler linting
options are a duplication of what is available with *TSLint* and
*tslint-config-airbnb*.

Starting from our previous example we install and initialize *TSLint*.

```shellsession
npm install tslint --save-dev
./node_modules/.bin/tslint --init
```

Running *TSLint* with the default rules:
```shellsession
./node_modules/.bin/tslint -c tslint.json 'src/**/*.tsx'
```

generates quite a few errors:

    ERROR: src/components/App.tsx[1, 19]: ' should be "
    ERROR: src/components/App.tsx[2, 1]: Import sources within a group must be alphabetized.
    ERROR: src/components/App.tsx[2, 20]: ' should be "
    ERROR: src/components/App.tsx[3, 8]: ' should be "
    ERROR: src/components/App.tsx[5, 11]: interface name must start with a capitalized I
    ERROR: src/components/App.tsx[6, 20]: Properties should be separated by semicolons
    ERROR: src/components/App.tsx[7, 2]: Unnecessary semicolon
    ERROR: src/components/App.tsx[16, 1]: Missing semicolon
    ERROR: src/index.tsx[1, 19]: ' should be "
    ERROR: src/index.tsx[2, 24]: ' should be "
    ERROR: src/index.tsx[3, 17]: ' should be "
    ERROR: src/index.tsx[7, 29]: ' should be "

Let us next install the *AirBnb* rules:
```shellsession
npm install tslint-config-airbnb --save-dev
```
and update:

*linting/tslint.json*
```javascript
{
  "extends": "tslint-config-airbnb"
}
```

Running *TSLint* with these rules generates a lot (but different errors).

    Warning: The 'no-boolean-literal-compare' rule requires type information.
    Warning: The 'strict-boolean-expressions' rule requires type information.

    ERROR: src/components/App.tsx[1, 1]: Misnamed import. Import should be named 'react' but found 'React'
    ERROR: src/components/App.tsx[2, 1]: Misnamed import. Import should be named 'button' but found 'Button'
    ERROR: src/components/App.tsx[6, 1]: Expected indentation of 2 spaces but found 4.
    ERROR: src/components/App.tsx[6, 20]: Properties should be separated by semicolons
    ERROR: src/components/App.tsx[7, 2]: Unnecessary semicolon
    ERROR: src/components/App.tsx[8, 24]: Missing whitespace before function parens
    ERROR: src/components/App.tsx[8, 47]: there should be no spaces inside this paren.
    ERROR: src/components/App.tsx[9, 1]: Expected indentation of 2 spaces but found 4.
    ERROR: src/components/App.tsx[15, 2]: Unnecessary semicolon
    ERROR: src/index.tsx[1, 1]: Misnamed import. Import should be named 'react' but found 'React'

**note**: We also can
[enable](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
*TSLint* in *Visual Studio Code; *allows to lint as we edit.

Observations:

* The rules complain about not matching import names to import file, e.g., *import
React from ‘react’;* But because JSX implicitly needs React, we can disable this
warning with */* tslint:disable-next-line */*
* We have the same problem, *Button* vs. *button*, with imports from the *Ant
Design* library; seems that disabling the warning is the lesser of two evils
(want components to be capitalized)
* Also, went ahead and changed the automatic indentation to be two spaces in the
source (as well as set as the default in my editor).

**Next Steps**

In the next article,* *[webpack + TypeScript + React: Part
4](https://medium.com/@johntucker_48673/webpack-typescript-react-part-4-14582e9a33ce),
we will explore testing in this environment.

* [JavaScript](https://codeburst.io/tagged/javascript?source=post)
* [Typescript](https://codeburst.io/tagged/typescript?source=post)
* [Webpack](https://codeburst.io/tagged/webpack?source=post)
* [Web Development](https://codeburst.io/tagged/web-development?source=post)

By clapping more or less, you can signal to us which stories really stand out.

### [John Tucker](https://codeburst.io/@johntucker_48673)

Director of Engineering @ SharpSpring

### [codeburst](https://codeburst.io/?source=footer_card)

Bursts of code to power through your day. Web Development articles, tutorials,
and news.
