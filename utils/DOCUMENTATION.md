<a name="module_utils"></a>

## utils

* [utils](#module_utils)
    * [.lastColor](#module_utils.lastColor)
    * [.name](#module_utils.name)
    * [.blend(color1, color2)](#module_utils.blend) ⇒ <code>string</code>
    * [.toRgb(color)](#module_utils.toRgb) ⇒ <code>Array</code>

<a name="module_utils.lastColor"></a>

### utils.lastColor
The most recent blended color.

**Kind**: static property of <code>[utils](#module_utils)</code>  
<a name="module_utils.name"></a>

### utils.name
The name of the module.

**Kind**: static constant of <code>[utils](#module_utils)</code>  
<a name="module_utils.blend"></a>

### utils.blend(color1, color2) ⇒ <code>string</code>
Blend two colors together

**Kind**: static method of <code>[utils](#module_utils)</code>  
**Returns**: <code>string</code> - The blended color.  

| Param | Type | Description |
| --- | --- | --- |
| color1 | <code>string</code> | The first color, in hexidecimal format. |
| color2 | <code>string</code> | The second color, in hexidecimal format. |

<a name="module_utils.toRgb"></a>

### utils.toRgb(color) ⇒ <code>Array</code>
Get the red, green, and blue values of a color.

**Kind**: static method of <code>[utils](#module_utils)</code>  
**Returns**: <code>Array</code> - An array of the red, green, and blue values,
each ranging from 0 to 255.  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>string</code> | A color, in hexidecimal format. |

