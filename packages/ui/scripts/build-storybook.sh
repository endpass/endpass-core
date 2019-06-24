#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")"
yarn
yarn storybook:build
