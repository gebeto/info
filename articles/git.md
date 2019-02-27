![](https://cdn-images-1.medium.com/max/1000/1*XFPXLVyqY0kDkvzIOaD9kw.png)

# Git Basics: Adding more changes to your last commit

With this post you'll learn how to modify your last commit, adding (or removing)
some changes. You can also follow this tutorial to learn how to edit your last
commit message.

I assume you are working on a branch alone to avoid messing around with your
teammates’ work. Remember: shared branches are usually very hard to maintain.

*****

So you have a commit history like this one (older commits on top):

    f7f3f6d create file_a class and methods
    310154e improve SomeOtherClass code
    a5f4a0d update changelog file

But you forgot to add *just* a single line on the changelog file you mentioned
on the commit **a5f4a0d** :(

You could simply commit it and have a history like this:

    f7f3f6d create file_a class and methods
    310154e improve SomeOtherClass code
    a5f4a0d update changelog file
    a4gx124 add missing line to changelog

But that’s just not good for your history (it’s just a change on a change you
already did). The best case scenario here is to have both changes in a
**single** commit.

And you can achieve that with the simply amazing **amend** command!

**Just remember: do not commit any of the changes you want to add to your last
commit before doing these steps!**

### The Basic of the Amend Command

Just add the modified file(s):

    $ (some_branch) git add changelog.md

And amend it:

    $ (some_branch) git commit --amend

After executing the command, this file will show up (probably on vi/vim. check
[this cheatsheet](https://www.fprintf.net/vimCheatSheet.html) if you don't know
how to use it):

    update changelog file

    # Please enter the commit message for your changes. Lines starting

    # with ‘#’ will be ignored, and an empty message aborts the commit.

    #

    # Author: John Doe <john@doe.com>

    # Date: Thu Apr 21 22:40:30 2016 -0300

    #

    # On branch some_branch

    # Your branch is up-to-date with ‘origin/some_branch’.

    #

    # Changes to be committed:

    # modified: changelog.md

Here you can edit your commit message. Do as you wish and then save the file. If
you don’t want to change the message, just save the file without changing it.

Now the changes you did on the last commit and after it will be in the same
commit!

### Amending a Commit Without Changing Its Message

If you don’t want to change your commit message, you can run the amend command
with the** no-edit** flag, like this:

    $ (some_branch) git commit --amend --no-edit

You’ll not be "redirected" a file to edit the commit message and that’s it!

### Pushing an Amended Commit

If you haven’t pushed the last commit yet to your remote, a single push is
enough. Otherwise, you’ll have to push using the -f option since you’ve
rewritten your commit history:

    $ (some_branch) git push -f origin some_branch

> Be warned: pushing with -f is a very dangerous thing. Proceed with caution and
> always be sure that you’re pushing to the right branch.

> Remember: NEVER rewrite the commit history of public branches (like master).
> This will truly mess your teammates work.

#### Bonus 1: Just Editing a Commit Message

To just edit a commit message (without adding new changes to your last commit),
just run the amend command without adding changes. Simple as that!

#### Bonus 2: Editing a Commit Without Opening a File

Of course there would be a command for that! Just run:

    $ (some_branch) git commit --amend -m "Your new commit message"

*****

And there you go!

If you wanna learn how to use Git with teams, you should check [this other
post](https://blog.codeminer42.com/git-workflow-basics-d405746f6205) ;)

Happy gitting!

* [Git](https://medium.com/tag/git?source=post)
* [Github](https://medium.com/tag/github?source=post)
* [Software Development](https://medium.com/tag/software-development?source=post)
* [Web Development](https://medium.com/tag/web-development?source=post)
* [Tutorial](https://medium.com/tag/tutorial?source=post)

By clapping more or less, you can signal to us which stories really stand out.

### [Igor Marques da Silva](https://medium.com/@igor_marques)

Developer at Magnetis Investments and cinema junkie.
[http://igormarques.github.io](http://igormarques.github.io/)

Not where I expected to find my answer, but it was just what I was looking for,
bonus #2 specifically(still hate vim).

When I first tried using `git commit --amend` I had already pushed to the remote
repository and I ended up in some merge conflict trouble when I tried to push
the amended commit. I think I just reverted the merge but I lost the changes I
was trying to amend.

That's why you need to use the "-f" option when rebasing a commit that's already
on remote.

I'm sorry for the trouble you went through.
