---
parent: Webpack + TypeScript + React
title: Part 4
nav_order: 1
---


# webpack + TypeScript + React: Part 4

We wrap up this series by exploring testing.

![](https://cdn-images-1.medium.com/max/800/1*zNvAqyswdWPZC86hq015lw.jpeg)

This article is part of a series starting with [webpack + TypeScript + React:
Part 1](https://codeburst.io/webpack-typescript-react-part-1-dc154e250f23). All
of the examples are also available for
[download](https://github.com/larkintuckerllc/webpack-typescript-patterns).

**Testing**

Was hoping that we can *Jest* to test our *TypeScript*; the good news is that
with a bit of work, we can.

**note**: This section’s material is based on the appropriate section of the
e-book[ TypeScript Deep Dive](https://basarat.gitbooks.io/typescript/). By the
way, I stopped writing this article for a couple of hours and started to read
through this e-book; **it is amazingly written**.

Starting from the previous example we install some packages:
```shellsession
npm install jest --save-dev
npm install @types/jest --save-dev
npm install ts-jest --save-dev
```

We also create:

*testing/jest.config.js*
```javascript
module.exports = {
  'roots': [
    '<rootDir>/src'
  ],
  'transform': {
    '.*\.tsx?$': 'ts-jest'
  },
  'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ]
}
```

Because *Jest* runs code (the whole point) it needs to be able to interpret
*TypeScript*; [ts-jest](https://github.com/kulshekhar/ts-jest) is a
pre-processor that converts *TypeScript* back to *JavaScript* to be used by
*Jest*.

First we create a simple module to test:

*testing/src/foo.ts*
```typescript
export const sum = (...a: number[]) => {
  return a.reduce((acc, val) => acc + val, 0);
}
```

and use it:

*testing/src/index.tsx*
```jsx
/* tslint:disable-next-line */
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

render(
  <App message="world" />,
  document.getElementById('root'),
);
```

We then write a test for the *foo* module and in particular the *sum* function.

*testing/src/foo.test.ts*
```jsx
import { sum } from './foo';

test('basic', () => {
  expect(sum()).toBe(0);
});

test('basic again', () => {
  expect(sum(1, 2)).toBe(3);
});
```

and we run our tests:
```shellsession
./node_modules/.bin/jest
```

**Smoke**

We next build a simple smoke test for *App.tsx*.

**note**: As this series is more about using *TypeScript* with *React* and
*webpack*, I assume that you are already familiar with testing with *Jest*. I
wrote a separate series on this if you are interested; [A Skeptics Guide to
Frontend Testing: Part
1](https://codeburst.io/a-skeptics-guide-to-frontend-testing-part-1-5de4806ad300).

First, I apparently missed the fact that because *Jest* is directly compiling
code (not using *webpack*), you [need to
handle](https://facebook.github.io/jest/docs/en/configuration.html#modulenamemapper-object-string-string)
non-*JavaScript* imports (like css and image files) appropriately.

*smoke/jest.config.js*
```javascript
module.exports = {
  //...
  moduleFileExtensions: [
    //...
  ],
}
```

*smoke/empty-module.js*
```javascript
module.exports = '';
```

Now we write our smoke test.

*smoke/components/App.test.tsx*
```jsx
/* tslint:disable-next-line  */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App message="Hello" />, div);
  unmountComponentAtNode(div);
});
```
and run:

```shellsession
./node_modules/.bin/jest
```

**Shallow**

In this next example, we use [Enzyme](https://github.com/airbnb/enzyme) to do
shallow rendering.
```shellsession
npm install enzyme --save-dev
npm install enzyme-adapter-react-16 --save-dev
npm install @types/enzyme --save-dev
npm install @types/enzyme-adapter-react-16 --save-dev
```

We now add an additional component to test and use it:

*shallow/src/components/Wow.tsx*
```jsx
/* tslint:disable-next-line */
import React from 'react';

export default function () {
  return (
    <h2>WOW</h2>
  );
}
```

*shallow/src/components/App.tsx*
```jsx
//...
import Wow from './Wow';
//...
export default function ({ message }: AppProps) {
  return (
    <div>
      <h1>Hello {message}</h1>
      <Button type="primary">Test</Button>
    </div>
  );
}
```

Now we can write our shallow test:

*shallow/src/components/Wow.test.tsx*
```jsx
/* tslint:disable-next-line */
import React from 'react';
/* tslint:disable-next-line */
import Enzyme, { shallow } from 'enzyme';
/* tslint:disable-next-line */
import Adapter from 'enzyme-adapter-react-16';
import Wow from './Wow';

Enzyme.configure({ adapter: new Adapter() });
it('shallow renders without crashing', () => {
  shallow(<Wow />);
});
```

We then run our tests:
```shellsession
./node_modules/.bin/jest
```

Finally, we make a couple of changes to support generating a meaningful coverage
report:

*shallow/jest.config.js*
```javascript
module.exports = {
  //...
  moduleNameMapper: {
    '\\.(css|jpg|png)$': '<rootDir>/empty-module.js',
  },
}
```

Observations:

* We include all the (non-test) *TypeScript* files in the *src* folder, except
*index.tsx*, into the coverage report.
* The file *index.tsx* is declarative; doesn’t make sense to unit test; this code
would be validated through an end-to-end test.

Running the following reports 100% test coverage:
```shellsession
./node_modules/.bin/jest --coverage
```

**Wrap Up**

At this point, we have covered much of the changes to our workflow to support
*TypeScript* (instead of only *JavaScript*) in our React and *webpack*
development environment.

At the same time, there is quite a number of additions that would have to be
made to finalize a true production-quality development environment; the changes
mostly being in improving on the *webpack* configuration.

**note**: I have written a number of articles on *webpack* configuration that
would serve as guidance; starting with [webpack By Example: Part
1](https://medium.com/front-end-hacking/webpack-by-example-part-1-1d07bc42006a).

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
