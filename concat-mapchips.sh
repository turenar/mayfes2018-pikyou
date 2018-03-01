#!/bin/bash

cd "$(dirname "$0")"
cd mapchips

mkdir -p ../assets/img
montage *-*.png +set label -background transparent -tile 10x \
	-geometry 32x32+0+0 ../assets/img/mapchip.png
