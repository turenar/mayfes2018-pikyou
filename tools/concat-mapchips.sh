#!/bin/bash -u

cd "$(dirname "$0")"/..
cd mapchips

exec 9>.mapchip.svg.tmp

files_count=$(ls *-*.png | wc -l)
height=$(( (files_count / 10 + 1) * 32))
cat <<EOT >&9
<svg
	version='1.1'
	xmlns='http://www.w3.org/2000/svg'
	xmlns:xlink='http://www.w3.org/1999/xlink'
	viewBox='0 0 320 ${height}'
	width='320px'
	height='${height}'>
EOT
index=0
for i in *-*.png; do
	x=$(( ( index % 10 ) * 32 ))
	y=$(( ( index / 10 ) * 32 ))
	echo "<image x='${x}' y='${y}' width='32px' height='32px' xlink:href='${i}'/>" >&9
	((index++))
done
echo '</svg>' >&9

exec 9>&-
cd ..
test -e assets/img/mapchip.png && rm assets/img/mapchip.png
yarn svg2png mapchips/.mapchip.svg.tmp -o assets/img/mapchip.png
