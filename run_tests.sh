cd $(dirname $0)

python manage.py test

cd bricks/static/bricks
karma start --single-run
