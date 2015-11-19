set -e

# Tried node v0.12.7 at some point, but didn't fix the issue we were having
# Also tried with npm v3.4.0
#curl -sL https://deb.nodesource.com/setup_0.12 | sudo -E bash -
#sudo apt-get install ruby nodejs -y

sudo apt-get install ruby nodejs npm -y
# If you are on Ubuntu 14.04
sudo apt-get install nodejs-legacy -y

# Tried npm 1.4.28 in the past
#sudo npm install -g npm@1.4.28
npm config set strict-ssl false
sudo npm install -g npm@2.8.4
sudo gem install foreman

# I think sudo npm creates this directory for root and then normal npm cannot access it anymore, so we delete it here
sudo rm -rf ~/.npm/_locks

echo
echo "Done! Exit this shell and open it again (Otherwise the new npm is not picked up as far as I can tell)"
