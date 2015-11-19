set -e

mkdir -p logs/

echo; echo " * Downloading vendor/inbox.js GitHub repo..."; echo
git submodule init
git submodule update

echo; echo " * npm-installing bower..."; echo
npm install bower 2>&1 | tee logs/bower-inst.log

echo; echo " * npm-installing gulp..."; echo
npm install gulp 2>&1 | tee logs/gulp-inst.log

echo; echo " * sudo npm-installing mock-promises..."; echo
sudo npm install -g mock-promises 2>&1 | tee logs/mock-prom-inst.log

echo; echo " * npm-updating..."; echo
npm update 2>&1 | tee logs/npm-update.log

echo; echo " * postinstall (via npm run-script)..."; echo
npm run-script postinstall 2>&1 | tee logs/postinst.log

echo; echo "Job done!"; echo
