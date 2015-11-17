set -e

sudo apt-get install ruby nodejs npm -y

# if you are on Ubuntu 14.04
sudo apt-get install nodejs-legacy -y
#sudo npm install -g npm@1.4.28
npm config set strict-ssl false
sudo npm install -g npm@2.8.4
sudo gem install foreman

echo
echo "TODO: Exit this shell and open it again"
