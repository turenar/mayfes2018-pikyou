import * as fs from 'fs';

fs.readFile('./assets/blocks.xml', 'utf-8', function(err, data) {
	if (err) {
		console.log('xml file reading failed!');
		process.exit(1);
	} else {
		var arr = data.match(/<xml(.|\n)+?\/xml>/g);

		fs.writeFileSync('./src/blocks.ts', '/* this file is auto generated. */\n');

		for (var i = 0; i < arr.length; i++) {
			fs.appendFileSync('./src/blocks.ts', `export const blockset${i} = '${arr[i].replace(/\r?\n/g, '')}';\n`);
		}
	}
});
