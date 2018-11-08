# webpack + TypeScript + React: Part 1

Exploring moving from *ES2015* to *TypeScript* for frontend development with
*webpack* and *React*.

![](https://cdn-images-1.medium.com/max/800/1*r5m7BmHh7EvJL2TfO-bUKQ.jpeg)

I have been avoiding writing this article for some time; having invested heavily
in *JavaScript* *ES2015* and the tooling around it, I assumed that that a move
to [TypeScript](https://www.typescriptlang.org/) would be painful. The good news
is that, so far, my fears have been unfounded.

My recent interest in *TypeScript* stems my general interest in being more
rigorous in my development and from some recent challenges I ran into when
trying to adopt the *JavaScript* static type checker [Flow](https://flow.org/).
The biggest challenge being, finding quality (and documented) type definitions
for third-party libraries.

While I have an interest in exploring *TypeScript* for both backend and frontend
development, I am going to focus this series on the frontend (and with
[React](https://reactjs.org/) in particular). The important news is that the
*TypeScript* is compatible (they provide tutorials on it) with both
[webpack](https://webpack.js.org/)* *and *React*.

This series not a tutorial on *webpack*, *TypeScript, *or* React*, but rather
documenting my effort in creating (or more precisely re-creating) a frontend
development environment using them.

**note**: I have, separately, written extensively on *webpack* + *ES2015* +
*React *starting with the article [webpack By Example: Part
1](https://medium.com/front-end-hacking/webpack-by-example-part-1-1d07bc42006a)*.*

If you wish to follow along, you will need to install a recent version of
[Node.js](https://nodejs.org/en/) (I used version *8.9.4 LTS*). All of the
examples are also available for
[download](https://github.com/larkintuckerllc/webpack-typescript-patterns).

**hello**

Starting from an empty folder, we initialize the project and install the
required development dependencies.
```shellsession
    npm init
    npm install --save-dev webpack
    npm install --save-dev typescript
    npm install --save-dev awesome-typescript-loader
```

Observations:

* Compared to an *ES2015* project, we use the *typescript* package instead of
*babel-core* and *babel-preset-es2015* packages
* Similarly, we use the *awesome-typescript-loader* instead of *babel-loader*

Instead of a *.babelrc* file in *ES2015* projects, we use a *tsconfig.json* to
override the default *TypeScript* [compiler
options](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

*hello/tsconfig.json*
```javascript
{
  "compilerOptions": {
    "noImplicitAny": true,
    "target": "es5"
  }
}
```

Observations:

* We require the compiler to report errors on implied *any* types (a little fuzzy
about what this means; but it was in their tutorial)
* We output *ES5 JavaScript* (compiler defaults to *ES3*).

We configure *webpack* with a minimal configuration:

*hello/webpack.config.js*

```javascript
const path = require('path');

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader"
      },
    ]
  },
};
```

We create the HTML file to use:

*hello/public/index.html*
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

We then create the *TypeScript* file based on the tutorial [TypeScript in 5
Minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).

*hello/src/index.ts*
```typescript
class Student {
    fullName: string;
    constructor(
                  public firstName: string,
                  public middleInitial: string,
                  public lastName: string
                ) {
        this.fullName = `${firstName} ${middleInitial} ${lastName}`;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return `Hello, ${person.firstName} ${person.lastName}`;
}

const user = new Student('Jane', 'M.', 'User');
document.body.innerHTML = greeter(user);
```

Observations:

* Fixed the tutorial’s example by using *const* instead of *let* (never
reassigning the *user* variable).
* Changed to using single quotes instead of double quotes for string literals
(typically associate double quotes with *JSX*).
* Used *ES6* template strings (*TypeScript* extends *ES6*).

We then build the project with:
```shellsession
./node_modules/.bin/webpack
```

and manually (for now) copy over the *index.html* file:
```shellsession
cp public/index.html dist
```

We can test the project by opening the file *hello/dist/index.html* in a
browser.

**Next Steps**

The next step is to explore adding in third-party libraries, like *React*, in
[webpack + TypeScript + React: Part
2](https://medium.com/@johntucker_48673/webpack-typescript-react-part-2-366c102a760b).

* [JavaScript](https://codeburst.io/tagged/javascript?source=post)
* [Typescript](https://codeburst.io/tagged/typescript?source=post)
* [React](https://codeburst.io/tagged/react?source=post)
* [Web Development](https://codeburst.io/tagged/web-development?source=post)

By clapping more or less, you can signal to us which stories really stand out.

### [John Tucker](https://codeburst.io/@johntucker_48673)

Director of Engineering @ SharpSpring
