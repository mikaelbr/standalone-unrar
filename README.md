# standalone-unrar [![NPM version][npm-image]][npm-url]


A standalone `unrar` library without any need for external dependencies.
This library has the Unarchiver `unar` and `lsar` tools bundled. You can
download the tools separately or see the source code here, if needed: http://unarchiver.c3.cx/commandline


## Install

```
npm install --save standalone-unrar
```

## API

## Members

<dl>
<dt><a href="#unpack">unpack</a> ⇒ <code>ChildProcess</code></dt>
<dd><p>Function for unpacking an archived file.</p>
</dd>
<dt><a href="#list">list</a> ⇒ <code>ChildProcess</code></dt>
<dd><p>Function for unpacking an archived file.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#unrar">unrar(archive)</a> ⇒ <code>Object</code></dt>
<dd><p>Completely standalone unrar library for node.
Is bundled with unrar and rar list tools, so there is no need
for external dependencies.</p>
<p>Currently only works on Mac OS X.</p>
<p>This is a convenience function for list and unpack to avoid
repeting the archive path.
This means <code>unrar(path).unpack(func)</code> is the same as
<code>unrar.unpack(path, func)</code></p>
</dd>
</dl>

<a name="unpack"></a>
## unpack ⇒ <code>ChildProcess</code>
Function for unpacking an archived file.

**Kind**: global variable
**Returns**: <code>ChildProcess</code> - Result from execution

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>String</code> | path to archive to operate on |
| arguments | <code>Object</code> | Arguments passed to `unar` tool. |
| options | <code>Object</code> | Options passed to execution of the `unar` tool. |
| callback | <code>function</code> | Callback when data is unpacked |

**Example**
```js
unrar.unpack('pathTo.rar', function (err, output) {

});
unrar.unpack('pathTo.rar', { password: 'pwd' }, function (err, output) {

});
```
<a name="list"></a>
## list ⇒ <code>ChildProcess</code>
Function for unpacking an archived file.

**Kind**: global variable
**Returns**: <code>ChildProcess</code> - Result from execution

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>String</code> | path to archive to operate on |
| arguments | <code>Object</code> | Arguments passed to `unar` tool. |
| options | <code>Object</code> | Options passed to execution of the `unar` tool. |
| callback | <code>function</code> | Callback when data is unpacked |

**Example**
```js
unrar.list('pathTo.rar', function (err, entries) {
 // entries is a list of file names in the archive
});
unrar.list('pathTo.rar', { verbose: true }, function (err, output) {
 // entries is a complex object with details of all entries
});
```
<a name="unrar"></a>
## unrar(archive) ⇒ <code>Object</code>
Completely standalone unrar library for node.
Is bundled with unrar and rar list tools, so there is no need
for external dependencies.

Currently only works on Mac OS X.

This is a convenience function for list and unpack to avoid
repeting the archive path.
This means `unrar(path).unpack(func)` is the same as
`unrar.unpack(path, func)`

**Kind**: global function
**Returns**: <code>Object</code> - functions `unrar` and `list` that operate on `archive`
**See**

- unpack
- list


| Param | Type | Description |
| --- | --- | --- |
| archive | <code>String</code> | path to archive to operate on |

**Example**
```js
unrar('pathTo.rar').unpack(function (err, output) {

});
unrar('pathTo.rar').list(function (err, entries) {

});
unrar('pathTo.rar').list({
 // Arguments (same as unar and lsar):
 verbose: true,
 password: 'Password'
}, {
 // Options to execution
 cwd: 'someRoot'
}, function (err, entries) {

});
```

[npm-url]: https://npmjs.org/package/standalone-unrar
[npm-image]: http://img.shields.io/npm/v/standalone-unrar.svg?style=flat
[npm-downloads]: http://img.shields.io/npm/dm/standalone-unrar.svg?style=flat
