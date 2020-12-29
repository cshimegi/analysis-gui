echo "==================Update apt-get================================"
sudo apt update
sudo apt install net-tools
echo "====================End of Updating apt-get========================="

cd /vagrant

echo "==================Install required packages================================"
sudo apt install -y nodejs npm
# nodejs version manager
sudo npm install -g n
sudo n stable
# remove everything related to packages
sudo apt purge -y nodejs npm
sudo npm install
echo "==================End of installing required packages==========================="