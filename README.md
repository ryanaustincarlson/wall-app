# Wall App

This is a small app that allows users to post to a common wall. There are three components

## API

In `posts` we define an API using `django-rest-framework` which allows us to 
create, read, update, and delete (CRUD) wall posts. Wall posts have an author,
a timestamp, and some text.

Note that we also allow users to access user data using the API. Though we don't
use it anywhere, it's a useful API that's easy enough to make private it we'd like
to in the future.

## Login App

In `login` I created a very simple, django-templated custom login form to handle user registration,
login, and logout. On registration, users get a very short email.

## UI

In `bricks` we have a simple angularjs app using using `ui-router` to create a single-page app. We
allow users to view all of the posts, create a new one, edit and remove their own posts, and filter
by author.

## Installation

I'm assuming you have python, pip, and virtualenv installed. Once you've cloned the repo, create
a virtual environment and run `./install.sh`, which will install django requirements using `pip` and
the front-end requirements using `npm`. 

We have two test suites -- one for the django app (found in `posts/tests.py`) and the other for the
angularjs app (found in `bricks/static/bricks/test/spec`). To run both of these tests, execute 
`./run_tests.sh`

To start the server, run `python manage.py runserver`.

That should be it. Happy wall-ing!
