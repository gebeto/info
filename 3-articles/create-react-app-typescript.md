---
parent: Articles
title: TypeScript create-react-app
nav_order: 1
---


# TypeScript and React using create-react-app: A step-by-step guide to setting up
your first app

## Getting started on your first TypeScript and React app with zero configuration

![](https://cdn-images-1.medium.com/max/2000/1*Ukhx76VQ8E6JXEW7xfIzSA.png)

This tutorial will show you how to quickly get started building React
applications using TypeScript without needing any configuration by using
`create-react-app` (CRA). We will assume that you already have Node and NPM
installed on your machine. Your TypeScript/React app will work right out of the
box without needing to eject CRA. In addition, you will learn how to build your
own components and manage `props` and `state` using TypeScript.

> Visit JavaScript Feed — All the best JavaScript articles and tutorials from
> around the web in one place.
[https://javascriptfeed.com](https://javascriptfeed.com/).

### Install create-react-app

`create-react-app` is a command line tool that allows developers to easily
create new React apps with sensible defaults and zero configuration.
```shellsession
npm install -g create-react-app
```

### Initialize your React app with TypeScript

Invoke the `create-react-app` command with an additional TypeScript option to
generate a React application using TypeScript as the default JS syntax.
```shellsession
create-react-app my-app --scripts-version=react-scripts-ts
```

If you have used `create-react-app` before, this should look very familiar. The
additional piece of information is adding the
`--scripts-version=react-scripts-ts` flag.
[react-scripts-ts](https://www.npmjs.com/package/react-scripts-ts) is command
that tells CRA to use TypeScript instead of JavaScript and add the tools to make
it work immediately. This will generate the following files and folder
structure:

     | — — index.tsx
     | — — registerServiceWorker.ts
     | — — logo.svg
     | — — App.tsx
     | — — App.test.tsx
     | — — App.css
     | — — index.css
     | — — assets/

The following is an explanation of each part:

* `tsconfig.json` declares the TypeScript options. It sits at the root of a
TypeScript project and indicates the compiler settings and files to include.
* `tslint.json` is the linter settings to be used by
[TSLint](https://github.com/palantir/tslint).
* `public` is the folder of static assets that will be served such as the HTML
document and manifest file.
* `src` holds the app UI code. This includes our TypeScript components and CSS
styling. The traditional `index.js` file has been replaced by `index.tsx` as the
entry point.

### React types for TypeScript with declaration files

In addition to configuring the TypeScript compilation, we also receive all the
declaration files needed to use TypeScript with React. A declaration file is
used to describe the types of files written in native JavaScript — it can be
viewed as an interface between JavaScript and TypeScript. These files are
prefixed with the `@types` declaration. The `create-react-app` TypeScript
configuration ships with the following declaration files.

* `@types/jest`
* `@types/node`
* `@types/react`
* `@types/react-dom`

These are installed via NPM and can be found in your `package.json` folder.

### React modifications for TypeScript

To use React with TypeScript, you must make some minor modifications to how you
build a standard React app.

#### Use .tsx files for JSX

In addition to a new `.ts` file for TypeScript, there is also a new file
extension `.tsx`. This is the extension that you should use anytime you include
the JSX syntax in a React component file. You also need the `jsx` set to true
which is done by default. TypeScript is able to compile JSX directly into
JavaScript. For more information, you can review the [TypeScript docs on
JSX](https://www.typescriptlang.org/docs/handbook/jsx.html).

#### Importing React and ReactDOM

You may notice that in the default components use the following syntax:
```typescript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
```

You can no longer `import React from 'react';`. React is exported as a CommonJS
module which does not use a default export. At this point, it’s not imperative
to know exactly why, but to just be aware of how you should import React to make
it work. This also means that you declare you components as `class App extends
React.Component {...}`.

### Building components

One of the best parts about using TypeScript is that you no longer need to use
the `prop-types` package. There is a slight learning curve to using TypeScript
for props and state, but once you understand it, it’s much more powerful than
the React default methodology.

You will define a props `interface` for each of you components that you pass
props to. This declares the shape of the object and the types associated with
the keys. In addition, you must declare an interface for the `state` of class
components.

#### Stateless functional component

To demonstrate a functional component with props, we will replace the `<h1>`
header in `App.tsx` with our own `<Header/>` component. Start by creating
`Header.tsx`. It receives a prop `name` that will say hello to the person’s
name. Inside our file, we will create a functional component:

We start by importing React. Then we declare the `interface Props` with a single
string prop of `name?`. We will make the name optional, so we indicate that with
a `?`. Marking a key as optional means that its type can be either `string |
undefined`.

When we create the `Header` component, notice the `React.SFC<Props>`. The “SFC”
stands for stateless functional component. While this declaration is not
required, it is what allows us to use `defaultProps`. Finally, we declare the
`props` type as `Props` referencing the interface that we created.

#### Class component

To show the fundamentals of a class component, we will replace the `<p>`
description in `App.tsx` with a counter. One of the key differences between a
class and functional component is that a class component can maintain its own
state. The other primary difference is the ability to access lifecycle methods
which is outside the scope of this tutorial.

Create a `Description.tsx` file and add the following code.

We begin by declaring an interface for both the `Props` and `State`. There will
be an optional prop call `countBy` which will determine the increment value. The
component itself will maintain the `count` using its state.

The component is declared with the types `Props` and `State` as<br> `class
Description extends React.Component<Props, State> {` and the `defaultProps` are
declared as a static variable. The state is initialized with a `count` of 0.

The `increase` function is used to increment the counter. The `countBy` is
extracted as `const countBy: number = this.props.countBy!;`. The exclamation
mark `!` indicates to TypeScript that we know the value will exist and to not
throw a potential `undefined` error. Finally we create the HTML to wire up the
component.

#### Your final create-react-app with TypeScript components

Inside our `App.tsx` we import the components we just created and replace the
default HTML from CRA. The `name` prop and `countBy` prop must match the types
declared in the child component. Since the props are both optional, they can
also be undefined, and `defaultProps` will be used.

And that’s all you need to get started with TypeScript and React! Your
application should now have the new features and be fully running with
TypeScript.

If you’re interested in React and TypeScript follow the g[itconnected
publication](https://levelup.gitconnected.com/) for more of our upcoming
tutorials. We will show you how to build production quality React application
using TypeScript.

*****

*If you found this article helpful, please tap the *👏*. *[Follow
me](https://medium.com/@treyhuffine)* for more articles on React, Node.js,
JavaScript, and open source software! You can also find me on
*[Twitter](https://twitter.com/treyhuffine)* or
*[gitconnected](https://gitconnected.com/treyhuffine)*.*

### Recommend & Share
* [JavaScript](https://levelup.gitconnected.com/tagged/javascript?source=post)
* [React](https://levelup.gitconnected.com/tagged/react?source=post)
* [Typescript](https://levelup.gitconnected.com/tagged/typescript?source=post)
* [Web
Development](https://levelup.gitconnected.com/tagged/web-development?source=post)
* [Startup](https://levelup.gitconnected.com/tagged/startup?source=post)

By clapping more or less, you can signal to us which stories really stand out.

### [Trey Huffine](https://levelup.gitconnected.com/@treyhuffine)

Founder of [https://gitconnected.com](https://gitconnected.com/) — The community
for developers and software engineers.

### [gitconnected](https://levelup.gitconnected.com/?source=footer_card)

Our community publishes stories about software development, design, and data
science. gitconnected — The community for developers and software engineers
[https://gitconnected.com](https://gitconnected.com/)

Hi, great article but I have a question. What do you do when a library in
javascript doesn’t has the typescript definition (i.e. @types/some-library )?
How can I mix typescript components in react with javascript libraries? Or even
more, How can I mix typescript and javascript components in the same project?
Thanks,

Great question Matias. Another article in our publication actually covers that —
https://levelup.gitconnected.com/my-new-best-friend-typescript-2a5ca8399622

If you have anymore questions, let me know.
