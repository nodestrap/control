# &lt;Control /&gt;
A generic element with `focus`/`blur` and `arrive`/`leave` state.

## Preview

```jsx
<Control tag='span' theme='primary' size='lg' gradient={true} outlined={true} focus={true} arrive={true} >
    hello world
</Control>
```
Rendered to:
```html
<span class="c1 thPrimary szLg gradient outlined focused arrived">
    hello world
</span>
```

## Features
* Includes all features in [`<Indicator />`](https://www.npmjs.com/package/@nodestrap/indicator).
* `focus`/`blur` state. Visualized in outlined ring.
* `arrive`/`leave` state. Visualized in dimmed color.
* Customizable via [`@cssfn/css-config`](https://www.npmjs.com/package/@cssfn/css-config).

## Installation

Using npm:
```
npm i @nodestrap/control
```

## Support Us

If you feel our lib is useful for your projects,  
please make a donation to avoid our project from extinction.

We always maintain our projects as long as we're still alive.

[[Make a donation](https://ko-fi.com/heymarco)]
