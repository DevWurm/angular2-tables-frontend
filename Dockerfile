FROM nginx:1.10

MAINTAINER DevWurm <devwurm@devwurm.net>

COPY dist /usr/share/nginx/html
