
<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://images2.imgbox.com/90/82/qvsFpA8E_o.png" alt="Logo" width="330" height="120">
  </a>


  <p align="center">
    A lightweight library to handle notification on top of Chrome Extension Manifest V3 API
    <br />
    <br />
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#preview">Preview</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

In Manifest V3, the Chrome extension platform moves from background pages to _service workers_.
When migrating to this new background context, you'll need to keep two main things in mind:
* Service workers have a short life and are automatically closed when not in use
* Service workers don't have access to DOM.

Without having access (directly) to DOM, any type of operations with the intent of modify it, is tedious and not straightforward. That's why Bens comes to your aid. Directly from your service worker, you can:
* Display overlay popups
* Display notifications
Everything can be made with a high degree of flexibility and customization.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

Typescript, rollup on top of Chrome Extension API (Manifest V3).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

You should use this package in the context of Chrome extension.

* npm
  ```sh
  npm install npm@latest -g
  ```
 * tabs, scripting permissions inside manifest.json
	  ```sh
	 "permissions": [
	    ...
        "tabs",
        "scripting",
        ...
	  ],
	  ```


### Installation

Install NPM package
   ```sh
   npm install @fvastu/bens
   ```

  ...and you are ready to go!
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Preview

This is what you will get by default, using the light theme
<br>
<img src="https://images2.imgbox.com/5d/67/LQ3ujkJV_o.png" alt="Logo" width="540" height="590">

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

After import bens, you will have to just invoke ```createModal``` giving as input a configuration object and an id of the tab where you want to show the overlay.
Your code should look like something like this:

```javascript
import { createModal } from '@fvastu/bens'

// Retrieve all tabs using chrome API, then pick the first one
const tab = await chrome.tabs.query({})[0];

// Show modal in the tab chosen
createModal(
    {
      theme: 'light',
      blurBackground: true,
      useAnimation: true,
      logo: 'https://svgshare.com/i/pKb.svg',
      text: "Please leave a star!",
      subtext: 'Would you mind sparing some feedback?',
      buttonContent: 'Confirm',
      cancelContent: 'Cancel',
      onConfirmClick: () => console.log('buttonConfirm Clicked'),
      onCancelClick: () => console.log('buttonCancel Clicked'),
      onOpen: () => console.log('Popup Open'),
      onClose: () => console.log('Popup Closed'),
    },
    tab.id
)
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## API

The function `createModal` accepts an object with the following parameters:

| name          | type                   | description                                                                                                                                   | default                        | must?    |
| ------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | -------- |
| `text`    | `string`               | Primary text shows in bold with the "main" message                                                                                                      | "" | required |
| `subtext`        | `string`               | Secondary text shown under the primary text                                                                                                                              | ""                             | optional |
| `logo`        | `string`               | URL to the logo                                                                                                                | ""                             | optional |
| `theme`       | `string`               | "dark" \| "light"                                                                                                                             | "light"                        | optional |
| `useAnimation`       | `boolean`               | Show a fadeIn animation when the overlay is shown                                                                                                                            | true                       | optional |
| `blurBackground`       | `boolean`               | Blur the background when the overlay is shown                                                                                                                            | true                       | optional |
| `hideAfter`       | `number`               | Hide the overlay after a the provided amount. N.B. if the delay is too big (e.g. greater than 30 seconds) there could be problems due to SW change to idle states.                                                                                                                            | don't hide                       | optional |
| `buttonContent`       | `string`               | Label shown inside the confirm button                                                                                                                            | ""                       | optional |
| `cancelContent`       | `string`               | Label shown inside the cancel button                                                                                                                            | ""                       | optional |
| `onConfirm`     | `fn: void`             | function that get's executed when the user clicks on confirm button (left button).                         | do Nothing                     | optional |
| `onCancel`     | `fn: void`             | function that get's executed when the user clicks on cancel button (right button)               | do Nothing                     | optional |
| `onOpen`      | `fn: void`             | function that get's executed when the modal is opened, this can be useful for things like adding body-padding, sending stats to a server etc. | do Nothing                     | optional |
| `onClose`     | `fn: void`             | function that get's executed when the modal is closed, this can be useful for things like removing body-padding, etc.                         | do Nothing                     | optional |



<!-- ROADMAP -->
## Roadmap

- [x] Add overlay popup
- [x] Dark and light theme for  overlay popup
- [ ] Add notifications popup
- [ ] Dark and light theme for notifications popup
- [ ] Add additional Templates and animation
- [ ] Improve styles injection to easily personalize the UI

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

You can write me when you want! - [linkedin](https://linkedin.com/in/fvastu) - f.vasturzo@live.it

Project Link: [https://github.com/fvastu/bens](https://github.com/fvastu/bens)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Some helpful links:

* [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)
* [Tabs API](https://developer.chrome.com/docs/extensions/reference/tabs/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
