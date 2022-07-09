# XMPPLogger
 Fortnite XMPP Logger made in NodeJS
 
 ## How to use?
1) Install [NodeJS](https://nodejs.org/en/)
2) Run "npm install" on cmd (inside the folder)
3) Run "node index.js" on cmd (inside the folder)
4) Use something to redirect the xmpp to 127.0.0.1:443 (I recommend cloudstorage editing)
5) The xmpp requests (client and server requests) should log on the cmd window

## Cloudstorage Editing to redirect XMPP
Add to DefaultEngine.ini
```
[OnlineSubsystemMcp.Xmpp]
bUseSSL=false
ServerAddr="ws://127.0.0.1"
ServerPort=443


[OnlineSubsystemMcp.Xmpp Prod]
bUseSSL=false
ServerAddr="ws://127.0.0.1"
ServerPort=443
```

made by notpies

you can change the xmpp url in index.js, it uses epic games xmpp by default
