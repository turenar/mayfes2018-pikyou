#!/usr/bin/env bash
 
# Compile TypeScript sources
nohup watchify -d src/main.ts -p [ tsify ] -o dest/main.js &
browserify_pid=$!
trap "kill -15 $browserify_pid $>/dev/null" 2 15
 
# Run Server
nohup browser-sync start --config bs-config.js &
browserSync_pid=$!
trap "kill -15 $browserSync_pid &>/dev/null" 2 15
 
tail -f nohup.out
