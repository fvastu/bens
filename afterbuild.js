const fs = require('fs');
const path = require('path');

const script_cjs = fs.readFileSync('lib/script.cjs.js', { encoding: 'utf8'});
const script_esm = fs.readFileSync('lib/script.esm.js', { encoding: 'utf8'});
let cjs = fs.readFileSync('lib/index.cjs.js', { encoding: 'utf8'});
let esm = fs.readFileSync('lib/index.esm.js', { encoding: 'utf8'});

// Insert the code of the script inside the placeholder
cjs = cjs.replace('__INSERT__HERE__SCRIPT', script_cjs);
esm = esm.replace('__INSERT__HERE__SCRIPT', script_esm);

// Clean folder and write new data
fs.readdir('lib', (err, files) => {
  if (err) throw err;
  for (const file of files) {
    fs.unlink(path.join('lib', file), (err) => {
      if (err) throw err;
    });
  }
  fs.writeFileSync('lib/index.cjs.js', cjs);
  fs.writeFileSync('lib/index.esm.js', esm);
});

