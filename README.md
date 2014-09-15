# Boilerplate for new Jimdo templates

**With this SASS boilerplate, you can easily develop new templates for Jimdo.**

## Setup

First download and install the Chrome extention: http://live.dmp.jimdo-server.com

Then you can configure your local enviroment.

### Dependencies

- for [Sass](http://sass-lang.com/) and [Compass](http://compass-style.org/) you need to have a working [Ruby](https://www.ruby-lang.org/en/) setup with [Bundler](http://bundler.io/) installed. If you are new to the Ruby world, by all means install a Ruby version manager like [RVM](http://rvm.io/) (or [rbenv](http://rbenv.org/)).
- the serve-and-compile engine is running [Grunt](http://gruntjs.com/). So you need to have a current version of [node.js](http://nodejs.org/).

### Installation

Copy the follwing commands and paste them into your terminal:

    $ bundle install # should install the appropiate versions of Sass and Compass
    $ npm install grunt-cli -g # the Grunt command line interface needs to be installed globally
    $ npm install # should install Grunt and Grunt tasks for this boilerplate

## Fire it up

    $ grunt # should start the default grunt task: compile all the Sass, start a server and open a new browser tab with the current version of your template, then watch sass and recompile on changes.

## CSS Livereload

Install the [Chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) of [LiveReload](http://livereload.com/) for more unicorn.



## General advice

The nesting within these files is kept as flat as possible. This helps to avoid overriding style mode settings for the user. If you nest too deep, your selectors are too powerful to be overridden. Also, it's just not necessary to do that in most cases, so just don't do it.

Most of the partials provide a good basis to code from. Actually, filling the `_base.sass` with the general layout and some colors gets you pretty far already. Adjust the font sizes in the `_font-settings.sass` and the buttons in the `_buttons.sass` to get going.

If you wish to use the REM unit, you can do so via
```sass
@include rem(property, values as px)
```
the function is included in the `_font-settings.sass` and also provides a px fallback. Pretty neat.

To easily build variations, simply alter the variables you already use within the style.sass. It's the fastest way to create variations from the basic setup of the `style.sass` / `base.sass`

If you want to load various webfonts, it's best to do this for all variations etc within the `_base.sass`. Keep in mind that every font means additional load for the template users.

For compilation, adjust the settings in the `config.rb` to whatever you're comfortable with.

## Creating templates

1. Open your design in Chrome (`grunt` should have done so at [0.0.0.0:8080](http://0.0.0.0:8080/)) and start the devkit via the little extension icon on the top right. The devkit will open in the browser now.
2. Set up [Variations and Variables](#design-variations--variables) for your design by specifying them via style tags (variations) and CSS classes (variables). You can preview the variations and variable settings while developing the design. Add one, reload the page and it will appear in the left hand menu.
3. Replace your content with Jimdo placeholders using whatever editor you prefer
4. Preview your design with content from different sites. Default site is http://nicecontent.jimdo.com. To get a preview of all possible Jimdo elements, choose http://allcontents.jimdo.com
5. Make changes, fix any visual problems
6. ~~Upload your design~~ – :construction: this is currently restricted to the Jimdo team to avoid random template output :construction:

## Design variations & variables

- **Designs:** Geometrically differing templates for a site
- **Design variations:** Separate color/image/font... combinations, predefined by the designer
- **Design variables:** User-defined settings that expand/alter a design variation

### Design Options
Design variations and variables appear in a "Design Options" panel overlaying the design. They are started automatically when starting the "DevKit". All valid variations and variables will appear in the small menu on the upper left side of your browser window when starting the extension. Don't worry about strange label names. We'll fix that later – they should already give you a basic idea of what you're altering.

### Variations

Variations are separate CSS files linked from the head of your HTML document.

*Variation example:*

```html
<link rel="stylesheet-variation" data-name="Blue steel" href="css/variation-blue.css" data-icon="#79BACC" />
```

These stylesheets overwrite settings in the default `style.css`. They can be switched on and off via the Design Options panel.

### Variables

You can add the ability to change certain parts of your template simply by adding CSS classes. Within the extension, all available classes are listed in the tab "Design Options".

### Siteadmin changes

For new designs, the Design Options panel will also show up in the Jimdo siteadmin. The user can select variations & variables here and will be able to save those as a custom setting created for their particular design.

[You can find the complete documentation here](http://live.dmp.jimdo-server.com/pages/customization_information).

---

Made with <3 in Hamburg.
