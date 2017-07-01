set version=%1
if  exist dest rd /Q /S dest
mkdir dest
xcopy /E app dest
xcopy /Y liveconfig.js dest\config.js
echo %version%