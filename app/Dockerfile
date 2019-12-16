FROM node:10.15
ENV APP_ROOT /src
ARG APP_ENV
RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN npm ci
RUN npm run build
ENV HOST 0.0.0.0

CMD ["npm", "run", "start"]
