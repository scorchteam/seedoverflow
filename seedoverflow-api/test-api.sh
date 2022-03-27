#!/bin/bash

coverage=$false

if [[ -z "${JWT_SECRET_KEY}" ]]; then
    export JWT_SECRET_KEY=jwtsecuritykey
fi

coverage run -m unittest discover -s tests

if [ $? -ne 0 ]; then
    exit 1
fi

if [ $# -gt 0 ]; then
    if [ $1 == "-c" ]; then
        coverage report
    fi
fi