#!/bin/bash

/usr/bin/nohup /usr/bin/gunicorn -b :4000 web:app -w 1 &
/usr/bin/nohup /usr/bin/gunicorn -b :4001 web2:app -w 1 &
/usr/bin/nohup /usr/bin/gunicorn -b :4002 web3:app -w 1 &


/usr/bin/nohup /usr/bin/gunicorn --chdir forbes/ -b :5100 web:app -w 1 &
/usr/bin/nohup /usr/bin/gunicorn --chdir bloom/ -b :5101 web:app -w 1 &
/usr/bin/nohup /usr/bin/gunicorn --chdir businesstimes/ -b :5102 web:app -w 1 &
/usr/bin/nohup /usr/bin/gunicorn --chdir market/ -b :5103 web:app -w 1 &
/usr/bin/nohup /usr/bin/gunicorn --chdir kommersant/ -b :5104 web:app -w 1 &
/usr/bin/nohup /usr/bin/gunicorn --chdir yahoo/ -b :5105 web:app -w 1 &
/usr/bin/nohup /usr/bin/gunicorn --chdir finanz/ -b :5106 web:app -w 1 &
