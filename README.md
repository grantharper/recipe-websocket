# Recipe Websocket

Demo of websockets with a recipe

## Run

Run the main class `WebsocketApplication` and expose port 8080 over a network

Open `localhost:8080` and `localhost:8080/external.html` in a browser on different tabs, or even on different
devices on the same network (you'll need the IP address if you do this)

Click the next step button to advance to the next step of the sample recipe on the main recipe screen

Enter an arbitrary step index on `external.html` and click the update button. Watch the main screen update
due to its subscription to the websocket endpoint

## Credit

This is based on the below tutorial

https://spring.io/guides/gs/messaging-stomp-websocket/

