#!/bin/bash

tsc --build
npm pack
npm install cider-title-1.0.0.tgz
