FROM tuiteraz/jaba-static:3.0.1

ARG LATEST_VERSION
ARG IMAGE_NAME
ENV LATEST_VERSION1=$LATEST_VERSION
ENV IMAGE_NAME1=$IMAGE_NAME

RUN rm -rf /etc/nginx/www-data
COPY ./dist /etc/nginx/www-data

EXPOSE 80

CMD echo "${IMAGE_NAME1}:${LATEST_VERSION1}" && /usr/sbin/nginx