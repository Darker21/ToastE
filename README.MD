# ToastE

![Built with JavaScript](https://img.shields.io/badge/Built%20with-JavaScript-red?style=flat&logo=javascript)
[![Maintainability](https://api.codeclimate.com/v1/badges/b177b2a2328c204635b2/maintainability)](https://codeclimate.com/github/Darker21/ToastE/maintainability)
[![TechnicalDebt](https://badgen.net/codeclimate/tech-debt/Darker21/ToastE)](https://codeclimate.com/github/Darker21/ToastE)
![License](https://badgen.net/badge/license/MIT/blue)
![[CircleCI](https://circleci.com/gh/Darker21/ToastE/tree/main.svg?style=shield)](https://img.shields.io/circleci/build/github/Darker21/ToastE/main?logo=circleci)
[![node-current](https://img.shields.io/node/v/toaste-notifier?label=npm&logo=npm)](https://npmjs.com)

## About

ToastE Notifier is a vanilla JS version of the existing [jquery-toast-plugin](https://github.com/kamranahmedse/jquery-toast-plugin) made to comply with strict Content-Secrity-Policies and reduce dependencies.

All existing functionality found within the jquery-toast-plugin has been transpliled to pure JS.

## Changes

As part of the transpiling, I included some minor changes, including:

- Usage of `HTMLElement.innerHtml` and `HTMLElement.outerHtml` to prevent potential XSS attacks

- SASS powered stylesheets with default integration for integrated theming with a sites pre-existing SASS

## How to use

- You can install the plugin via `npm`
  
    ```js
    npm install jquery-toast-plugin
    ```
  
    Or directly download the repository and place the content of `dist` wherever you can access them.
- Include the CSS and JS files.
- Simply do ```$.toast('Toast message to be shown')``` Of course it would be the world's simplest toast message but believe me **you can do a lot more** with the options.

## Examples

_To be written_

## Features

- Show different types of toasts i.e. informational, warning, errors and success
- Custom **toast background color** and **text color**
- Ability to **hack the CSS** to add your own thing
- **Text can be** provided in the form of
  - **Array** (It's elements will be changed to an un ordered list)
  - **Simple text**
  - **HTML**
  
- **Events support** i.e. `beforeHide`, `afterHidden`, `beforeShow`, `afterShown`

- `Fade` and `Slide` show/hide transitions support (More to come)
- Supports showing the loader for the toast
  - You can **position the toast, wherever you want** there is support for `top-left`, `top-right` `bottom-left` and **bottom-right**, `top-center`, `bottom-center` and `mid-center` ...sighs! That's a whole lot of options, isn't it? No, you say. Ok then here is the most exciting thing, you can also introduce **your own positioning** just **by passing a simple js object** containing `{ top: - , bottom: -, left: -, right: - }`

- Ability to add **sticky toast**

- Optional **stack length can be defined** (i.e. maximum number of toasts that can be shown at once)

Please report any bugs or features you would like added.

---

## Copyright

MIT © Jacob Darker
