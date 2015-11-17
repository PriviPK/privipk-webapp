set -e

mkdir -p logs/
git submodule init
git submodule update
npm install bower 2>&1 | tee logs/bower-inst.log
npm install gulp 2>&1 | tee logs/gulp-inst.log
sudo npm install -g mock-promises 2>&1 | tee logs/mock-prom-inst.log
npm update 2>&1 | tee logs/npm-update.log
npm run-script postinstall 2>&1 | tee logs/postinst.log
