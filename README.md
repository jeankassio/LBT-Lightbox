# LBT-Lightbox
LBT Lightbox - Plugin jQuery - Lightbox with captions and image pagination

A jQuery plugin supporting images, Youtube videos, Vimeo videos and HTML5 videos.

You can find a demo of the plugin on [CodePen.io](https://codepen.io/jeankassio/pen/xxJPPPR).

## How to use

Select the parent selector that contains the images/videos you want to insert into the LBT-Lightbox.

```
<div id="gallery">
    <img src="https://i.imgur.com/erfkvGW.jpeg">   
    <img src="https://i.imgur.com/7kuTKym.jpeg">
    ...
```
In our case, "gallery"

```
$('#gallery').lbtLightBox();
```

And the result will be:

![](https://i.imgur.com/hJiUIzr.png)


##Options

There are a few options you can pass to the plugin.
See the following example:


```
<div id="gallery">
  <div class="box">
    <img src="https://i.imgur.com/erfkvGW.jpeg">
    <div class="caption">
      <p>Descrição numero 1</p>
    </div>
  </div>
  <div class="box">
    <img src="https://i.imgur.com/7kuTKym.jpeg">
    <div class="caption">
      <p>Descrição numero 2</p>
    </div>
  </div>
  <div class="box">
  ...
```

Note that parent and child orientation is different from the first example, so you need to make that explicit in the plugin options.
And there are also captions, which are deactivated by default, which we must activate and explain what their class is.
We will also change the pagination amount and its size.

```
$('#gallery').lbtLightBox({
    qtd_pagination: 6,
    pagination_width: "160px",
    pagination_height: "160px",
    custom_children: ".box img",
    captions: true,
    captions_selector: ".caption p",
});
```

And the result will be:

![](https://i.imgur.com/OW6iYoY.png)

## Dynamically inserted content

If you insert content dynamically after calling the plugin, just call the "update" method.

```
$instance = $('#gallery').lbtLightBox({
    qtd_pagination: 6,
    pagination_width: "160px",
    pagination_height: "160px",
    custom_children: ".box img",
    captions: true,
    captions_selector: ".caption p",
});

~ some content ~

$instance.update();
```

## Preloading images that will be previewed in Lightbox

```
$instance = $('#gallery').lbtLightBox();

$instance.preload();
```

## IndexedDB Support

Or, if you prefer, instead of using image preloading, you can use the IndexedDB client-side database support, which will save all images in the database before they are viewed.

To do this, just pass the "bd" parameter as "true"

```
$instance = $('#gallery').lbtLightBox({
    db: true
});
```

## Copyright and license

Code released under the [MIT license](https://github.com/jeankassio/LBT-Lightbox/blob/main/LICENSE).














