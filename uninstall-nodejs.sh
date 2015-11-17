set -e

echo "Removing local node_modules/"
sudo rm -rf node_modules/

sudo apt-get remove nodejs nodejs-legacy --purge -y
sudo apt-get autoremove --purge -y

sudo rm -rf ~/.npm ~/.node-gyp
sudo rm -rf ~/.npmrc

# TODO: Look in /usr/local/lib/node_modules
sudo rm -rf /usr/local/lib/node_modules
sudo rm -rf /usr/lib/node_modules
# TODO: Look in /usr/lib/node_modules

sudo rm -rf /usr/local/bin/npm
sudo rm -rf ~/.cache/bower
sudo rm -rf ~/tmp
rm -rf `cat .gitignore`
