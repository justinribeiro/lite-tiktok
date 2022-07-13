[![npm version](https://badge.fury.io/js/@justinribeiro%2Flite-tiktok.svg)](https://badge.fury.io/js/@justinribeiro%2Flite-tiktok) ![min+gzip](https://img.shields.io/badge/min%2Bgzip-1.9kb-blue) ![min+br](https://img.shields.io/badge/min%2Bbr-1.5kb-blue) [![](https://data.jsdelivr.com/v1/package/npm/@justinribeiro/lite-tiktok/badge)](https://www.jsdelivr.com/package/npm/@justinribeiro/lite-tiktok)

![Statements](https://img.shields.io/badge/statements-92.06%25-brightgreen.svg?style=flat) ![Branches](https://img.shields.io/badge/branches-80%25-yellow.svg?style=flat) ![Functions](https://img.shields.io/badge/functions-81.25%25-yellow.svg?style=flat) ![Lines](https://img.shields.io/badge/lines-92.06%25-brightgreen.svg?style=flat)

# \<lite-tiktok\>

> A web component that lazy loads TikTok embeds. Currently experimental and a work in progress.

## The Problem

TikTok's video embed is truly a nightmare for your web performance. Full stop, do not pass go, cry under your desk.

In my rough pass tracing and testing, a single embed will load _500kB_ of JavaScript on the wire. It will then load _3-5Mb_ of images, on top of loading the entire video clip. In sum total, expect 8-12MB on the wire. Don't believe me? Try it and pop DevTools open or eyeball the screenshot below.

![junk junk junk](https://user-images.githubusercontent.com/643503/178827832-1f247cf1-8766-49fe-adc2-dd2d4a28a991.png)

This component does not make the underlying bad behavior of their iframe any less worse other than preventing it from burning up and blocking your main thread on load by forcing an interaction to load it. This however leads to problem number two.

## The Second Problem

TikTok basically doesn't have an API for their embed, unlike most other video players. As such, there is not autoplay or postMessage event that you can send to tell it "play this video". This makes the component not a great experience from an on interaction perspective; you'll always end up with two taps to play the video.

We get around this by again using an Intersection Observer, but it's not awesome in my opinion given the weight.

## The Third Problem

Unlike YouTube, the placeholder image has to be fetched via their `oembed` endpoint and cannot be determined by video id alone. This results in a fetch call to the end point to fill in the base data. Note however, that action is still a factor of 100 (not a typo) faster than waiting for their terrible JavaScript to load fill in the same placeholder on mobile devices.

Seriously, that embed is truly that terrible.

## Install via package manager

This web component is built with ES modules in mind and is available on NPM:

To install, use your package manager of choice:

```sh
npm i @justinribeiro/lite-tiktok
# or
yarn add @justinribeiro/lite-tiktok
```

After install, import into your project:

```js
import '@justinribeiro/lite-tiktok';
```

## Install with CDN

If you want the paste-and-go version, you can simply load it via CDN:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-tiktok@0.0.1/lite-tiktok.js"></script>
```

## Basic Usage

Note: as I say above, because there is no play event available, this will require a double tap to play. You likely want the IntersectionObserver example below is you want lazy load and single interaction play.

```html
<lite-tiktok videoid="7117052937028980014"></lite-tiktok>
```

## AutoLoad with IntersectionObserver

Uses Intersection Observer if available to automatically load the TikTok iframe when scrolled into view.

```html
<lite-tiktok videoid="7117052937028980014" autoload></lite-tiktok>
```

## Attributes

The web component allows certain attributes to be give a little additional
flexibility.

| Name           | Description                                                      | Default |
| -------------- | ---------------------------------------------------------------- | ------- |
| `videoid`      | The TikTok video id                                              | ``      |
| `autoload`     | Use Intersection Observer to load iframe when scrolled into view | `false` |
