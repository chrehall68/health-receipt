# Health-Receipt
Understanding how healthy your shopping list is is now as easy as simply scanning your receipt! Simply open the app, scan your Walmart receipt, and
start understanding what's going into your body. From essential nutrients to harmful chemicals, our application details them all in an
easily-understandable way. Get started today!
## Team
This application was built with ❤️ by
* Eliot H.
* Atishay J.
* Sravan K. 
* Rohit
## Data Flow
For developers, here's how everything works. When you scan your receipt, our OCR model extracts what products you bought and
securely sends that data to our Convex backend, which then looks up the products from Walmart, retrieves the information
about the foods from our database, and then sends that data back to our frontend, which displays it.
## Getting Started Developing!
* First, make sure to run `bun install` (or `npm install`) in order to install all necessary packages
* Next, run the backend by running `npx convex dev`
* Then, install Expo Go on the mobile device that you will be viewing the frontend
* Finally, run `bun start` (or `npm start`) in order to start the frontend. Open Expo Go on your device and scan the QR code,
and then you'll see the application there!