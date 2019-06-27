#Specify a base image
FROM node:8-alpine
#copy current directory to container
COPY ./ ./
#install some dependencies
RUN npm install
#default command
CMD ["npm", "start"]
