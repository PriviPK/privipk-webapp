#!/usr/bin/env bash

set -e

apt-get update -y
apt-get dist-upgrade -y git vim

# WARNING: Do not put these here, since Vagrant runs them with sudo, which is problematic for the postinstall script (the bower command specifically)!
#cd /vagrant
#./install-nodejs-new.sh
#./install-npms.sh

echo
echo "Done! Please log in to the VM..."
echo " $ vagrant ssh"
echo
echo "...and execute the following commands"
echo " $ cd /vagrant"
echo " $ ./install-nodejs-new.sh"
echo " $ ./install-npms.sh"
echo
