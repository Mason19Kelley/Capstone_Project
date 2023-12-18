@echo off
cd client
start npm run dev

cd..
cd server
start nest start --watch
