# Recipe Websocket

Demo of websockets functionality with a recipe

## Run

Run the main class `WebsocketApplication` and expose port 8080 over a network

Open `localhost:8080` and `localhost:8080/external` in a browser on different tabs, or even on different
devices on the same network (you'll need the IP address if you do this)

Login as one of the two username and password combinations configured in `SecurityConfig.java`

Click the next step button to advance to the next step of the sample recipe on the main recipe screen

Enter an arbitrary step index on the `/external` page and click the update button corresponding to your username. 
Watch the main screen at `/` update due to its subscription to the websocket endpoint

You can log in as both users in two different browsers to demonstrate how the updates are user-specific and do not clash.

## Credit

This was originally based on the below tutorial

https://spring.io/guides/gs/messaging-stomp-websocket/

