This is a short example demonstrating how the WMS endpoint of the meteomatics API can be used to render an interactive map.

**Installation Instructions:**

- Install dependencies `npm install`.
- Build the example and serve it using a development server: `npm run start`.
- Open the exampl in your browser using the url printed to the console. Most likely [localhost:8080](http://localhost:8080).

**Explanation:**

The development server is necessary to work around the [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
policy of the browser.

If you set this system up for production. Instead of using the development server, you should set up a production grade proxy
to forward data to the meteomatics API. This proxy should also attach your credentials. Do not serve your username and password to the browser.
