# JavaScript Symbols, Iterators, Generators, Async/Await, and Async Iterators —
All Explained Simply

![](https://cdn-images-1.medium.com/max/2000/1*UovxjrPZdmpuy_P4w-5I5A.jpeg)

Some JavaScript (ECMAScript) features are easier to understand than others.
`Generators` look weird — like pointers in C/C++. `Symbols` manage to look like
both primitives and objects at the same time.

**These features are all inter-related and build on each other. So you can’t
understand one thing without understanding the other.**

So in this article, I’ll cover `symbols`,`global symbols`,`iterators`,
`iterables`, `generators` , `async/await `and `async iterators`. **I’ll explain
“why” they are there in the first place and also show how they work with some
useful examples.**

> This is relatively advanced subject, but it’s not rocket science. This article
> should give you a very good grasp of all these concepts.

**OK, let’s get started.🚀**

![](https://cdn-images-1.medium.com/max/2000/1*i4gKV15WR24B6KOuOfmnog.png)

### Symbols

In ES2015, a new (6th) datatype called `symbol` was created.

#### WHY?

The three main reasons were:

#### Reason #1 — Add new core-features with backward compatibility

JavaScript developers and the ECMAScript committee
([TC39](http://ecma-international.org/memento/TC39.htm)) needed a way to add new
object properties without breaking existing methods like `for in` loops or
JavaScript methods like`Object.keys`.

For example, if I have an object, `var myObject = {firstName:'raja',
lastName:'rao'} `and if I run`Object.keys(myObject)` it would return`[firstName,
lastName]` .

Now if we add another property, say `newProperty` to `myObject` , and if you run
`Object.keys(myObject)` it **should** **still** return old values,`[firstName,
lastName]` and not `[firstName, lastName, newProperty]` . How to do that?

We couldn’t really do this earlier, so a new data type called `Symbols` was
created.

If you add `newProperty` as a symbol, then `Object.keys(myObject)` would ignore
this (as it doesn’t know about it), and still return `[firstName, lastName]` !

#### Reason #2 — Avoid name collisions

They also wanted to keep these properties unique. This way they can keep adding
new properties (and you can add object properties) to global without worrying
about name-collisions.

For example, say that you have an object where you are adding a custom
`toUpperCase` to global` Array.prototype` .

Now, imagine you loaded another library (or ES2019 came out) and it had a
different version of `Array.prototype.toUpperCase.` Then your function might
break because of name collision.

![](https://cdn-images-1.medium.com/max/1600/1*tLSnMI6_adGSvJlj7yLQFQ.png)

So how do you resolve this name collision that you may not know about? That’s
where `Symbols` come in. They internally create unique values that allow you to
create add properties without worrying about name collision.

#### Reason #3 —Enable hooks to core methods via “Well-known” Symbols

Suppose you want some core function, say`String.prototype.search` to call your
custom function. That is, `‘somestring’.search(myObject);` should call
`myObject’s` search function and pass` ‘somestring’ `as a parameter! How do we
do that?

This is where ES2015 came up with a bunch of global symbols called “well-known”
symbols. And as long as **your** object has one of of those symbols as a
property, you can redirect core functions to call your function!

We can’t talk much about this right now, so I’ll go into all details a bit later
in this article. But first, let’s learn about how Symbols actually work.

#### Creating Symbols

You can create a symbol by calling a global function/object called `Symbol` .
That function returns a value of datatype `symbol`.

![](https://cdn-images-1.medium.com/max/1600/1*jDKlrnRjGXLAb6LqlJJiuQ.png)

**Note:** Symbols might appear like Objects because they have methods, but they
are not — they are primitives. You can think of them as “special” objects that
have some similarities to regular objects, but that don’t behave like regular
objects.

For example: Symbols have methods just like Objects, but unlike objects they are
immutable and unique.

#### Symbols can’t be created by “new” keyword

Because symbols are not objects and the `new` keyword is supposed to return an
Object, we can’t use `new` to return a `symbols `datatype.

    var mySymbol = new Symbol(); //throws error

#### Symbols have “description”

Symbols can have a description — it’s just for logging purposes.

    //mySymbol variable now holds a "symbol" unique value
    //its 
     is "some text"
    const mySymbol = Symbol('some text');

#### Symbols are unique

    const mySymbol1 = Symbol('some text');
    const mySymbol2 = Symbol('some text');
    mySymbol1 == mySymbol2 // false

#### Symbols behave like a singleton if we use “Symbol.for” method

Instead of creating a `symbol` via `Symbol()` , you can create it via`
Symbol.for(<key>)`. This takes a “key” (string) to create a Symbol. And if a
symbol with that `key` already exists, it simply returns the old symbol! So it
behaves like a singleton if we use the `Symbol.for` method.

    var mySymbol1 = Symbol
    ('some key'); //creates a new symbol
    var mySymbol2 = Symbol
    ('some key'); // **
    mySymbol1 == mySymbol2 //

The real reason to use the `.for` is to create a Symbol in one place and access
the same Symbol from some other place.

**Caution:**` Symbol.for` will make the symbol non-unique in the sense that
you’ll end up overriding the values if the **keys** are the same! So try to
avoid this if possible!

#### Symbol’s “description” versus “key”

Just to make things clearer, if you don’t use `Symbol.for` , then Symbols are
unique. However, if you use it, then if your `key `is not unique, then the
symbols returned will also be not unique.

![](https://cdn-images-1.medium.com/max/1600/1*M2SWsj3N_46B_btDrxIVFg.png)

#### Symbols can be an object property key

This is a very unique thing about Symbols — and also most confusing. Although
they appear like an object, they are primitives. And we can attach a symbol to
an Object as a property key just like a String.

In fact, this is one of the main ways of using Symbols — as object properties!

![](https://cdn-images-1.medium.com/max/1600/1*vGK6d1vPHjGXbbX6gEUXow.png)

**Note:** Object properties that are symbols are known as “keyed properties”.

#### Brackets operator vs. dot operator

You cannot use a dot operator because dot operators only work on string
properties, so you should use a brackets operator.

![](https://cdn-images-1.medium.com/max/1600/1*VeVCPI_9-ah5nDAoGUmBvg.png)

### 3 main reasons to use Symbols — a review

Let’s revisit the three main reasons now that we know how Symbols work.

#### **Reason #1 — Symbols are invisible to loops and other methods**

The for-in loop in the example below loops over an object `obj` but it doesn’t
know (or ignores)`prop3` and `prop4` because they are symbols.

![](https://cdn-images-1.medium.com/max/1600/1*-x4XNekDOQpyjP_pp3J16w.png)

Below is another example where `Object.keys` and `Object.getOwnPropertyNames`
are ignoring property names that are Symbols.

![](https://cdn-images-1.medium.com/max/1600/1*sOyOaDwHcfM7waNDdSzCyw.png)

#### **Reason #2 — Symbols are unique**

Suppose you want a feature called `Array.prototype.includes` on the global
`Array` object. It will collide with the default `includes` method that
JavaScript (ES2018) comes with out-of-the-box. How do you add it without
colliding?

First, create a variable with proper name `includes` and assign a symbol to it.
Then add this variable (now a symbol), to the global `Array` using bracket
notation. Assign any function you want.

Finally call that function using bracket notation. But note that you must pass
the actual symbol within the brackets like: `arr[includes]()` and not as a
string.

![](https://cdn-images-1.medium.com/max/1600/1*y7I8tWdlPSMCrjVBVLy61A.png)

#### Reason #3. Well-known Symbols (that is, “global” symbols)

By default, JavaScript auto-creates a bunch of symbol variables and assigns them
to the global `Symbol` object ( yeah, the same `Symbol()`we use to create
symbols).

In ECMAScript 2015, These symbols are then added to core methods such as
`String.prototype.search` and `String.prototype.replace` of core objects such as
arrays and strings.

Some examples of these symbols are: `Symbol.match`, `Symbol.replace`,
`Symbol.search`, `Symbol.iterator` and `Symbol.split`.

Since these global symbols are global and exposed, we can make core methods call
**our** custom functions instead of internal ones.

#### An Example: `Symbol.search`

For example, String object's `String.prototype.search` public method searches
for a regExp or a string and returns the index if found.

![](https://cdn-images-1.medium.com/max/1600/1*YlmPDGdgKYRpvxmgVZWG_w.png)

In ES2015, it first checks if `Symbol.search` method is implemented in the query
regExp (RegExp object). If so, then it calls that function and delegates the
work to that. And core-objects like RegExp implements the `Symbol.search` symbol
that actually does the work.

#### Inner workings of Symbol.search (DEFAULT BEHAVIOR)

1.  Parse `‘rajarao’.search(‘rao’);`
1.  Convert “rajarao” into String Object `new String(“rajarao”)`
1.  Convert “rao” into RegExp object `new Regexp(“rao”)`
1.  Call `search` method of “rajarao” String object.
1.  `search` method internally calls `Symbol.search` method on “rao” object
(delegates the search back to the “rao” object) and pass the “rajarao”.
Something like this: `"rao"[Symbol.search]("rajarao")`
1.  `"rao"[Symbol.search]("rajarao")` returns index result as `3` to `search`
function and finally, `search` returns `3` back to our code.

The below pseudo-code snippet shows how the code internally works:

![](https://cdn-images-1.medium.com/max/1600/1*KcTW7SyLwehmG3OJZOZy5Q.png)

But the beauty is that, you no longer have to have pass RegExp. You can pass any
custom object that implements `Symbol.search` and return whatever you want and
this will continue to work.

Let’s take a look.

#### Customizing the String.search method to call our function

The below example shows how we can make `String.prototype.search` call our
`Product` class’s search function — thanks to `Symbol.search` global `Symbol`.

![](https://cdn-images-1.medium.com/max/1600/1*vqiaxbqOGGG0MQ0g_lG2iw.png)

#### Inner workings of Symbol.search (CUSTOM BEHAVIOR)

1.  Parse `‘barsoap’.search(soapObj);`
1.  Convert “barsoap” into String Object `new String(“barsoap”)`
1.  Since `soapObj` is already an object, don’t do any conversion
1.  Call `search` method of “barsoap” String object.
1.  `search` method internally calls `Symbol.search` method on “`soapObj`” object
(that is, it delegates the search back to the “`soapObj`” object) and pass the
“barsoap”. Something like this: `soapObj[Symbol.search]("barsoap")`
1.  `soapObj[Symbol.search]("barsoap")` returns the index result as `FOUND` to
`search` function and finally, `search` returns `FOUND` back to our code.

Hopefully you have a good grasp of Symbols now.

OK, let’s move on to Iterators.

![](https://cdn-images-1.medium.com/max/2000/1*RB7bayTxP4IWOUccnkFDsA.png)

### Iterators and Iterables

#### WHY?

In almost all our apps, we are constantly dealing with lists of data and we need
to display that data in the browser or mobile app. Typically we write our own
methods to store and extract that data.

But the thing is, we already have standard methods like the `for-of` loop and
spread operator (`…`) to extract collections of data from standard objects like
arrays, strings, and maps. Why can’t we use these standard methods for our
Object as well?

In the example below, we can’t use a for-of loop or spread operator to extract
data from our `Users` class. We have to use a custom `get` method.

![](https://cdn-images-1.medium.com/max/1600/1*TsUGslq0F48-mOy5rjFtoA.png)

But, wouldn’t it be nice to be able to use these existing methods in our own
objects? In order to achieve this, we need to have rules that all developers can
follow and make their objects work with existing methods.

If they follow these rules to extract data from their objects, then such objects
are called “iterables”.

The rules are:

1.  The main object/class should store some data.
1.  The main object/class must have the global “well-known” symbol `symbol.iterator`
as its property that implements a specific method as per rules #3 to #6.
1.  This `symbol.iterator` method must return another object — an “iterator” object.
1.  This “iterator” object must have a method called the `next` method.
1.  The `next` method should have access to the data stored in rule #1.
1.  And if we call `iteratorObj.next()`, it should return some stored data from rule
#1 either as `{value:<stored data>, done: false}` format if it wants to return
more values, or as `{done: true}` if it doesn’t want to return any more data.

If all those 6 rules are followed, then the main object is called as an
“**iterable**” from rule #1. The object it returned is called an “**iterator**”.

Let’s take a look at how we can make our `Users` object and iterable:

![](https://cdn-images-1.medium.com/max/1600/1*8IrkEC9CUfbM3Zj03R3M5A.png)
<span class="figcaption_hack">Please click to zoom</span>

**Important note**: If we pass an `iterable` (`allUsers`) `for-of `loop or
spread operator, internally they call `<iterable>[Symbol.iterator]()` to get the
iterator (like `allUsersIterator` ) and then use the iterator to extract data.

So in a way, all those rules are there to have a standard way to return an
`iterator` object.

![](https://cdn-images-1.medium.com/max/2000/1*qbf_nFKARgRKkADdSt6DKw.png)

### Generator functions

#### **WHY?**

There are two main reasons:

1.  provide higher-level abstraction to iterables
1.  Provide newer control-flow to help with things like “callback-hell”.

Let’s check them out in detail.

#### REASON #1 — A wrapper for iterables

Instead of making our class/object an `iterable` by following all those rules,
we can simply create something called as a “Generator” method to simplify
things.

Below are some of the main points about Generators:

1.  Generator methods have a new `*<myGenerator>` syntax inside a class, and
Generator functions have the syntax `function * myGenerator(){}`.
1.  Calling generators `myGenerator()`returns a `generator` object that also
implements the `iterator` protocol (rules), so we can use this as an `iterator`
return value out-of-the-box.
1.  Generators use a special `yield` statement to return data.
1.  `yield` statements keep track of previous calls and simply continue from where
it left off.
1.  If you use `yield` inside a loop, it’ll only execute once each time we call the
`next()` method on the iterator.

#### **Example 1:**

The below code shows you how you can use a generator method (`*getIterator()`)
instead of using the `Symbol.iterator` method and implementing the `next` method
that follows all the rules.

<span class="figcaption_hack">Using generators inside a Class</span>

#### **Example 2:**

You can simplify it even further. Make a function a generator (with * syntax),
and use `yield` to return values one at a time like shown below.

<span class="figcaption_hack">Using Generators directly as functions</span>

**Important Note**: Although in the examples above, I’m using the word
“iterator” to represent `allUsers` , it’s really a `generator` object .

The generator object has methods like `throw` and `return` in addition to the
`next` method! But for practical purposes, we can use the returned object as
just “iterator”.

#### REASON #2 — Provide better and newer control-flows

Help provide new control-flows that helps us write programs in new ways and
solve things like “callback hell”.

Notice unlike a normal function, the generator function can `yield` (store the
function’s `state` and `return` value) and also be ready to take additional
input values at the point where it yielded.

In the picture below, every time it sees `yield`, it can return the value. You
can use `generator.next(“some new value”)` and pass the new value at the point
where it yielded.

<span class="figcaption_hack">Normal function vs Generator function</span>

The below example shows in more concrete terms how the control-flow works:

<span class="figcaption_hack">Generator control flow</span>

### Generator syntax and usage

Generator functions can be used in the following ways:

#### **We can have more code after “yield” (unlike the “return” statement)**

Just like the `return` keyword, the `yield` keyword also returns the value — but
it allows us to have code after yielding!

#### You can have multiple yields

<span class="figcaption_hack">you can have multiple yield statements</span>

#### Sending values back-and-forth to generators via the “next” method

The iterators `next` method can also pass values back into the generator as
shown below.

In fact, this feature enables generators to eliminate “callback hell”. You’ll
learn more about this in a bit.

This feature is also used heavily in libraries like
[redux-saga](https://redux-saga.js.org/).

In the example below, we call the iterator with an empty `next()` call to get
the question. And then, we pass `23` as the value when we call the `next(23)`
the 2nd time.

<span class="figcaption_hack">Passing value back to the generator from outside via “next”</span>

#### Generators help eliminate “callback hell”

You know that we get into [callback hell](http://callbackhell.com/) if we have
multiple asynchronous calls.

The example below shows how libraries such as “[co](https://github.com/tj/co)”
use the generator feature that allows us to pass a value via the `next` method
to help us write async code synchronously.

Notice how the `co` function passes the result from the promise back to the
generator via `next(result)` in Step #5 and Step #10.

<span class="figcaption_hack">Step-by-Step explanation of libs like “co” that use “next(<someval>)”</span>

OK, let’s move on to async/await.

### ASYNC/AWAIT

#### **WHY?**

As you saw earlier, Generators can help eliminate “callback hell”, but you need
some 3rd party library like `co` to make that happen. But “callback hell” is
such a big problem, the ECMAScript committee decided to create a wrapper just
for that aspect of Generator and came out with the new keywords `async/await`.

The differences between Generators and Async/Await are:

1.  async/await uses `await` instead of `yield`.
1.  `await` only works with Promises.
1.  Instead of `function*`, it uses the `async function` keyword.

So `async/await` is essentially a subset of Generators and has a new syntactic
sugar.

The `async` keyword tells the JavaScript compiler to treat the function
differently. The compiler pauses whenever it reaches the `await` keyword within
that function. It assumes that the expression after `await` returns a promise
and waits until the promise is resolved or rejected before moving further.

In the example below, the `getAmount` function is calling two asynchronous
functions `getUser` and `getBankBalance` . We can do this in a promise, but
using `async await` is more elegant and simple.

### ASYNC ITERATORS

#### **WHY?**

It’s a pretty common scenario where we need to call async functions in a loop.
So in ES2018 (completed proposal), the TC39 committee came up with a new Symbol
`Symbol.asyncIterator` and also a new construct `for-await-of` to help us easily
loop over async functions .

The main difference between regular Iterator objects and Async Iterators is as
follows:

#### **Iterator object**

1.  Iterator object' s `next()` method returns value like `{value: ‘some val’, done:
false}`
1.  Usage :` iterator.next() //{value: ‘some val’, done: false}`

#### **Async Iterator object**

1.  Async Iterator object’s next() method **returns a Promise** that later resolves
into something like `{value: ‘some val’, done: false}`
1.  Usage: `iterator.next().then(({ value, done })=> {//{value: ‘some val’, done:
false}}`

The below example shows how `for-await-of` works and how you can use it.

<span class="figcaption_hack">for-await-of (ES2018)</span>

### SUMMARY

**Symbols** — provide a globally unique data type. You use them mainly as object
properties to add new behaviors so you don’t break standard methods like
`Object.keys` and `for-in` loops.

**Well-known symbols **— are auto-generated symbols by JavaScript and can be
used to implement core methods in our custom objects

**Iterables **— are any objects that store a collection of data and follow
specific rules so that we can use standard `for-of` loop and `...` spread
operators to extract data from within them.

**Iterators **— are returned by Iterables and have the `next` method — it’s what
actually extracts the data from an `iterable`.

**Generators** —provide higher level abstraction to Iterables. They also provide
new control-flows that can solve things like callback-hell and provide building
blocks for things like `Async/Await`.

**Async/Await **— provides higher level abstraction to Generators in order to
specifically solving callback-hell issue.

**Async Iterators** — a brand-new 2018 feature to help with looping over an
array of async functions to get the result of each async function just like in a
normal loop.

That’s pretty much it!

### Further reading

#### ECMAScript 2015+

1.  [Here are examples of everything new in ECMAScript 2016, 2017 and
2018](https://medium.freecodecamp.org/here-are-examples-of-everything-new-in-ecmascript-2016-2017-and-2018-d52fa3b5a70e)
1.  [Check out these useful ECMAScript 2015 (ES6) tips and
tricks](https://medium.freecodecamp.org/check-out-these-useful-ecmascript-2015-es6-tips-and-tricks-6db105590377)
1.  [5 JavaScript “Bad” Parts That Are Fixed In
ES6](https://medium.com/@rajaraodv/5-javascript-bad-parts-that-are-fixed-in-es6-c7c45d44fd81#.7e2s6cghy)
1.  [Is “Class” In ES6 The New “Bad”
Part?](https://medium.com/@rajaraodv/is-class-in-es6-the-new-bad-part-6c4e6fe1ee65#.4hqgpj2uv)

My other posts can be found [here](https://medium.com/@rajaraodv/latest).

### If this was useful, please click the clap 👏 button down below a few times to
show your support! ⬇⬇⬇

* [JavaScript](https://medium.freecodecamp.org/tagged/javascript?source=post)
* [Tech](https://medium.freecodecamp.org/tagged/tech?source=post)
* [Apps](https://medium.freecodecamp.org/tagged/apps?source=post)
* [Coding](https://medium.freecodecamp.org/tagged/coding?source=post)
* [Software
Development](https://medium.freecodecamp.org/tagged/software-development?source=post)

From a quick cheer to a standing ovation, clap to show how much you enjoyed this
story.

### [rajaraodv](https://medium.freecodecamp.org/@rajaraodv)

Trying to make Web development simple. Former Developer Advocate
[@Salesforce](http://twitter.com/Salesforce), VMware (node.js); Engineer @
Yahoo, Zimbra. Twitter: [@rajaraodv](http://twitter.com/rajaraodv)

### [freeCodeCamp](https://medium.freecodecamp.org/?source=footer_card)

Our community publishes stories worth reading on development, design, and data
science.

# Help us crack the code.

We’re looking for engineers to help Medium build a better place for ideas on the
internet.

Thank you for the write up!

Wondering if you could elucidate the distinction between async iterators and
Promise.all([])

Great article. I learned a lot from it. Thank you. Please note, in the code
sample entitled “Generator control flow” where you assign 100 to k, the value
should be 180, not 80 as you have in the comment.

Great article 👍🏽 really enjoyed it. What’s the name of the colour syntax /
theme you’re using in the examples?

Great article, thank you for that! Will come back to it many times, I’m sure.

(small thing: in one of the Symbol examples you define the property as
car[myFunction] instead of car[honk])

Thanks! Great article ✌️

Great article, i understand the concepts very well. Thank you Raj.

Thanks for the write up; it was clear, succinct, and well worth the read.

Thanks for the great post. What program do you use to make the code snippet
images?

I use https://carbon.now.sh/

Wonderful article, thanks so much! One note: above there’s a statement “the main
object is called as an “iterator” from rule #1. The object it returned is called
an “iterable”.

That statement seems to express things backwards … the returned object is the
Iterator.

Thanks! fixed it
