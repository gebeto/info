---
title: SOLID TypeScript
parent: SOLID
nav_order: 1
---

# S.O.L.I.D in TypeScript

**S.O.L.I.D** is an acronym for the **first five object-oriented design(OOD)
principles** by **Robert C. Martin**, popularly known as [Uncle
Bob](http://en.wikipedia.org/wiki/Robert_Cecil_Martin).

These principles, when combined together, make it easy for a programmer to
develop software that are easy to maintain and extend. They also make it easy
for developers to avoid code smells, easily refactor code, and are also a part
of the agile software development.

### S.O.L.I.D STANDS FOR:

When expanded the acronyms might seem complicated, but they are pretty simple to
grasp.

* [**S**](#single-responsibility-principle) — Single-responsiblity principle
* [**O**](#open-closed-principle) — Open-closed principle
* [**L**](#liskov-substitution-principle) — Liskov substitution principle
* [**I**](#interface-segregation-principle) — Interface segregation principle
* [**D**](#dependency-inversion-principle) — Dependency Inversion Principle

Let’s look at each principle individually to understand why S.O.L.I.D can help
make us better developers.
```typescript
class Book {
    getTitle() {
        return "A Great Book";
    }

    getAuthor() {
        return "John Doe";
    }

    turnPage() {
        // pointer to next page
    }

    printCurrentPage() {
        return "current page content";
    }
}
```

### Single Responsibility Principle

    A class should have one and only one reason to change,
    meaning that a class should have only one job.

To illustrate the single responsibility principle, let’s take an example of
book.

Let’s we have **Book** class which encapsulating the concept of book and its
functionalities
```typescript
class Book {
    getTitle() {
        return "A Great Book";
    }

    getAuthor() {
        return "John Doe";
    }

    turnPage() {
        // pointer to next page
    }

    printCurrentPage() {
        return "current page content";
    }
}
```

It looks reasonable class as it provides book title, author details and it can
turn page. Finally, it can also print the page contents.

Suppose a user want to jump on some page number, user can not.

Let’s say user wants book’s content in JSON or HTML or any other format.

It will get failed to fulfil the above requirements. Let’s change this code as
per the first principle.
```typescript
class Book {
    getTitle() {
        return "A Great Book";
    }

    getAuthor() {
        return "John Doe";
    }
}
```
```typescript
class Pager {
    gotoPrevPage() {
        // pointer to prev page
    }

    gotoNextPage() {
        // pointer to next page
    }

    gotoPageByPageNumber(pagerNumber: number) {
        // pointer to specific page
    }
}
```
```typescript
class Printer {
    printPageInHTML(pageContent: any) {
        // your logic
    }

    printPageInJSON(pageContent: any) {
        // your logic
    }

    printPageInXML(pageContent: any) {
        // your logic
    }

    printPageUnformatted(pageContent: any) {
        // your logic
    }
}
```
This looks good and each class has only single job to do.

### Open Closed Principle
    Objects or entities should be open for
    extension, but closed for modification.

This simply means that a class should be easily extendable without modifying the
class itself. Let’s take a look at the **Book** class, especially **getAuthor
**method.

The book class’s getAuthor method only provides author name. What if we need to
have other author details for **admin /management / librarian** and author name
for **end user**.

We can simply modify the code logic to provide more info as represented in below
code block.
```typescript
class Book {
    getAuthor() {
        return {
            name: 'Ashutosh Singh',
            age: 27,
            address: 'India'
        };
    }
}
```

This is simple and right? But unintentionally, we may have broken the existing
client contract.

So this does not follow second principle of S.O.L.I.D

Let’s have look, how should it be done to apply second principle.
```typescript
class Book {
    getAuthor() { }
}
```
```typescript
class Book1 extends Book {
    constructor() {
        super();
    }

    getAuthor() {

        return {
            name: super.getAuthor(),
            age: ''
        }
    }
}
```
```typescript
class Book2 extends Book {
    getAuthor() {

        return {
            name: super.getAuthor(),
            age: '',
            address: ''
        }
    }
}
```

This looks promising and more extensible. In future we can extend getAuthor
method as per our need.

    In short, inheritance fulfils the second principle.

### Liskov Substitution Principle

This principle is a variation of previously discussed open closed principle. It
says:

    Derived types must be completely
    substitutable for their base types.

Let’s have an example of bird with two object Kingfisher and Ostrich.
```typescript
class Bird {
    fly() {
        console.log('I can fly!');
    }
}
```
```typescript
class Kingfisher extends Bird {
    constructor() {
        super()
    }

}
```
```typescript
class Ostrich extends Bird {
    constructor() {
        super()
    }
}
```
```typescript
let kingfisherBird: Bird = new Kingfisher();

let ostrichBird: Bird = new Ostrich();

kingfisherBird.fly(); // kingfisher can fly.
ostrichBird.fly()// ostrich can fly
```

Let’s consider the output from above code.

1.  Kingfisher can fly — Sounds nice
1.  Ostrich can fly — Really? Sounds weird.

This code will work in development, but this may break in production in some
scenario, and you will be wasting your time to digging real problem.

So what LSP states — Each derived class must replace its parent without
affecting parent’s behaviour.
```typescript
class Bird {
    fly() {
      console.log('I can fly!');
    }
}
```
```typescript
class Kingfisher extends Bird {
    constructor() {
        super()
    }

}
```
```typescript
class Ostrich extends Bird {
    constructor() {
        super()
    }

    fly() {
        throw new Error("I don't fly rather I run");
    }

    run() {

    }
}
```
```typescript
let kingfisherBird: Bird = new Kingfisher();

let ostrichBird: Bird = new Ostrich();

kingfisherBird.fly(); // kingfisher can fly.
ostrichBird.fly()// I don't fly rather I run
```
The above output states ostrich does not fly, now ostrich can substitute bird
with additional behaviour run.

### Interface Segregation Principle

    A client should never be forced to implement
    an interface that it doesn’t use or clients
    shouldn’t be forced to depend on methods they do not use.

Let’s take the previous example of bird, and added an interface IBird.
```typescript
interface IBird {
    fly();
    run();
}

class Kingfisher implements IBird {
    fly() { }

    run() { }
}

class Ostrich implements IBird {
    fly() { }

    run() { }
}
```

This code violates ISP, as Kingfisher class needs to implement run which is not
used its object. Similarly Ostrich needs to implement fly which its object is
not supposed to that.

In short, clients shouldn’t be forced to depend on methods they do not use.

So we should have segregated interface for Ostrich and Kingfisher.
```typescript
interface IKinshfisherBird {
    fly();
}

interface IOstrichBird {
    run();
}

class Kingfisher implements IKinshfisherBird {
    fly() { }
}

class Ostrich implements IOstrichBird {
    run() { }
}
```

### Dependency Inversion Principle

It says

    High level modules should not depend upon low level modules.
    Rather, both should depend upon abstractions.

Let’s take an example of social login. Suppose, you have setup google oauth
login for your client.
```typescript
class Login {
    login(googleLogin: any) {
        // some code which will be used for google login.
    }
}
```

Assume, your client has changed the mind and now want to implement some other
social login.

This code will not work, you need to change this method?

So as per the principle, your high level class should not depend on low level
class.
```typescript
interface ISocialLogin {
    login(options: any);
 }

class GoogleLogin implements ISocialLogin {
    login(googleLogin: any) {
        // some code which will be used for google login.
    }
}

class FBLogin implements ISocialLogin {
    login(fbLogin: any) {
        // some code which will be used for fb login.
    }
}
```

***P.S: — This is Object oriented design and it is not only applicable for
typescript. You can use in any technology in your daily software development
career.***

**If you liked this, click the ❤️ below so other people will see this here on
Medium.**

* [Software Development](https://medium.com/tag/software-development?source=post)
* [Object Oriented](https://medium.com/tag/object-oriented?source=post)
* [Typescript](https://medium.com/tag/typescript?source=post)

By clapping more or less, you can signal to us which stories really stand out.

### [Ashutosh Singh](https://medium.com/@ashu.singh212)

Techie, Peppy, Fuzzy
