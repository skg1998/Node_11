FROM node:14

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . ./
ENV PORT=3000
EXPOSE ${PORT}
CMD ["node", "src/index.js"]
# Run a container