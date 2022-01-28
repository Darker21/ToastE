# ToastE-Notifier

![Built with JavaScript](https://img.shields.io/badge/Built%20with-JavaScript-red?style=flat&logo=javascript)
[![Maintainability](https://api.codeclimate.com/v1/badges/b177b2a2328c204635b2/maintainability)](https://codeclimate.com/github/Darker21/ToastE/maintainability)
[![TechnicalDebt](https://badgen.net/codeclimate/tech-debt/Darker21/ToastE)](https://codeclimate.com/github/Darker21/ToastE)
![License](https://badgen.net/badge/license/MIT/blue)
![[CircleCI](https://circleci.com/gh/Darker21/ToastE/tree/main.svg?style=shield)](https://img.shields.io/circleci/build/github/Darker21/ToastE/main?logo=circleci)
[![npm](https://img.shields.io/npm/v/toaste-notifier?logo=npm)](https://www.npmjs.com/package/toaste-notifier)

## About

ToastE Notifier is a vanilla JS version of the existing [jquery-toast-plugin](https://github.com/kamranahmedse/jquery-toast-plugin) made to comply with strict Content-Secrity-Policies and reduce dependencies.

All existing functionality found within the jquery-toast-plugin has been transpiled to pure JS.

## Changes

As part of the transpiling, I included some minor changes, including:

- Removing usage of `HTMLElement.innerHtml` and `HTMLElement.outerHtml` to prevent potential XSS attacks

- SASS powered stylesheets with default integration for integrated theming with a sites pre-existing SASS (In-Progress)

## How to use

- You can install the plugin:

  - via `npm`
  
    ```js
    npm install --save toaste-notification
    ```
  
  - Direct \<script> include

    ``` html
    <head>
      ...
      <script src="https://cdn.jsdelivr.net/npm/toaste-notifier" defer></script>
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toaste-notifier@1.0.0-alpha4/dist/css/toaste-notifier.min.css">
      ...
    </head>
    ```

  - Or directly download the repository and place the content of `dist` wherever you can access them. (please note, there are multiple versions available depending on your browser requirements)

- Include the CSS and JS files.

- Simply do `new ToastENotifier('Toast message to be shown')` Of course it would be the world's simplest toast message but believe me **you can do a lot more** with the options.

## Examples

### Simple textual toast

```javascript
// Non sticky version
new ToastENotifier("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, consequuntur doloremque eveniet eius eaque dicta repudiandae illo ullam. Minima itaque sint magnam dolorum asperiores repudiandae dignissimos expedita, voluptatum vitae velit.")
// Sticky version
new ToastENotifier({
  text : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, consequuntur doloremque eveniet eius eaque dicta repudiandae illo ullam. Minima itaque sint magnam dolorum asperiores repudiandae dignissimos expedita, voluptatum vitae velit.",
  hideAfter : false
})
```

### Unordered list elements as the text of toast using array

```javascript
// Non sticky version
new ToastENotifier(["Ubuntu : One of it's kind", "Sublime Text : Productivity unleashed", "HeidiSQL : Just love it", "Github : Just Lovely"])
// Sticky version
new ToastENotifier({
  text : ["Ubuntu : One of it's kind", "Sublime Text : Productivity unleashed", "HeidiSQL : Just love it", "Github : Just Lovely"],
  hideAfter : false
})
```

### Changing the animations _(In Progress)_

```javascript
new ToastENotifier({ 
  text : "Let's test some stuff...", 
  showHideTransition : 'slide'  // It can be plain, fade or slide
})
```

### Changing the formatting

```javascript
new ToastENotifier({ 
  text : "Let's test some stuff...", 
  showHideTransition : 'slide',  // It can be plain, fade or slide
  bgColor : 'blue',              // Background color for toast
  textColor : '#eee',            // text color
  allowToastClose : false,       // Show the close button or not
  hideAfter : 5000,              // `false` to make it sticky or time in miliseconds to hide after
  stack : 5,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
  textAlign : 'left',            // Alignment of text i.e. left, right, center
  position : 'bottom-left'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
})
```

### Resetting the toast

```javascript
var myToast = new ToastENotifier('Some toast that needs to be removed.');
myToast.reset(); // remove the toast "Some toast that needs to be removed"
```

What if I want to reset all the toasts at once? You may ask. Well in that case, you can do the following:

```javascript
new ToastENotifier().reset('all');
```

### Updating the toast

Suppose, you had shown some toast upon the page, a sticky toast for example and now you want to update the toast. You can do the following

```javascript
var myToast = new ToastENotifier({
  text : 'Some toast that needs to show the success message after the ajax call.',
  hideAfter : false,
  bgColor : '#E01A31'
});
window.setTimeout(function(){
  myToast.update({
    text : 'Updated after a few seconds',
    bgColor : '#23B65D'
  });
}, 5000);
```

Since this is a refreshed version of the original JQuery Toast Plugin, you can use the orginal site [http://kamranahmed.info/toast](http://kamranahmed.info/toast) for options on how to modify your Toast Notifications. The only thing you will need to change is `$.toast(...)` to `new ToastENotifier(...)`

## Features

- Show different types of toasts i.e. informational, warning, errors and success
- Custom **toast background color** and **text color**
- Ability to **hack the CSS** to add your own thing
- **Text can be** provided in the form of
  - **Array** (It's elements will be changed to an un ordered list)
  - **Simple text**
  
- **Events support** i.e. `beforeHide`, `afterHidden`, `beforeShow`, `afterShown`

- `Fade` and `Slide` show/hide transitions support (Currently In Progress)
- Supports showing the loader for the toast
  - You can **position the toast, wherever you want** there is support for `top-left`, `top-right` `bottom-left` and **bottom-right**, `top-center`, `bottom-center` and `mid-center` ...sighs! That's a whole lot of options, isn't it? No, you say. Ok then here is the most exciting thing, you can also introduce **your own positioning** just **by passing a simple JS object** containing `{ top: - , bottom: -, left: -, right: - }`

- Ability to add **sticky toast**

- Optional **stack length can be defined** (i.e. maximum number of toasts that can be shown at once)

Please report any bugs or features you would like added.

---

## Copyright

MIT © Jacob Darker
