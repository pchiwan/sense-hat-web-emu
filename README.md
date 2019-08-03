# Sense HAT Web Emulator

[![npm version](https://badge.fury.io/js/sense-hat-web-emu.svg)](https://badge.fury.io/js/sense-hat-web-emu)

This is a web emulator for Sense HAT applications. You may use it to preview your Sense HAT applications locally, thus testing they work correctly before you push them to your Raspberry Pi.

The web emulator runs your application using your local [Node.js](https://nodejs.org) but if you have [nodemon](https://www.npmjs.com/package/nodemon) installed, it will use `nodemon` instead; this way you can have the emulator running and reloading the browser whenever you save your code files.

When you start the web emulator, it will automatically open a browser tab for you. The SPA running in the browser communicates with your application via sockets.

![](https://user-images.githubusercontent.com/4695856/48980160-c2aad800-f0c5-11e8-9e37-a3d3f8f3ed1c.png)

## Installation

Add `sense-hat-web-emu` as a development dependency of your project with

```
npm install sense-hat-web-emu --save-dev
```

or

```
yarn add sense-hat-web-emu --dev
```

## Usage

The web emulator basically provides a replacement for the `sense-joystick` and `sense-hat-leds` npm packages. 

Most probably your Sense HAT application looks something like this:

```javascript
const senseJoystick = require('sense-joystick')
const senseLeds = require('sense-hat-led')

// your application code which uses senseJoystick and senseLeds
```

Ideally, in order to use the web emulator you would modularize your code so that your application's entry point receives `senseJoytick` and `senseLeds` as parameters. This not only makes it easier to use the web emulator, it also makes your application easier to test.

Your entry file would look something like this:

```javascript
module.exports = (senseJoystick, senseLeds) => {
  // your application code here
}
```

When running the Sense HAT web emulator, it will automatically inject the emulator versions of `senseJoystick` and `senseLeds` into your applications entry point.

Now you can add a script in your `package.json` file

```json
"scripts": {
  "webemu": "webemu ./path/to/file.js"
}
```

And you can either run it with
```
npm run webemu
```

or 

```
yarn webemu
```

Alternatively, if you don't have a `package.json` file or don't want to add a script to it, you can also run:

```
./node_modules/.bin/webemu ./src/test-app.js
```

Here's an example of what an application's entry file could look like:

```javascript
module.exports = (senseJoystick, senseLeds) => {
  senseJoystick.getJoystick().then((joystick) => {
    const _ = [0, 0, 0] // black color
    const R = [255, 0, 0] // red color
    
    joystick.on('press', val => {
      if (val === 'click') {
        senseLeds.setPixels([
          _, _, _, _, _, _, _, _,
          _, R, R, _, _, R, R, _,
          R, R, R, R, R, R, R, R,
          R, R, R, R, R, R, R, R,
          _, R, R, R, R, R, R, _,
          _, _, R, R, R, R, _, _,
          _, _, _, R, R, _, _, _,
          _, _, _, _, _, _, _, _
        ])
      }      
    })
  })
}
```

## Disclaimer

The web emulator runs your Sense HAT Node application on the server side and communicates with the browser through sockets. Because of the asynchronous nature of this communication, an application written using the synchronous version of `senseLeds` methods will not work correctly. If you're willing to use the web emulator and it's not imperative for you to use synchronous methods, I'd recommend using their async version. Otherwise, I'm truly sorry and also accepting contributions to work around this limitation.

## Documentation

- [Documentation for `sense-hat-led`](https://github.com/balena-io-playground/node-sense-hat)
- [Documentation for `sense-joystick`](https://github.com/balena-io-playground/sense-joystick)

## Thanks

Thank you for trying the Sense HAT web emulator!

Your feedback is very welcome, and your contributions even more so!
