#!/bin/bash
echo "Beep boop! Starting Adventure Atlas..."
/bin/sh -ec 'cd backend && python3 manage.py runserver &'
sleep 5s 
/bin/sh -ec 'cd frontend && npm start'
