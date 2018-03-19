# Webpack 4 tutorial: All You Need to Know, from 0 Conf to Production Mode

![](https://cdn-images-1.medium.com/max/2000/1*dQA3VhfjIQc1DYua6KoLFQ.png)

The webpack team is working hard on the next generation of the popular module
bundler: **webpack 4**.

The following post is a living, breathing **introduction to webpack 4**. I’ll
update it as soon as new info will come in. [Stay tuned on my
blog](https://www.valentinog.com/blog/webpack-4-tutorial/) for more!

### webpack 4 as a zero configuration module bundler

webpack is powerful and has a lot of unique features but one of its pain point
is the **configuration file**.

Providing a configuration for webpack is not a big deal in medium to bigger
projects. You can’t live without one. Yet, for smaller ones it’s kind of
annoying, especially when you want to kickstart some toy app.

That’s why [Parcel gained a lot of
traction](https://www.valentinog.com/blog/tutorial-react-parcel-bundler/).

Sean and the webpack team are going to change that: **webpack 4 doesn’t need a
configuration file by default**!

Let’s try that out.

Create a new directory and move into it:

    mkdir webpack-4-quickstart && cd $_

Initialize a package.json by running:

    npm init -y

Now let’s pull webpack 4 in.

    npm i webpack --save-dev

We need **webpack-cli** also, which lives as a separate package:

    npm i webpack-cli --save-dev

Now open up [package.json](https://docs.npmjs.com/files/package.json) and add a
build script:

    "scripts": {
       "build": "webpack"
    }

Close the file and save it.

Try to run:

    npm run build

and see what happens:

    ERROR in Entry module not found: Error: Can't resolve './src' in '~/webpack-4-quickstart'

webpack 4 is looking for an entry point in **./src**! If you don’t know what
that means go check out my previous article on [switching from Gulp to
webpack](https://www.valentinog.com/blog/from-gulp-to-webpack-quickstart/).

In brief: the **entry point** is the file webpack looks for to start building
your Javascript bundle.

In the previous version of webpack the entry point has to be defined inside a
configuration file named webpack.config.js.

But starting from **webpack 4 there is no need to define the entry point**: it
will take **./src/index.js** as the default!

Testing the new feature is easy. Create `./src/index.js`:

    console.log(`I'm a silly antry point`);

and run the build again:

    npm run build

You will get the bundle in `~/webpack-4-quickstart/dist/main.js`.

What? Wait a moment. There is no need to define the output file? Exactly.

In **webpack 4 there is no need to define neither the entry point, nor the
output file**.

I know that for a lot of people that’s not so exciting. Webpack’s main strength
is code splitting. But trust me, having a zero configuration tool speeds things
up.

So here is the first news: **webpack 4 doesn’t need a configuration file**.

It will look in **./src/index.js** as the default entry point. Moreover, it will
spit out the bundle in **./dist/main.js**.

In the next section we’ll see another nice feature of webpack 4: **production
and development mode**.

### webpack 4: production and development mode

![](https://cdn-images-1.medium.com/max/800/1*ihvQSUEkg-5hruIymfVGbw.png)

Having 2 configuration files is a common pattern in webpack.

A tipical project may have:

* a **configuration file for development**, for defining webpack dev server and
other stuff
* a **configuration file for production**, for defining **UglifyJSPlugin**,
sourcemaps and so on

While bigger projects may still need 2 files, in webpack 4 you can get by
without a single line of configuration.

How so?

webpack 4 introduces **production** and **development** mode.

In fact if you pay attention at the output of `npm run build`you’ll see a nice
warning:

![](https://cdn-images-1.medium.com/max/1000/1*Kb3J8gWzX3Bxev5su0-0rA.png)

*The ‘mode’ option has not been set. Set ‘mode’ option to ‘development’ or
‘production’ to enable defaults for this environment.*

What does that mean? Let’s see.

Open up [package.json](https://docs.npmjs.com/files/package.json) and fill the
script section like the following:

    "scripts": {
        "dev": "webpack --mode development",
        "build": "webpack --mode production"
      }

Now try to run:

    npm run dev

and take a look at **./dist/main.js**. What do you see? Yes, I know, a boring
bundle… not minified!

Now try to run:

    npm run build

and take a look at **./dist/main.js**. What do you see now? A **minified
bundle**!

Yes!

**Production mode** enables all sorts of optimizations out of the box. Including
minification, scope hoisting, tree-shaking and more.

Development mode on the other hand is optimized for speed and does nothing more
than providing an un-minified bundle.

So here is the second news: webpack 4 introduces **production** and
**development** mode.

In webpack 4 you can get by without a single line of configuration! Just define
the `--mode`flag and you get everything for free!

Stay tuned! More coming soon…

*This is a living, breathing introduction to webpack 4. Stay tuned on *[my
blog](https://www.valentinog.com/blog/webpack-4-tutorial/)* for more!*

### webpack 4: resources

A Github repo for the tutorial =>
[webpack-4-quickstart](https://github.com/valentinogagliardi/webpack-4-quickstart)

I know there’s already an awesome webpack list but here’s mine: a list of
awesome resources about webpack 4 =>
[awesome-webpack-4](https://github.com/valentinogagliardi/awesome-webpack-4)

*****

*Originally published at
*[www.valentinog.com](https://www.valentinog.com/blog/webpack-4-tutorial/)* on
January 19, 2018.*

* [JavaScript](https://hackernoon.com/tagged/javascript?source=post)
* [ES6](https://hackernoon.com/tagged/es6?source=post)
* [Webpack](https://hackernoon.com/tagged/webpack?source=post)
* [Webpack4](https://hackernoon.com/tagged/webpack4?source=post)
* [Web Development](https://hackernoon.com/tagged/web-development?source=post)

By clapping more or less, you can signal to us which stories really stand out.

### [Valentino Gagliardi](https://hackernoon.com/@valentinog)

Web Developer/IT Consultant — [www.valentinog.com](http://www.valentinog.com/)

### [Hacker Noon](https://hackernoon.com/?source=footer_card)

how hackers start their afternoons.

It is just me, or it really gives error to build in production

`Error: Cannot find module ‘uglifyjs-webpack-plugin’`

Make sure to install webpack@next because I suspect you’re trying against
version 3.

Just a Quick note: webpack 4 is now stable :) no need to use @next anymore

Sure, I was going to update the article. Keep an eye on the original post for up
to date infos: https://www.valentinog.com/blog/webpack-4-tutorial/
