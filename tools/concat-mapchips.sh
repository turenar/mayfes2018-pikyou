#!/bin/bash -u

CHIP_PIXELS=32
CHIP_REPEAT_HORIZONTAL=10
cd "$(dirname "$0")"/..
cd mapchips

exec 9>.mapchip.svg.tmp

files_count=$(ls *-*.png | wc -l)
width=$((${CHIP_REPEAT_HORIZONTAL} * ${CHIP_PIXELS}))
height=$(( (files_count / 10 + 1) * ${CHIP_PIXELS}))
cat <<EOT >&9
<svg
	version='1.1'
	xmlns='http://www.w3.org/2000/svg'
	xmlns:xlink='http://www.w3.org/1999/xlink'
	viewBox='0 0 ${width} ${height}'
	width='${width}'
	height='${height}'>
EOT
index=0
for i in *-*.png; do
	x=$(( ( index % 10 ) * ${CHIP_PIXELS}))
	y=$(( ( index / 10 ) * ${CHIP_PIXELS} ))
	echo "<image x='${x}' y='${y}' width='${CHIP_PIXELS}px' height='${CHIP_PIXELS}px' xlink:href='${i}'/>" >&9
	((index++))
done
echo '</svg>' >&9

exec 9>&-
cd ..
test -d assets/img || mkdir assets/img
test -e assets/img/mapchip.png && rm assets/img/mapchip.png
yarn svg2png mapchips/.mapchip.svg.tmp -o assets/img/mapchip.png
