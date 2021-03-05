echo "==================Windows: Install required packages================================"
# Because 'command not found: ng' occurs on Windows, add this command.
sudo npm install -g @angular/cli@11.1.2
sudo npm install --save --no-bin-links @angular-devkit/build-angular
echo "==================Windows: End of installing required packages================================"