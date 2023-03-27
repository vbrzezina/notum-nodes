# 🚀 Hello 🧡
Welcome to today's interview. Your task will be to solve the implementation of the React application. We're crossing our fingers and we believe you'll do it brilliantly.

# Goal
Your goal will be to implement the basis of the application, which you will find in the `client` folder. After logging in, the application renders nodes (cards) into a tree structure, allows you to add or delete nodes and color them. You can find more information about specific features in `client/README.md`. You can see screenshot [here](./preview.png) or video [here](./video.mp4).

# Setup & run
## Server setup
First, you need to start the server, which will then run locally on port 3002. The server is only used for temporarily reading and storing nodes (they are forgotten after the restart) and user authentication.

```
cd server
(nvm use)
npm i
npm run start
```


### Swagger documentation
[http://localhost:3002/api](http://localhost:3002/api)


### Available user
```
username: notum
password: toMoon
```

And that's all you need to know about the "server" part. Btw. don't forget to kill it at the end.

## Client setup
```
cd client
(nvm use)
npm i
npm run start
```

More info in `client/README.md`.