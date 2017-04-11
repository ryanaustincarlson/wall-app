#!/usr/bin/env bash

cd $(dirname $0)

# make sure you're using a virtual environment
echo -n "Are you using a virtual environment?[y/n] "
read check
if [ $check == "y" ]; then
    pip install -r requirements.txt

    cd bricks/static/bricks
    npm install
fi
