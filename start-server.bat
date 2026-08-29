@echo off
title Super Color Hunt Server
echo Starting Super Color Hunt Web Server on port 8080...
powershell -ExecutionPolicy Bypass -File "%~dp0serve.ps1" -Port 8080
pause
