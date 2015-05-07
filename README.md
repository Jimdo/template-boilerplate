# Boilerplate for new Jimdo templates

**With this boilerplate, you can easily develop new templates for Jimdo.**

## Setup

First download and install the Chrome extention:
http://devkit.dmp.jimdo-server.com

Then you can configure your local enviroment.

### Dependencies

- for [Sass](http://sass-lang.com/) you need to have a working [Ruby](https://www.ruby-lang.org/en/) installed. If you are new to the Ruby world, by all means install a Ruby version manager like [RVM](http://rvm.io/) (or [rbenv](http://rbenv.org/)).
- We're using Node.js for several stuff to provide the boilerplate. So you need to have a current version of [node.js](http://nodejs.org/).
- the serve-and-compile engine is [Gulp](http://gulpjs.com/). Install it global on your machine:  
      $ npm install --global gulp # install gulp global
- Same to bower: For our template library with needed code like SASS mixins or the jade layout you need [bower](http:/bower.io/). Install it with:
      $ npm install -g bower

### Installation

Go into your boilerplate folder and copy the follwing commands and paste them into your terminal:

    $ npm install # should install Grunt and Grunt tasks for this boilerplate
    $ bower install # install our template lib bower package

## Fire it up

    $ gulp # should start the default gulp task: compile all the Sass and Jade, start a server and open a new browser tab with the current version of your template, then watch sass and Jade to recompile on changes.

## CSS Livereload

The boilerplate supports Livereload, install a chrome extension for it and use it. Be sure you **deactivate** the extension before you upload your template to the Jimdo system.

Install the [Chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) of [LiveReload](http://livereload.com/) for more unicorn.


## Configuration

To configure your template take a look to the `template.cson` file. Add meta values and basic informations like variations to your template. Do not add meta tags or link tags manual to your template, Jade will do this for you.

### Meta Data

Add here your personal meta tags our adjust the Jimdo needed meta tags like template name or version:

```cson
meta:

  # Template Name
  "devkit.template-name": "Boilerplate"

  # The templates version – versioning is done via Semantic Versioning,
  # see semver.org for more info. Patch level updates are pushed to the user
  # without any further action necessary. Major and minor updates require the
  # user to reselect the template.
  "jimdo.version": "0.1.0"

  # Please provide the main color for the basic style.css as you do with variations.
  "jimdo.color": "#0099ee"

  # This en or disabled the awesomebgs
  "jimdo.ownbg.allowed": "yes"

  # You can disable styles for single Jimdo modules by adding them here.
  # In this case, the comments and the product module styles are not loaded
  # For a list of available modules check the documentation or the body tag in the preview.
  "jimdo.styles.disabled": "m-comment m-product"
```  

The structure is always the same. The property is the name of the meta tag. the value the content.

In CSON file:

```cson
meta:
  "property": "value"
```

Converted in HTML:

```html
  <meta name="property" content="value" />
```

### Maintenance CSS File

Add a path to the maintenance css file. Usually the path is like:

```
maincss: "css/style.min.css"
```

### Configure Variations

Jade will automatically add your `link` tags in the `head` area of your template. You can manage your variations in this way:

```cson
variations:

  # Reverse
  reverse:
    name: "Reverse"
    link: "css/variation.min.css"
    color: "#2f2f2f"

  # Saturated
  saturated:
    name: "Saturated"
    link: "css/variation.min.css"
    color: "#2f2f2f"

  # Light
  light:
    name: "Light"
    link: "css/variation.min.css"
    color: "#2f2f2f"

  # Light
  dark:
    name: "Dark"
    link: "css/variation.min.css"
    color: "#2f2f2f"
```

Every variation has a identifier like `reverse` or `light`. Be sure you use every identifier only one time.
You need to set three values for every variation: A name, a path to the rendered css file and a color. The color
will be used for example as little bullets in the jimdo app to scroll through the variations.

## General advice

The nesting within these files is kept as flat as possible. This helps to avoid overriding style mode settings for the user. If you nest too deep, your selectors are too powerful to be overridden. Also, it's just not necessary to do that in most cases, so just don't do it.

Most of the partials provide a good basis to code from. Actually, filling the `base` folder with the general colors, typography and variables to gets you pretty far already. Adjust the buttons in the `_buttons.sass` to get going.

The template-lib provides some helpful mixins for sass, see more about this [here](https://github.com/Jimdo/template-lib/blob/master/README.md).

To easily build variations, simply alter the variables you already use within the style.sass. It's the fastest way to create variations from the basic setup of the `style.sass` / `base.sass`

If you want to load various webfonts, it's best to do this for all variations etc within the `_base.sass`. Keep in mind that every font means additional load for the template users.


## Creating templates

1. Open your design in Chrome (`grunt` should have done so at [localhost:8080](http://localhost:8080/)) and start the devkit via the little extension icon on the top right. The devkit will open in the browser now.
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
