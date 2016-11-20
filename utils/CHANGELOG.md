# 1.6.0-rc.0 bracing-vortex (2016-10-26)

## Major notes2
Please read the [Sandbox Removal Blog Post](http://angularjs.blogspot.com/2016/09/angular-16-expression-sandbox-removal.html).

## Bug Fixes
- **input:** fix `step` validation for `input[type=number]`/`input[type=range]` ([081d06](https://github.com/angular/angular.js/commit/081d06ffd15c2c6c539ce97b5eb63fa8e2403818) [#15257](https://github.com/angular/angular.js/issues/15257))
- **jqLite:**
  - camelCase keys in `jqLite#data` ([fc0c11](https://github.com/angular/angular.js/commit/fc0c11db845d53061430b7f05e773dcb3fb5b860) [#15126](https://github.com/angular/angular.js/issues/15126))
  - align jqLite camelCasing logic with JQuery ([73050c](https://github.com/angular/angular.js/commit/73050cdda04675bfa6705dc841ddbbb6919eb048) [#7744](https://github.com/angular/angular.js/issues/7744))
- **$parse:**
  - treat falsy values as defined in assignment expressions ([4f44e0](https://github.com/angular/angular.js/commit/4f44e018948c45bfb07f0170de4f703d22778d71))
  - call once stable bind-once expressions with filter ([3b5751](https://github.com/angular/angular.js/commit/3b5751dce8d6c699dc76e47cfa544c30b38b9771))
  - Handle sign of `-undefined` consistently ([c1eaf3](https://github.com/angular/angular.js/commit/c1eaf3480b9a88e5309ff4931a720f3f62bd7606))
- **ngModel:** treat synchronous validators as boolean always ([7bc71a](https://github.com/angular/angular.js/commit/7bc71adc63bb6bb609b44dd2d3ea8fb0cd3f300b) [#14734](https://github.com/angular/angular.js/issues/14734))
- **$q:** treat thrown errors as regular rejections ([e13eea](https://github.com/angular/angular.js/commit/e13eeabd7e34a78becec06cfbe72c23f2dcb85f9) [#3174](https://github.com/angular/angular.js/issues/3174) [#15213](https://github.com/angular/angular.js/issues/15213))
- **ngTransclude:** use fallback content if only whitespace is provided ([32aa7e](https://github.com/angular/angular.js/commit/32aa7e7395527624119e3917c54ee43b4d219301) [#15077](https://github.com/angular/angular.js/issues/15077))
- **$compile:**
  - don't throw tplrt error when there is a whitespace around a top-level comment ([76d3da](https://github.com/angular/angular.js/commit/76d3dafdeaf2f343d094b5a34ffb74adf64bb284) [#15108](https://github.com/angular/angular.js/issues/15108))
  - disallow linking the same element more than once ([1e1fbc](https://github.com/angular/angular.js/commit/1e1fbc75f5e20e8541f517a5cf6f30f8f2eed53f))
  - lower the $sce context for src on video, audio, and track. ([ad9a99](https://github.com/angular/angular.js/commit/ad9a99d6895e1c07c950f7141bb0edfc1d4aaf61))
  - correctly merge consecutive text nodes on IE11 ([13c252](https://github.com/angular/angular.js/commit/13c2522baf7c8f616b2efcaab4bffd54c8736591) [#14924](https://github.com/angular/angular.js/issues/14924))
  - secure `link[href]` as a `RESOURCE_URL`s in `$sce`. ([04cad4](https://github.com/angular/angular.js/commit/04cad41d26ebaf44b5ee0c29a152d61f235f3efa) [#14687](https://github.com/angular/angular.js/issues/14687))
  - don't add leading white-space in attributes for a specific merge case ([305ba1](https://github.com/angular/angular.js/commit/305ba1a3fb3529cb3fdf04c12ac03fbb4f634456))
  - don't trim white-space in attributes ([97bbf8](https://github.com/angular/angular.js/commit/97bbf86a1979d099802f0d631c17c54b87563b40) [#5513](https://github.com/angular/angular.js/issues/5513) [#5597](https://github.com/angular/angular.js/issues/5597))
  - move check for interpolation of on-event attributes to compile time ([b89c21](https://github.com/angular/angular.js/commit/b89c2181a9a165e06c027390164e08635ec449f4) [#13267](https://github.com/angular/angular.js/issues/13267))
- **select:**
  - add/remove selected attribute for selected/unselected options ([c75698](https://github.com/angular/angular.js/commit/c75698df55f5a026bcd7fcecbb9d4ff0bc3ebc3e))
  - don't register options when select has no ngModel ([e8c2e1](https://github.com/angular/angular.js/commit/e8c2e119758e58e18fe43932d09a8ff9f506aa9d))
  - handle model updates when options are manipulated ([47c15f](https://github.com/angular/angular.js/commit/47c15fbcc10f118170813021e8e605ffd263ad84))
  - remove workaround for Chrome bug ([87eff2](https://github.com/angular/angular.js/commit/87eff27e971414fb163e2b5a7cfe78cb097a1951))
- **select, ngOptions:** make the handling of unknown / empty options consistent ([2785ad](https://github.com/angular/angular.js/commit/2785ad72599ca5f9558a116baecd83a5bebe3292))
- **ngValue:** set the element's value property in addition to the value attribute ([e6afca](https://github.com/angular/angular.js/commit/e6afca00c9061a3e13b570796ca3ab428c1723a1) [#14031](https://github.com/angular/angular.js/issues/14031))
- **aria/ngModel:** do not overwrite the default `$isEmpty()` method for checkboxes ([975a61](https://github.com/angular/angular.js/commit/975a6170efceb2a5e6377c57329731c0636eb8c8) [#14621](https://github.com/angular/angular.js/issues/14621))
- **$resource:**
  - fulfill promise with the correct value on error ([5f6949](https://github.com/angular/angular.js/commit/5f6949fdae57b15340c1213cce379c6e6f8aff62) [#14837](https://github.com/angular/angular.js/issues/14837))
  - pass all extra, owned properties as params ([acb545](https://github.com/angular/angular.js/commit/acb545ec3ebf099db68561033645941c900973b5) [#14866](https://github.com/angular/angular.js/issues/14866))
  - add semicolon to whitelist of delimiters to unencode in URL params ([2456ab](https://github.com/angular/angular.js/commit/2456ab63a613902d21c151445f9c697a76ab43b3))
- **$http:**
  - avoid `Possibly Unhandled Rejection` error when the request fails ([47583d](https://github.com/angular/angular.js/commit/47583d98005f6a498d397dbe2cedaadac69f0b47) [#13869](https://github.com/angular/angular.js/issues/13869))
  - properly increment/decrement `$browser.outstandingRequestCount` ([4f6f2b](https://github.com/angular/angular.js/commit/4f6f2bce4ac93b85320e42e5023c09d099779b7d) [#13782](https://github.com/angular/angular.js/issues/13782) [#14921](https://github.com/angular/angular.js/issues/14921))
- **ngMock:** trigger digest in `$httpBackend.verifyNoOutstandingRequest()` ([267ee9](https://github.com/angular/angular.js/commit/267ee9c892b0eb40908700ee2435793f8c6c1c84) [#13506](https://github.com/angular/angular.js/issues/13506))
- **ngAria:**
  - bind to `keydown` instead of `keypress` in `ngClick` ([ad41ba](https://github.com/angular/angular.js/commit/ad41baa1fdc057db3fe529ff87735b173b164b4c) [#14063](https://github.com/angular/angular.js/issues/14063))
  - don't add roles to native control elements ([9978de](https://github.com/angular/angular.js/commit/9978de11b7295fec1a2f4cb8fbeb9b62b54cb711) [#14076](https://github.com/angular/angular.js/issues/14076))
- **ngBind:** use same string representation as `$interpolate` ([fa80a6](https://github.com/angular/angular.js/commit/fa80a61a05a3b49a2c770d5544cb8480907a18d3))
- **ngMock/$httpBackend:** fail if a url is provided but is `undefined` ([7551b8](https://github.com/angular/angular.js/commit/7551b8975a91ee286cc2cf4af5e78f924533575e) [#8442](https://github.com/angular/angular.js/issues/8442) [#10934](https://github.com/angular/angular.js/issues/10934))
- **$route:** don't process route change controllers and templates for `redirectTo` routes ([7f4b35](https://github.com/angular/angular.js/commit/7f4b356c2bebb87f0c26b57a20415b004b20bcd1) [#3332](https://github.com/angular/angular.js/issues/3332))
- **loader:** `module.decorator` order of operations is now irrelevant ([6a2ebd](https://github.com/angular/angular.js/commit/6a2ebdba5df27e789e3cb10f11eedf90f7b9b97e) [#12382](https://github.com/angular/angular.js/issues/12382))
- **ngAnimate:** make svg elements work with `classNameFilter` ([81bf7e](https://github.com/angular/angular.js/commit/81bf7ed73ee67f9eb997da869c52839449ca02b3))


## New Features
- **jqLite:**
  - implement `jqLite(f)` as alias to `jqLite(document).ready(f)` ([369fb7](https://github.com/angular/angular.js/commit/369fb7f4f73664bcdab0350701552d8bef6f605e))
  - don't throw for elements with missing `getAttribute` ([4e6c14](https://github.com/angular/angular.js/commit/4e6c14dcae4a9a30b3610a288ef8d20db47c4417))
  - don't remove a boolean attribute for `.attr(attrName, '')` ([3faf45](https://github.com/angular/angular.js/commit/3faf4505732758165083c9d21de71fa9b6983f4a))
  - remove the attribute for `.attr(attribute, null)` ([4e3624](https://github.com/angular/angular.js/commit/4e3624552284d0e725bf6262b2e468cd2c7682fa))
  - return `[]` for `.val()` on `<select multiple>` with no selection ([d882fd](https://github.com/angular/angular.js/commit/d882fde2e532216e7cf424495db1ccb5be1789f8))
- **$http:**
  - remove deprecated callback methods: `success()/error()` ([b54a39](https://github.com/angular/angular.js/commit/b54a39e2029005e0572fbd2ac0e8f6a4e5d69014))
  - JSONP callback must be specified by `jsonpCallbackParam` config ([fb6634](https://github.com/angular/angular.js/commit/fb663418710736161a6b5da49c345e92edf58dcb) [#15161](https://github.com/angular/angular.js/issues/15161) [#11352](https://github.com/angular/angular.js/issues/11352))
  - JSONP requests now require a trusted resource URL ([6476af](https://github.com/angular/angular.js/commit/6476af83cd0418c84e034a955b12a842794385c4) [#11352](https://github.com/angular/angular.js/issues/11352))
- **ngModelOptions:** allow options to be inherited from ancestor `ngModelOptions` ([87a2ff](https://github.com/angular/angular.js/commit/87a2ff76af5d0a9268d8eb84db5755077d27c84c) [#10922](https://github.com/angular/angular.js/issues/10922))
- **input:** add support for binding to `input[type=range]` ([913016](https://github.com/angular/angular.js/commit/9130166767c4792c5d32d08a918fc7becf32c9a6) [#5892](https://github.com/angular/angular.js/issues/5892) [#14870](https://github.com/angular/angular.js/issues/14870))
- **ngRoute:** allow `ngView` to be included in an asynchronously loaded template ([c13c66](https://github.com/angular/angular.js/commit/c13c666728c1a1485ef18e92d7cb35118ce39609) [#1213](https://github.com/angular/angular.js/issues/1213))
- **select:** support values of any type added with `ngValue` ([f02b70](https://github.com/angular/angular.js/commit/f02b707b5e4a5ffd1e1a20d910754cfabfc19622) [#9842](https://github.com/angular/angular.js/issues/9842))
- **$interpolate:** use custom `toString()` function if present ([a5fd2e](https://github.com/angular/angular.js/commit/a5fd2e4c0376676fa317e09a8d8be4966b82cbfe) [#7317](https://github.com/angular/angular.js/issues/7317) [#11406](https://github.com/angular/angular.js/issues/11406))
- **$route:** implement `resolveRedirectTo` ([e98656](https://github.com/angular/angular.js/commit/e9865654b39c71be71034c38581a8c7bd16bc716) [#5150](https://github.com/angular/angular.js/issues/5150))
- **input[type=radio]:** allow `ngTrim` to work for `input[type=radio]` ([47724b](https://github.com/angular/angular.js/commit/47724baffe050269385b3481e9a9cf4ab3944b4b))
- **$q:** report promises with non rejection callback ([c9dffd](https://github.com/angular/angular.js/commit/c9dffde1cb167660120753181cb6d01dc1d1b3d0) [#13653](https://github.com/angular/angular.js/issues/13653) [#7992](https://github.com/angular/angular.js/issues/7992))
- **$location:** default hashPrefix to `'!'` ([aa077e](https://github.com/angular/angular.js/commit/aa077e81129c740041438688dff2e8d20c3d7b52) [#13812](https://github.com/angular/angular.js/issues/13812))


## Performance Improvements
- **form, ngModel:** change controllers to use prototype methods ([9e24e7](https://github.com/angular/angular.js/commit/9e24e774a558143b3478536911a3a4c1714564ba))
- **select:** don't prepend unknown option if already prepended ([ba36bd](https://github.com/angular/angular.js/commit/ba36bde6736f0810ca670e10952a8e1c021de531))
- **$animate:** listen for document visibility changes ([d71dc2](https://github.com/angular/angular.js/commit/d71dc2f5afec230711351e9f160873a41eb60597))
- **injector:** cache the results of the native class detection check ([5ceb5d](https://github.com/angular/angular.js/commit/5ceb5dbfa6d9b6d15232a1f5c767b2f431325948))
- **$parse:** Inline constants ([bd7d5f](https://github.com/angular/angular.js/commit/bd7d5f6345439aa2d1da708ffee20b4c565131d4))
- **$compile:** use strict comparison for `controller === '@'` ([bbd3db](https://github.com/angular/angular.js/commit/bbd3db14f857aab996ad129f2f15ca6348e9fd9f))
- **$parse:** remove Angular expression sandbox ([1547c7](https://github.com/angular/angular.js/commit/1547c751aa48efe7dbefef701c3df5983b04aa2e) [#15094](https://github.com/angular/angular.js/issues/15094))


## Breaking Changes

### **jqLite** due to:
- **[fc0c11](https://github.com/angular/angular.js/commit/fc0c11db845d53061430b7f05e773dcb3fb5b860))**: camelCase keys in `jqLite#data`

Previously, keys passed to the data method were left untouched.
Now they are internally camelCased similarly to how jQuery handles it, i.e.
only single (!) hyphens followed by a lowercase letter get converted to an
uppercase letter. This means keys `a-b` and `aB` represent the same data piece;
writing to one of them will also be reflected if you ask for the other one.

If you use Angular with jQuery, it already behaved in this way so no changes
are required on your part.

To migrate the code follow the examples below:

BEFORE:

```js
/* 1 */
elem.data('my-key', 2);
elem.data('myKey', 3);

/* 2 */
elem.data('foo-bar', 42);
elem.data()['foo-bar']; // 42
elem.data()['fooBar']; // undefined

/* 3 */
elem.data()['foo-bar'] = 1;
elem.data()['fooBar'] = 2;
elem.data('foo-bar'); // 1
```

AFTER:

```js
/* 1 */
// Rename one of the keys as they would now map to the same data slot.
elem.data('my-key', 2);
elem.data('my-key2', 3);

/* 2 */
elem.data('foo-bar', 42);
elem.data()['foo-bar']; // undefined
elem.data()['fooBar']; // 42

/* 3 */
elem.data()['foo-bar'] = 1;
elem.data()['fooBar'] = 2;
elem.data('foo-bar'); // 2
```

- **[73050c](https://github.com/angular/angular.js/commit/73050cdda04675bfa6705dc841ddbbb6919eb048)**: align jqLite camelCasing logic with JQuery

Before, when Angular was used without jQuery, the key passed
to the css method was more heavily camelCased; now only a single (!) hyphen
followed by a lowercase letter is getting transformed. This also affects APIs
that rely on the css method, like ngStyle.

If you use Angular with jQuery, it already behaved in this way so no changes
are needed on your part.

To migrate the code follow the example below:

Before:

HTML:

```html
// All five versions used to be equivalent.
<div ng-style={background_color: 'blue'}></div>
<div ng-style={'background:color': 'blue'}></div>
<div ng-style={'background-color': 'blue'}></div>
<div ng-style={'background--color': 'blue'}></div>
<div ng-style={backgroundColor: 'blue'}></div>
```

JS:

```js
// All five versions used to be equivalent.
elem.css('background_color', 'blue');
elem.css('background:color', 'blue');
elem.css('background-color', 'blue');
elem.css('background--color', 'blue');
elem.css('backgroundColor', 'blue');

// All five versions used to be equivalent.
var bgColor = elem.css('background_color');
var bgColor = elem.css('background:color');
var bgColor = elem.css('background-color');
var bgColor = elem.css('background--color');
var bgColor = elem.css('backgroundColor');
```

After:

HTML:

```html
// Previous five versions are no longer equivalent but these two still are.
<div ng-style={'background-color': 'blue'}></div>
<div ng-style={backgroundColor: 'blue'}></div>
```

JS:

```js
// Previous five versions are no longer equivalent but these two still are.
elem.css('background-color', 'blue');
elem.css('backgroundColor', 'blue');

// Previous five versions are no longer equivalent but these two still are.
var bgColor = elem.css('background-color');
var bgColor = elem.css('backgroundColor');
```

- **[3faf45](https://github.com/angular/angular.js/commit/3faf4505732758165083c9d21de71fa9b6983f4a)**: don't remove a boolean attribute for `.attr(attrName, '')`

Before, using the `attr` method with an empty string as a value
would remove the boolean attribute. Now it sets it to its lowercase name as
was happening for every non-empty string so far. The only two values that remove
the boolean attribute are now null &amp; false, just like in jQuery.

To migrate the code follow the example below:

Before:

```js
elem.attr(booleanAttrName, '');
```

After:

```js
elem.attr(booleanAttrName, false);
```

or:

```js
elem.attr(booleanAttrName, null);
```

- **[4e3624](https://github.com/angular/angular.js/commit/4e3624552284d0e725bf6262b2e468cd2c7682fa)**: remove the attribute for `.attr(attribute, null)`

Invoking `elem.attr(attributeName, null)` would set the
`attributeName` attribute value to a string `"null"`, now it removes the
attribute instead.

To migrate the code follow the example below:

Before:

```js
elem.attr(attributeName, null);
```

After:

```js
elem.attr(attributeName, "null");
```

- **[d882fd](https://github.com/angular/angular.js/commit/d882fde2e532216e7cf424495db1ccb5be1789f8)**: return [] for .val() on `<select multiple>` with no selection

For the jqLite element representing a select element in
the multiple variant with no options chosen the .val() getter used to return
null and now returns an empty array.

To migrate the code follow the example below:

Before:

HTML:

```html
    <select multiple>
        <option>value 1</option>
        <option>value 2</option>
    </select>
```

JavaScript:

```js
    var value = $element.val();
    if (value) {
        /* do something */
    }
```

After:

HTML:

```html
    <select multiple>
        <option>value 1</option>
        <option>value 2</option>
    </select>
```

JavaScript:

```js
    var value = $element.val();
    if (value.length > 0) {
        /* do something */
    }
```
