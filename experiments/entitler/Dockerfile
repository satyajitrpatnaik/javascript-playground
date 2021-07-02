###########
# BUILDER #
###########

# base image
FROM node:14.5.0-alpine as builder

# include git and openssh to the nodejs docker image
RUN apk add git openssh

# set working directory
WORKDIR /usr/src/app

# install app dependencies
COPY package.json yarn.lock ./
RUN yarn

# create build
COPY . ./
RUN yarn build

#########
# FINAL #
#########

# base image
FROM nginx:1.19.1-alpine

# update nginx conf
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# copy static files
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# expose port
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]