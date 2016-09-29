FROM nginx:1.10

MAINTAINER DevWurm <devwurm@devwurm.net>

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
