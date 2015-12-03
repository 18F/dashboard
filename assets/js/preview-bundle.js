(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (Buffer){
// var aboutYmlValidator = require('about-yml-npm');
// var validator = new aboutYmlValidator();



var liquid = window.l = require('liquid.js');

var url = cleanUrl(window.location.search);
var xhr = new XMLHttpRequest();
xhr.addEventListener("load", insertAboutYml);

xhr.open('GET', url);
xhr.send();

function insertAboutYml (e) {
  var res = e.target;
  if (res.status !== 200) return;

  var yml = jsyaml.safeLoad(res.responseText);
  var template = compileLiquidTemplate();
  var html = template.render({ page: { project: yml }});

  document.querySelector('[role=main]').innerHTML = html;
}

function cleanUrl (url) {
  return url.replace('?url=', '')
    .replace('https://github.com','https://raw.githubusercontent.com')
    .replace('blob/', '');
}

function compileLiquidTemplate () {
  var templateSrc = Buffer("LS0tCmxheW91dDogYmFyZQotLS0KPCEtLQogIERvIHRoZSBvdGhlciB0aGluZ3MgaGVyZS4gQmFzaWNhbGx5LCB3ZSBub3cgaGF2ZSB0d28gb2JqZWN0cyBpbnNpZGUgdGhpcyBsb29wOgogIC0gdGhlIHBhZ2Ugb2JqZWN0IHdoaWNoIGhhcyBhbnl0aGluZyBpbiBhIHBhZ2UncyBmcm9udCBtYXR0ZXIKICAtIHRoZSBwcm9qZWN0IG9iamVjdCwgd2hpY2ggaXMgdGhlIHByb2plY3QgaW5zaWRlIF9kYXRhL3Byb2plY3RzLnltbAogICAgd2hvc2UgYHByb2plY3RgIGZpZWxkIG1hdGNoZXMgdGhpZSBwYWdlJ3MgYHRpdGxlYCBmaWVsZC4KLS0+CnslIGFzc2lnbiBwcm9qZWN0ID0gcGFnZS5wcm9qZWN0ICV9PHNlY3Rpb24gY2xhc3M9ImRhc2hib2FyZC1wcm9qZWN0Ij4KICA8bmF2PjxhIGhyZWY9Int7IHNpdGUuYmFzZXVybCB9fS8iPjxpIGNsYXNzPSJmYSBmYS1jaGV2cm9uLWxlZnQiPjwvaT48aSBjbGFzcz0iZmEgZmEtY2hldnJvbi1sZWZ0Ij48L2k+IGJhY2sgdG8gbWFpbiBkYXNoYm9hcmQ8L2E+PC9uYXY+CiAgPGgxPnt7IHByb2plY3QuZnVsbF9uYW1lIH19IDxzcGFuIGNsYXNzPSJzdGF0dXMge3sgcHJvamVjdC5zdGFnZSB9fSI+eyUgaWYgcHJvamVjdC5zdGFnZSAlfXt7IHByb2plY3Quc3RhZ2UgfX17JSBlbHNlICV9dW5rbm93bnslIGVuZGlmICV9PC9zcGFuPjwvaDE+CiAgPHA+eyUgaWYgcHJvamVjdC5kZXNjcmlwdGlvbiAlfXt7IHByb2plY3QuZGVzY3JpcHRpb24gfX17JSBlbHNlICV9UHJvamVjdCBkZXNjcmlwdGlvbiBjb21pbmcgc29vbi57JSBlbmRpZiAlfTwvcD4KICA8cD5Db250YWN0OgogICAgeyUgY2FwdHVyZSBjb250YWN0ICV9e3sgcHJvamVjdC5jb250YWN0IH19eyUgZW5kY2FwdHVyZSAlfQogICAgeyUgYXNzaWduIGNvbnRhY3QgPSBwcm9qZWN0LmNvbnRhY3QgJX0KICAgIHslIGZvciBjIGluIGNvbnRhY3QgJX0KICAgICAgeyUgaWYgYy51cmwgJiYgYy50ZXh0ICV9CiAgICAgICAgPGEgaHJlZj0ie3sgYy51cmwgfX0iPnt7IGMudGV4dCB9fTwvYT4KICAgICAgeyUgZWxzZSAlfQogICAgICAgIHslIGlmIGMgY29udGFpbnMgJ0AnICV9CiAgICAgICAgICB7JSBhc3NpZ24gbWFpbCA9IGMgfCByZW1vdmVfZmlyc3Q6ICdtYWlsdG86JyAlfQogICAgICAgICAgPGEgaHJlZj0ibWFpbHRvOnt7bWFpbH19Ij57e21haWx9fTwvYT4KICAgICAgICB7JSBlbHNlICV9CiAgICAgICAgICB7JSBhc3NpZ24gdXJsID0gYyB8IHJlbW92ZV9maXJzdDogJ2h0dHBzOi8vd3d3LmdpdGh1Yi5jb20vJyB8IHJlbW92ZV9maXJzdDogJ2h0dHBzOi8vZ2l0aHViLmNvbS8nICV9CiAgICAgICAgICA8YSBocmVmPSJodHRwczovL3d3dy5naXRodWIuY29tL3t7dXJsfX0iPnt7dXJsfX08L2E+CiAgICAgICAgeyUgZW5kaWYgJX0KICAgICAgeyUgZW5kaWYgJX0KICAgIHslIGVuZGZvciAlfQogIDwvcD4KICB7JSBjYXB0dXJlIGJsb2cgJX17eyBwcm9qZWN0LmJsb2cgfX17JSBlbmRjYXB0dXJlICV9CiAgeyUgYXNzaWduIHRhZ3MgPSBibG9nIHwgc3BsaXQ6ICcsJyAlfQogIHslIGlmIHRhZ3Muc2l6ZSA+IDAgJX0KICAgIDxwPgogICAgICA8aSBjbGFzcz0iZmEgZmEtbmV3c3BhcGVyLW8iPjwvaT4gIC8KICAgICAgPHNwYW4gY2xhc3M9ImJsb2ctdGFncyIgaXRlbXByb3A9ImtleXdvcmRzIj4KICAgICAgICB7JSBmb3IgdCBpbiB0YWdzICV9CiAgICAgICAgICA8YSBocmVmPSJodHRwczovLzE4Zi5nc2EuZ292L3RhZ3Mve3sgdCB9fSI+TmV3czwvYT4KICAgICAgICAgIC8KICAgICAgICB7JSBlbmRmb3IgJX0KICAgICAgPC9zcGFuPgogICAgPC9wPgogIHslIGVuZGlmICV9Cjwvc2VjdGlvbj4KCjxzZWN0aW9uIGNsYXNzPSJkYXNoYm9hcmQtaW5mby1hcmVhIj4KICA8ZGl2PgogICAgPCEtLSBpbXBhY3QgLS0+CiAgICB7JSBpZiBwcm9qZWN0LmltcGFjdCAlfQogICAgICA8ZGl2PgogICAgICAgIDxoMT48aSBjbGFzcz0iZmEgZmEtY2hldnJvbi1yaWdodCI+PC9pPiBpbXBhY3Q8L2gxPgogICAgICAgIDxwPnt7IHByb2plY3QuaW1wYWN0IH19PC9wPgogICAgICA8L2Rpdj4KICAgIHslIGVuZGlmICV9CgogICAgPCEtLSBwYXJ0bmVycyAtLT4KICAgIHslIGlmIHByb2plY3QucGFydG5lcnMgJX0KICAgICAgPGRpdj4KICAgICAgICB7JSBpZiBwcm9qZWN0LnBhcnRuZXJzLnNpemUgPiAxICV9CiAgICAgICAgICA8aDE+PGkgY2xhc3M9ImZhIGZhLWNoZXZyb24tcmlnaHQiPjwvaT4gcGFydG5lcnM8L2gxPgogICAgICAgIHslIGVsc2UgJX0KICAgICAgICAgIDxoMT48aSBjbGFzcz0iZmEgZmEtY2hldnJvbi1yaWdodCI+PC9pPiBwYXJ0bmVyPC9oMT4KICAgICAgICB7JSBlbmRpZiAlfQogICAgICAgIDx1bD4KCiAgICAgICAgPC91bD4KICAgICAgPC9kaXY+CiAgICB7JSBlbmRpZiAlfQoKICAgIDwhLS0gbWlsZXN0b25lcyAtLT4KICAgIHslIGlmIHByb2plY3QubWlsZXN0b25lcyAlfQogICAgICA8ZGl2PgogICAgICAgIDxoMT48aSBjbGFzcz0iZmEgZmEtY2hldnJvbi1yaWdodCI+PC9pPiBtaWxlc3RvbmVzPC9oMT4KICAgICAgICA8dWw+CiAgICAgICAgICB7JSBmb3IgaXRlbSBpbiBwcm9qZWN0Lm1pbGVzdG9uZXMgJX0KICAgICAgICAgIDxsaT57eyBpdGVtIH19PC9saT4KICAgICAgICAgIHslIGVuZGZvciAlfQogICAgICAgIDwvdWw+CiAgICAgIDwvZGl2PgogICAgeyUgZW5kaWYgJX0KCiAgICA8IS0tIGNvZGUgLS0+CiAgICB7JSBpZiBwcm9qZWN0LmdpdGh1YiAlfQogICAgPGRpdiBjbGFzcz0iZGFzaGJvYXJkLWNvZGUiPgogICAgICA8aDE+PGkgY2xhc3M9ImZhIGZhLWNoZXZyb24tcmlnaHQiPjwvaT4gY29kZTwvaDE+CiAgICAgIHslIGZvciB1cmwgaW4gcHJvamVjdC5naXRodWIgJX0KICAgICAgICB7JSBpZiB1cmwubmFtZSAmJiB1cmwuZGVzY3JpcHRpb24gJX0KICAgICAgICAgIHslIGFzc2lnbiBmdWxsX3JlcG9fbmFtZSA9IHVybC5uYW1lICV9CiAgICAgICAgICB7JSBhc3NpZ24gcmVwb19uYW1lID0gdXJsLm5hbWUgfCBzcGxpdDogIi8iIHwgbGFzdCAlfQogICAgICAgICAgeyUgYXNzaWduIHJlcG9fZGVzYyA9IHVybC5kZXNjcmlwdGlvbiAlfQogICAgICAgIHslIGVsc2UgJX0KICAgICAgICAgIHslIGFzc2lnbiBmdWxsX3JlcG9fbmFtZSA9IHVybCAlfQogICAgICAgICAgeyUgYXNzaWduIHJlcG9fbmFtZSA9IHVybCB8IHNwbGl0OiAiLyIgfCBsYXN0ICV9CiAgICAgICAgeyUgZW5kaWYgJX0KICAgICAgPGRpdiBjbGFzcz0ie3sgcmVwb19uYW1lIHwgcmVwbGFjZTogIi4iLCAiLSIgfX0gcmVwbyI+CiAgICAgICAgPGgxPgogICAgICAgICAgeyUgaWYgcHJvamVjdC5naXRodWIgfCBmaXJzdCAlfQogICAgICAgICAgPGkgY2xhc3M9ImZhIGZhLWdpdGh1Yi1hbHQiPjwvaT4gPGEgY2xhc3M9ImdpdGh1Yi11cmwiIGhyZWY9Imh0dHBzOi8vZ2l0aHViLmNvbS97eyBmdWxsX3JlcG9fbmFtZSB9fSI+e3sgZnVsbF9yZXBvX25hbWUgfX08L2E+CiAgICAgICAgICB7JSBlbHNlICV9CiAgICAgICAgICA8aSBjbGFzcz0iZmEgZmEtZ2l0aHViLWFsdCI+PC9pPiA8YSBocmVmPSJodHRwczovL2dpdGh1Yi5jb20ve3sgZnVsbF9yZXBvX25hbWUgfX0iPnt7IGZ1bGxfcmVwb19uYW1lIH19PC9hPgogICAgICAgICAgeyUgZW5kaWYgJX0KICAgICAgICA8L2gxPgogICAgICAgIHslIGlmIHJlcG9fZGVzYyAlfQogICAgICAgICAgPHA+e3sgcmVwb19kZXNjIH19PC9wPgogICAgICAgIHslIGVuZGlmICV9CiAgICAgICAgPHVsPgogICAgICAgICAgPGxpIGNsYXNzPSJpc3N1ZXMiPjxpIGNsYXNzPSJmYSBmYS1leGNsYW1hdGlvbi1jaXJjbGUiPjwvaT4gSXNzdWVzOiA8L2xpPgogICAgICAgICAgPGxpIGNsYXNzPSJzdGFycyI+PGkgY2xhc3M9ImZhIGZhLXN0YXIiPjwvaT4gU3RhcnM6IDwvbGk+CiAgICAgICAgICA8bGkgY2xhc3M9ImZvcmtzIj48aSBjbGFzcz0iZmEgZmEtY29kZS1mb3JrIj48L2k+IEZvcmtzOiA8L2xpPgogICAgICAgICAgeyUgZm9yIGxpY2Vuc2UgaW4gcHJvamVjdC5saWNlbnNlcyAlfXslIGlmIGxpY2Vuc2VbMF0gPT0gcmVwb19uYW1lICV9CiAgICAgICAgICB7JSBjYXB0dXJlIGJyYW5jaCAlfXslIGlmIHByb2plY3QubGljZW5zZUJyYW5jaCAlfXt7IHByb2plY3QubGljZW5zZUJyYW5jaCB8IG1hcDogcmVwb19uYW1lIH19eyUgZWxzZSAlfW1hc3RlcnslZW5kaWYlfXslIGVuZGNhcHR1cmUgJX0KICAgICAgICAgIDxsaT48aSBjbGFzcz0iZmEgZmEtbGVnYWwge3sgbGljZW5zZVswXSB9fSI+PC9pPiBMaWNlbnNlOiA8YSBocmVmPSJodHRwczovL2dpdGh1Yi5jb20ve3sgZnVsbF9yZXBvX25hbWUgfX0vYmxvYi97eyBicmFuY2ggfX0vTElDRU5TRS5tZCI+e3sgbGljZW5zZVsxXSB9fTwvYT48L2xpPgogICAgICAgICAgICB7JSBlbmRpZiAlfQogICAgICAgICAgeyUgZW5kZm9yICV9CiAgICAgICAgPC91bD4KICAgICAgPC9kaXY+CiAgICAgIHslIGVuZGZvciAlfQogICAgPC9kaXY+CiAgICB7JSBlbmRpZiAlfQo8IS0tCiAgICB7JSBpZiBwcm9qZWN0LnRlYW0uc2l6ZSA+IDAgJX0KICAgIDxkaXY+CiAgICAgICA8aDE+VGVhbTo8L2gxPgogICAgICAgPHVsIGNsYXNzPSJzdGFmZiI+CiAgICAgICAgIHslIGNhcHR1cmUgdGVhbSAlfXt7IHByb2plY3QudGVhbSB9fXslIGVuZGNhcHR1cmUgJX0KICAgICAgICAgeyUgYXNzaWduIHRlYW0gPSB0ZWFtIHwgc3BsaXQ6ICcsJyAlfQogICAgICAgICB7JSBmb3IgbmFtZSBpbiB0ZWFtICV9CiAgICAgICAgICA8bGkgY2xhc3M9Int7IG5hbWUgfCByZXBsYWNlOiAnICcsICcnIH19Ij48L2xpPgogICAgICAgICB7JSBlbmRmb3IgJX0KICAgICAgIDwvdWw+CiAgICAgPC9kaXY+CiAgICB7JSBlbmRpZiAlfQotLT4KCiAgeyUgaWYgcHJvamVjdC5saW5rcyAlfQoKICAgIHslIGFzc2lnbiBoYXNfYXBpID0gZmFsc2UgJX0KICAgIHslIGZvciBpdGVtIGluIHByb2plY3QubGlua3MgJX0KICAgICAgeyUgaWYgaXRlbS5jYXRlZ29yeSA9PSAnYXBpJyAlfQogICAgICAgIHslIGFzc2lnbiBoYXNfYXBpID0gdHJ1ZSAlfQogICAgICB7JSBlbmRpZiAlfQogICAgeyUgZW5kZm9yICV9CgogIDwhLS0gYXBpIGxpbmtzIC0tPgogICAgeyUgaWYgaGFzX2FwaSA9PSB0cnVlICV9CiAgICA8ZGl2PgogICAgICA8aDE+PGkgY2xhc3M9ImZhIGZhLWNoZXZyb24tcmlnaHQiPjwvaT4gYXBpIGxpbmtzPC9oMT4KICAgICAgPHVsPnslIGZvciBpdGVtIGluIHByb2plY3QubGlua3MgJX0KICAgICAgeyUgaWYgaXRlbS5jYXRlZ29yeSA9PSAnYXBpJyAlfQogICAgICAgIDxsaT48YSBocmVmPSJ7eyBpdGVtLnVybCB9fSI+e3sgaXRlbS50ZXh0IH19PC9hPjwvbGk+eyUgZW5kaWYgJX17JSBlbmRmb3IgJX0KICAgICAgPC91bD4KICAgIDwvZGl2PgogICAgeyUgZW5kaWYgJX0KCiAgPCEtLSBhZGRpdGlvbmFsIGxpbmtzIC0tPgogICAgPGRpdj4KICAgICAgPGgxPjxpIGNsYXNzPSJmYSBmYS1jaGV2cm9uLXJpZ2h0Ij48L2k+IHJlbGF0ZWQgbGlua3M8L2gxPgogICAgICA8dWw+eyUgZm9yIGl0ZW0gaW4gcHJvamVjdC5saW5rcyAlfQogICAgICAgIHslIGlmIGl0ZW0uY2F0ZWdvcnkgIT0gJ2FwaScgYW5kIGl0ZW0uY2F0ZWdvcnkgIT0gJ3Byb2Nlc3MnICV9CiAgICAgICAgPGxpPnslIGlmIGl0ZW0udXJsICV9PGEgaHJlZj0ie3sgaXRlbS51cmwgfX0iPnt7IGl0ZW0udGV4dCB9fTwvYT48L2xpPnslIGVsc2UgJX08YSBocmVmPSJ7eyBpdGVtIH19Ij57eyBpdGVtIH19PC9hPnslIGVuZGlmICV9PC9saT4KICAgICAgICB7JSBlbmRpZiAlfXslIGVuZGZvciAlfQogICAgICA8L3VsPgogICAgPC9kaXY+CgogIDwhLS0gZW5kIG9mIHByb2plY3QgbGlua3Mgc2VjdGlvbiAtLT4KICB7JSBlbmRpZiAlfQoKICA8IS0tIGVycm9ycyAtLT4KICB7JSBpZiBwcm9qZWN0LmVycm9ycyAlfQogICAgPGRpdj4KICAgICAgPGgxPjxpIGNsYXNzPSJmYSBmYS1jaGV2cm9uLXJpZ2h0Ij48L2k+IC5hYm91dC55bWwgZXJyb3JzPC9oMT4KICAgICAgPHVsPnslIGZvciBpdGVtIGluIHByb2plY3QuZXJyb3JzICV9CiAgICAgICAgPGxpPnt7IGl0ZW0gfX08L2xpPnslIGVuZGZvciAlfQogICAgICA8L3VsPgogICAgPC9kaXY+CiAgeyUgZW5kaWYgJX0KCiAgPC9kaXY+Cjwvc2VjdGlvbj4KCgoKPHNjcmlwdCBzcmM9Int7c2l0ZS5iYXNldXJsfX0vYXNzZXRzL2pzL3VuZGVyc2NvcmUuanMiPjwvc2NyaXB0Pgo8c2NyaXB0IHNyYz0ie3tzaXRlLmJhc2V1cmx9fS9hc3NldHMvanMvanMteWFtbC5taW4uanMiPjwvc2NyaXB0Pgo8c2NyaXB0IHNyYz0ie3tzaXRlLmJhc2V1cmx9fS9hc3NldHMvanMvbWFpbi5qcyI+PC9zY3JpcHQ+Cgp7eyBjb250ZW50IH19Cg==","base64").toString();
  templateSrc = templateSrc.replace(/---[\s\S]*---/, '');
  return liquid.parse(templateSrc);
}

}).call(this,require("buffer").Buffer)
},{"buffer":2,"liquid.js":6}],2:[function(require,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('is-array')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var rootParent = {}

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
 *     on objects.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

function typedArraySupport () {
  function Bar () {}
  try {
    var arr = new Uint8Array(1)
    arr.foo = function () { return 42 }
    arr.constructor = Bar
    return arr.foo() === 42 && // typed array instances can be augmented
        arr.constructor === Bar && // constructor can be set
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (arg) {
  if (!(this instanceof Buffer)) {
    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
    if (arguments.length > 1) return new Buffer(arg, arguments[1])
    return new Buffer(arg)
  }

  this.length = 0
  this.parent = undefined

  // Common case.
  if (typeof arg === 'number') {
    return fromNumber(this, arg)
  }

  // Slightly less common case.
  if (typeof arg === 'string') {
    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
  }

  // Unusual.
  return fromObject(this, arg)
}

function fromNumber (that, length) {
  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < length; i++) {
      that[i] = 0
    }
  }
  return that
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

  // Assumption: byteLength() return value is always < kMaxLength.
  var length = byteLength(string, encoding) | 0
  that = allocate(that, length)

  that.write(string, encoding)
  return that
}

function fromObject (that, object) {
  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

  if (isArray(object)) return fromArray(that, object)

  if (object == null) {
    throw new TypeError('must start with number, buffer, array or string')
  }

  if (typeof ArrayBuffer !== 'undefined') {
    if (object.buffer instanceof ArrayBuffer) {
      return fromTypedArray(that, object)
    }
    if (object instanceof ArrayBuffer) {
      return fromArrayBuffer(that, object)
    }
  }

  if (object.length) return fromArrayLike(that, object)

  return fromJsonObject(that, object)
}

function fromBuffer (that, buffer) {
  var length = checked(buffer.length) | 0
  that = allocate(that, length)
  buffer.copy(that, 0, 0, length)
  return that
}

function fromArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Duplicate of fromArray() to keep fromArray() monomorphic.
function fromTypedArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  // Truncating the elements is probably not what people expect from typed
  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
  // of the old Buffer constructor.
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    array.byteLength
    that = Buffer._augment(new Uint8Array(array))
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromTypedArray(that, new Uint8Array(array))
  }
  return that
}

function fromArrayLike (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
// Returns a zero-length buffer for inputs that don't conform to the spec.
function fromJsonObject (that, object) {
  var array
  var length = 0

  if (object.type === 'Buffer' && isArray(object.data)) {
    array = object.data
    length = checked(array.length) | 0
  }
  that = allocate(that, length)

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
}

function allocate (that, length) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = Buffer._augment(new Uint8Array(length))
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that.length = length
    that._isBuffer = true
  }

  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
  if (fromPool) that.parent = rootParent

  return that
}

function checked (length) {
  // Note: cannot use `length < kMaxLength` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (subject, encoding) {
  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

  var buf = new Buffer(subject, encoding)
  delete buf.parent
  return buf
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  var i = 0
  var len = Math.min(x, y)
  while (i < len) {
    if (a[i] !== b[i]) break

    ++i
  }

  if (i !== len) {
    x = a[i]
    y = b[i]
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

  if (list.length === 0) {
    return new Buffer(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; i++) {
      length += list[i].length
    }
  }

  var buf = new Buffer(length)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

function byteLength (string, encoding) {
  if (typeof string !== 'string') string = '' + string

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'binary':
      // Deprecated
      case 'raw':
      case 'raws':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

// pre-set for values that may exist in the future
Buffer.prototype.length = undefined
Buffer.prototype.parent = undefined

function slowToString (encoding, start, end) {
  var loweredCase = false

  start = start | 0
  end = end === undefined || end === Infinity ? this.length : end | 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return 0
  return Buffer.compare(this, b)
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
  byteOffset >>= 0

  if (this.length === 0) return -1
  if (byteOffset >= this.length) return -1

  // Negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

  if (typeof val === 'string') {
    if (val.length === 0) return -1 // special case: looking for empty string always fails
    return String.prototype.indexOf.call(this, val, byteOffset)
  }
  if (Buffer.isBuffer(val)) {
    return arrayIndexOf(this, val, byteOffset)
  }
  if (typeof val === 'number') {
    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
    }
    return arrayIndexOf(this, [ val ], byteOffset)
  }

  function arrayIndexOf (arr, val, byteOffset) {
    var foundIndex = -1
    for (var i = 0; byteOffset + i < arr.length; i++) {
      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
      } else {
        foundIndex = -1
      }
    }
    return -1
  }

  throw new TypeError('val must be string, number or Buffer')
}

// `get` is deprecated
Buffer.prototype.get = function get (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` is deprecated
Buffer.prototype.set = function set (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) throw new Error('Invalid hex string')
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    var swap = encoding
    encoding = offset
    offset = length | 0
    length = swap
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'binary':
        return binaryWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function binarySlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
  }

  if (newBuf.length) newBuf.parent = this.parent || this

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
  if (offset < 0) throw new RangeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; i--) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), targetStart)
  }

  return len
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new RangeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function _augment (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array set method before overwriting
  arr._set = arr.set

  // deprecated
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.indexOf = BP.indexOf
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUIntLE = BP.readUIntLE
  arr.readUIntBE = BP.readUIntBE
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readIntLE = BP.readIntLE
  arr.readIntBE = BP.readIntBE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUIntLE = BP.writeUIntLE
  arr.writeUIntBE = BP.writeUIntBE
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeIntLE = BP.writeIntLE
  arr.writeIntBE = BP.writeIntBE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; i++) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"base64-js":3,"ieee754":4,"is-array":5}],3:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],4:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],5:[function(require,module,exports){

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

},{}],6:[function(require,module,exports){
var Liquid = {

  author: 'Matt McCray <darthapo@gmail.com>',
  version: '1.3.2',

  readTemplateFile: function(path) {
    throw ("This liquid context does not allow includes.");
  },

  registerFilters: function(filters) {
    Liquid.Template.registerFilter(filters);
  },

  parse: function(src) {
    return Liquid.Template.parse(src);
  }

};

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(obj) {
    for (var i=0; i<this.length; i++) {
      if (this[i] == obj) return i;
    }

    return -1;
  };
}

if (!Array.prototype.clear) {
  Array.prototype.clear = function() {
    this.length = 0;
  };
}

if (!Array.prototype.map) {
  Array.prototype.map = function(fun /*, thisp*/) {
    var len = this.length;
    if (typeof fun != "function")
      throw 'Array.map requires first argument to be a function';

    var res = new Array(len);
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in this)
        res[i] = fun.call(thisp, this[i], i, this);
    }

    return res;
  };
}

if (!Array.prototype.first) {
  Array.prototype.first = function() {
    return this[0];
  };
}

if (!Array.prototype.last) {
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
}

if (!Array.prototype.flatten) {
  Array.prototype.flatten = function() {
    var len = this.length;
    var arr = [];
    for (var i = 0; i < len; i++) {
      if (this[i] instanceof Array) {
        arr = arr.concat(this[i]);
      } else {
        arr.push(this[i]);
      }
    }

    return arr;
  };
}

if (!Array.prototype.each) {
  Array.prototype.each = function(fun /*, thisp*/) {
    var len = this.length;
    if (typeof fun != "function")
      throw 'Array.each requires first argument to be a function';

    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in this)
        fun.call(thisp, this[i], i, this);
    }

    return null;
  };
}

if (!Array.prototype.include) {
  Array.prototype.include = function(arg) {
    var len = this.length;

    return this.indexOf(arg) >= 0;
    for (var i = 0; i < len; i++) {
      if (arg == this[i]) return true;
    }

    return false;
  };
}


if (!String.prototype.capitalize) {
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  };
}

if (!String.prototype.strip) {
  String.prototype.strip = function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  };
}


Liquid.extensions = {};
Liquid.extensions.object = {};

Liquid.extensions.object.update = function(newObj) {
  for (var p in newObj) {
    this[p] = newObj[p];
  }

  return this;
};

Liquid.extensions.object.hasKey = function(arg) {
  return !!this[arg];
};

Liquid.extensions.object.hasValue = function(arg) {
  for (var p in this) {
    if (this[p] == arg) return true;
  }

  return false;
};

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  this.Class = function(){};

  this.Class.extend = function(prop) {
    var _super = this.prototype;

    initializing = true;
    var prototype = new this();
    initializing = false;

    for (var name in prop) {
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;

            this._super = _super[name];

            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    function Class() {
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }

    Class.prototype = prototype;

    Class.prototype.constructor = Class;

    Class.extend = arguments.callee;

    return Class;
  };
}).call(Liquid);

Liquid.Tag = Liquid.Class.extend({

  init: function(tagName, markup, tokens) {
    this.tagName = tagName;
    this.markup = markup;
    this.nodelist = this.nodelist || [];
    this.parse(tokens);
  },

  parse: function(tokens) {
  },

  render: function(context) {
    return '';
  }

});
Liquid.Block = Liquid.Tag.extend({

  init: function(tagName, markup, tokens){
    this.blockName = tagName;
    this.blockDelimiter = "end"+ this.blockName;
    this._super(tagName, markup, tokens);
  },

  parse: function(tokens) {
    if (!this.nodelist) this.nodelist = [];
    this.nodelist.clear();

    var token = tokens.shift();
    tokens.push(''); // To ensure we don't lose the last token passed in...
    while(tokens.length) {

      if( /^\{\%/.test(token) ) { // It's a tag...
        var tagParts = token.match(/^\{\%\s*(\w+)\s*(.*)?\%\}$/);

        if(tagParts) {
          if( this.blockDelimiter == tagParts[1] ) {
            this.endTag();
            return;
          }
          if( tagParts[1] in Liquid.Template.tags ) {
            this.nodelist.push( new Liquid.Template.tags[tagParts[1]]( tagParts[1], tagParts[2], tokens ) );
          } else {
            this.unknownTag( tagParts[1], tagParts[2], tokens );
          }
        } else {
          throw ( "Tag '"+ token +"' was not properly terminated with: %}");
        }
      } else if(/^\{\{/.test(token)) { // It's a variable...
        this.nodelist.push( this.createVariable(token) );
      } else { //if(token != '') {
        this.nodelist.push( token );
      } // Ignores tokens that are empty
      token = tokens.shift(); // Assign the next token to loop again...
    }

    this.assertMissingDelimitation();
  },

  endTag: function() {},

  unknownTag: function(tag, params, tokens) {
    switch(tag) {
      case 'else': throw (this.blockName +" tag does not expect else tag"); break;
      case 'end':  throw ("'end' is not a valid delimiter for "+ this.blockName +" tags. use "+ this.blockDelimiter); break;
      default:     throw ("Unknown tag: "+ tag);
    }
  },

  createVariable: function(token) {
    var match = token.match(/^\{\{(.*)\}\}$/);
    if(match) { return new Liquid.Variable(match[1]); }
    else { throw ("Variable '"+ token +"' was not properly terminated with: }}"); }
  },

  render: function(context) {
    return this.renderAll(this.nodelist, context);
  },

  renderAll: function(list, context) {
    return (list || []).map(function(token, i){
      var output = '';
      try { // hmmm... feels a little heavy
        output = ( token['render'] ) ? token.render(context) : token;
      } catch(e) {
        output = context.handleError(e);
      }
      return output;
    });
  },

  assertMissingDelimitation: function(){
    throw (this.blockName +" tag was never closed");
  }
});
Liquid.Document = Liquid.Block.extend({

  init: function(tokens){
    this.blockDelimiter = []; // [], really?
    this.parse(tokens);
  },

  assertMissingDelimitation: function() {
  }
});
Liquid.Strainer = Liquid.Class.extend({

  init: function(context) {
    this.context = context;
  },

  respondTo: function(methodName) {
    methodName = methodName.toString();
    if (methodName.match(/^__/)) return false;
    if (Liquid.Strainer.requiredMethods.include(methodName)) return false;
    return (methodName in this);
  }
});

Liquid.Strainer.filters = {};

Liquid.Strainer.globalFilter = function(filters) {
  for (var f in filters) {
    Liquid.Strainer.filters[f] = filters[f];
  }
}

Liquid.Strainer.requiredMethods = ['respondTo', 'context'];

Liquid.Strainer.create = function(context) {
  var strainer = new Liquid.Strainer(context);
  for (var f in Liquid.Strainer.filters) {
    strainer[f] = Liquid.Strainer.filters[f];
  }
  return strainer;
}
Liquid.Context = Liquid.Class.extend({

  init: function(assigns, registers, rethrowErrors) {
    this.scopes = [ assigns ? assigns : {} ];
    this.registers = registers ? registers : {};
    this.errors = [];
    this.rethrowErrors = rethrowErrors;
    this.strainer = Liquid.Strainer.create(this);
  },

  get: function(varname) {
    return this.resolve(varname);
  },

  set: function(varname, value) {
    this.scopes[0][varname] = value;
  },

  hasKey: function(key) {
    return (this.resolve(key)) ? true : false;
  },

  push: function() {
    var scpObj = {};
    this.scopes.unshift(scpObj);
    return scpObj // Is this right?
  },

  merge: function(newScope) {
    return Liquid.extensions.object.update.call(this.scopes[0], newScope);
  },

  pop: function() {
    if(this.scopes.length == 1){ throw "Context stack error"; }
    return this.scopes.shift();
  },

  stack: function(lambda, bind) {
    var result = null;
    this.push();
    try {
      result = lambda.apply(bind ? bind : this.strainer);
    } finally {
      this.pop();
    }
    return result;
  },

  invoke: function(method, args) {
    if( this.strainer.respondTo(method) ) {
      var result = this.strainer[method].apply(this.strainer, args);
      return result;
    } else {
      return (args.length == 0) ? null : args[0]; // was: $pick
    }
  },

  resolve: function(key) {
    switch(key) {
      case null:
      case 'nil':
      case 'null':
      case '':
        return null;

      case 'true':
        return true;

      case 'false':
        return false;

      case 'blank':
      case 'empty':
        return '';

      default:
        if((/^'(.*)'$/).test(key))      // Single quoted strings
          { return key.replace(/^'(.*)'$/, '$1'); }

        else if((/^"(.*)"$/).test(key)) // Double quoted strings
          { return key.replace(/^"(.*)"$/, '$1'); }

        else if((/^(\d+)$/).test(key)) // Integer...
          { return parseInt( key.replace(/^(\d+)$/ , '$1') ); }

        else if((/^(\d[\d\.]+)$/).test(key)) // Float...
          { return parseFloat( key.replace(/^(\d[\d\.]+)$/, '$1') ); }

        else if((/^\((\S+)\.\.(\S+)\)$/).test(key)) {// Ranges
          var range = key.match(/^\((\S+)\.\.(\S+)\)$/),
              left  = parseInt(range[1]),
              right = parseInt(range[2]),
              arr   = [];
          if (isNaN(left) || isNaN(right)) {
            left = range[1].charCodeAt(0);
            right = range[2].charCodeAt(0);

            var limit = right-left+1;
            for (var i=0; i<limit; i++) arr.push(String.fromCharCode(i+left));
          } else { // okay to make array
            var limit = right-left+1;
            for (var i=0; i<limit; i++) arr.push(i+left);
          }
          return arr;
        } else {
          var result = this.variable(key);
          return result;
        }
    }
  },

  findVariable: function(key) {
    for (var i=0; i < this.scopes.length; i++) {
      var scope = this.scopes[i];
      if( scope && typeof(scope[key]) !== 'undefined' ) {
        var variable = scope[key];
        if(typeof(variable) == 'function'){
          variable = variable.apply(this);
          scope[key] = variable;
        }
        if(variable && this._isObject(variable) && ('toLiquid' in variable)) {
          variable = variable.toLiquid();
        }
        if(variable && this._isObject(variable) && ('setContext' in variable)){
          variable.setContext(self);
        }
        return variable;
      }
    };
    return null;
  },

  variable: function(markup) {
    if(typeof markup != 'string') {
      return null;
    }

    var parts       = markup.match( /\[[^\]]+\]|(?:[\w\-]\??)+/g ),
        firstPart   = parts.shift(),
        squareMatch = firstPart.match(/^\[(.*)\]$/);

    if(squareMatch)
      { firstPart = this.resolve( squareMatch[1] ); }

    var object = this.findVariable(firstPart),
        self = this;

    if(object) {
      parts.each(function(part){
        var squareMatch = part.match(/^\[(.*)\]$/);
        if(squareMatch) {
          var part = self.resolve( squareMatch[1] );
          if( typeof(object[part]) == 'function'){ object[part] = object[part].apply(this); }// Array?
          object = object[part];
          if(self._isObject(object) && ('toLiquid' in object)){ object = object.toLiquid(); }
        } else {
          if( (self._isObject(object) || typeof(object) == 'hash') && (part in object)) {
            var res = object[part];
            if( typeof(res) == 'function'){ res = object[part] = res.apply(self) ; }
            if(self._isObject(res) && ('toLiquid' in res)){ object = res.toLiquid(); }
            else { object = res; }
          }
          else if( (/^\d+$/).test(part) ) {
            var pos = parseInt(part);
            if( typeof(object[pos]) == 'function') { object[pos] = object[pos].apply(self); }
            if(self._isObject(object) && self._isObject(object[pos]) && ('toLiquid' in object[pos])) { object = object[pos].toLiquid(); }
            else { object  = object[pos]; }
          }
          else if( object && typeof(object[part]) == 'function' && ['length', 'size', 'first', 'last'].include(part) ) {
            object = object[part].apply(part);
            if('toLiquid' in object){ object = object.toLiquid(); }
          }
          else {
            return object = null;
          }
          if(self._isObject(object) && ('setContext' in object)){ object.setContext(self); }
        }
      });
    }
    return object;
  },

  addFilters: function(filters) {
    filters = filters.flatten();
    filters.each(function(f){
      if(!this._isObject(f)){ throw ("Expected object but got: "+ typeof(f)) }
      this.strainer.addMethods(f);
    });
  },

  handleError: function(err) {
    this.errors.push(err);
    if(this.rethrowErrors){ throw err; }
    return "Liquid error: " + (err.message ? err.message : (err.description ? err.description : err));
  },

  _isObject: function(obj) {
    return obj != null && typeof(obj) == 'object';
  }

});
Liquid.Template = Liquid.Class.extend({

  init: function() {
    this.root = null;
    this.registers = {};
    this.assigns = {};
    this.errors = [];
    this.rethrowErrors = false;
  },

  parse: function(src) {
    this.root = new Liquid.Document( Liquid.Template.tokenize(src) );
    return this;
  },

  render: function() {
    if(!this.root){ return ''; }
    var args = {
      ctx: arguments[0],
      filters: arguments[1],
      registers: arguments[2]
    }
    var context = null;

    if(args.ctx instanceof Liquid.Context ) {
      context = args.ctx;
      this.assigns = context.assigns;
      this.registers = context.registers;
    } else {
      if(args.ctx){
        Liquid.extensions.object.update.call(this.assigns, args.ctx);
      }
      if(args.registers){
        Liquid.extensions.object.update.call(this.registers, args.registers);
      }
      context = new Liquid.Context(this.assigns, this.registers, this.rethrowErrors)
    }

    if(args.filters){ context.addFilters(arg.filters); }

    try {
      return this.root.render(context).join('');
    } finally {
      this.errors = context.errors;
    }
  },

  renderWithErrors: function() {
    var savedRethrowErrors = this.rethrowErrors;
    this.rethrowErrors = true;
    var res = this.render.apply(this, arguments);
    this.rethrowErrors = savedRethrowErrors;
    return res;
  }
});


Liquid.Template.tags = {};

Liquid.Template.registerTag = function(name, klass) {
  Liquid.Template.tags[ name ] = klass;
}

Liquid.Template.registerFilter = function(filters) {
  Liquid.Strainer.globalFilter(filters)
}

Liquid.Template.tokenize = function(src) {
  var tokens = src.split( /(\{\%.*?\%\}|\{\{.*?\}\}?)/ );
  if(tokens[0] == ''){ tokens.shift(); }
  return tokens;
}


Liquid.Template.parse =  function(src) {
  return (new Liquid.Template()).parse(src);
}
Liquid.Variable = Liquid.Class.extend({

  init: function(markup) {
    this.markup = markup;
    this.name = null;
    this.filters = [];
    var self = this;
    var match = markup.match(/\s*("[^"]+"|'[^']+'|[^\s,|]+)/);
    if( match ) {
      this.name = match[1];
      var filterMatches = markup.match(/\|\s*(.*)/);
      if(filterMatches) {
        var filters = filterMatches[1].split(/\|/);
        filters.each(function(f){
          var matches = f.match(/\s*(\w+)/);
          if(matches) {
            var filterName = matches[1];
            var filterArgs = [];
            (f.match(/(?:[:|,]\s*)("[^"]+"|'[^']+'|[^\s,|]+)/g) || []).flatten().each(function(arg){
              var cleanupMatch = arg.match(/^[\s|:|,]*(.*?)[\s]*$/);
              if(cleanupMatch)
                { filterArgs.push( cleanupMatch[1] );}
            });
            self.filters.push( [filterName, filterArgs] );
          }
        });
      }
    }
  },

  render: function(context) {
    if(this.name == null){ return ''; }
    var output = context.get(this.name);
    this.filters.each(function(filter) {
      var filterName = filter[0],
          filterArgs = (filter[1] || []).map(function(arg){
            return context.get(arg);
          });
      filterArgs.unshift(output); // Push in input value into the first argument spot...
      output = context.invoke(filterName, filterArgs);
    });

    return output;
  }
});
Liquid.Condition = Liquid.Class.extend({

  init: function(left, operator, right) {
    this.left = left;
    this.operator = operator;
    this.right = right;
    this.childRelation = null;
    this.childCondition = null;
    this.attachment = null;
  },

  evaluate: function(context) {
    context = context || new Liquid.Context();
    var result = this.interpretCondition(this.left, this.right, this.operator, context);
    switch(this.childRelation) {
      case 'or':
        return (result || this.childCondition.evaluate(context));
      case 'and':
        return (result && this.childCondition.evaluate(context));
      default:
        return result;
    }
  },

  or: function(condition) {
    this.childRelation = 'or';
    this.childCondition = condition;
  },

  and: function(condition) {
    this.childRelation = 'and';
    this.childCondition = condition;
  },

  attach: function(attachment) {
    this.attachment = attachment;
    return this.attachment;
  },

  isElse: false,

  interpretCondition: function(left, right, op, context) {
    if(!op)
      { return context.get(left); }

    left = context.get(left);
    right = context.get(right);
    op = Liquid.Condition.operators[op];
    if(!op)
      { throw ("Unknown operator "+ op); }

    var results = op(left, right);
    return results;
  },

  toString: function() {
    return "<Condition "+ this.left +" "+ this.operator +" "+ this.right +">";
  }

});

Liquid.Condition.operators = {
  '==': function(l,r) {  return (l == r); },
  '=':  function(l,r) { return (l == r); },
  '!=': function(l,r) { return (l != r); },
  '<>': function(l,r) { return (l != r); },
  '<':  function(l,r) { return (l < r); },
  '>':  function(l,r) { return (l > r); },
  '<=': function(l,r) { return (l <= r); },
  '>=': function(l,r) { return (l >= r); },

  'contains': function(l,r) {
    if ( Object.prototype.toString.call(l) === '[object Array]' ) {
      return l.indexOf(r) >= 0;
    } else {
      return l.match(r);
    }
  },
  'hasKey':   function(l,r) { return Liquid.extensions.object.hasKey.call(l, r); },
  'hasValue': function(l,r) { return Liquid.extensions.object.hasValue.call(l, r); }
}

Liquid.ElseCondition = Liquid.Condition.extend({

  isElse: true,

  evaluate: function(context) {
    return true;
  },

  toString: function() {
    return "<ElseCondition>";
  }

});
Liquid.Drop = Liquid.Class.extend({
  setContext: function(context) {
    this.context = context;
  },
  beforeMethod: function(method) {

  },
  invokeDrop: function(method) {
    var results = this.beforeMethod();
    if( !results && (method in this) )
      { results = this[method].apply(this); }
    return results;
  },
  hasKey: function(name) {
    return true;
  }
});
var hackObjectEach = function(fun /*, thisp*/) {
  if (typeof fun != "function")
    throw 'Object.each requires first argument to be a function';

  var i = 0;
  var thisp = arguments[1];
  for (var p in this) {
    var value = this[p], pair = [p, value];
    pair.key = p;
    pair.value = value;
    fun.call(thisp, pair, i, this);
    i++;
  }

  return null;
};

Liquid.Template.registerTag( 'assign', Liquid.Tag.extend({

  tagSyntax: /((?:\(?[\w\-\.\[\]]\)?)+)\s*=\s*(.+)/,

  init: function(tagName, markup, tokens) {
    var parts = markup.match(this.tagSyntax);
    if( parts ) {
      this.to   = parts[1];
      this.from = parts[2];
    } else {
      throw ("Syntax error in 'assign' - Valid syntax: assign [var] = [source]");
    }
    this._super(tagName, markup, tokens)
  },
  render: function(context) {
    var value = new Liquid.Variable(this.from);
    context.scopes.last()[this.to.toString()] = value.render(context);
    return '';
  }
}));

Liquid.Template.registerTag( 'cache', Liquid.Block.extend({
  tagSyntax: /(\w+)/,

  init: function(tagName, markup, tokens) {
    var parts = markup.match(this.tagSyntax)
    if( parts ) {
      this.to = parts[1];
    } else {
      throw ("Syntax error in 'cache' - Valid syntax: cache [var]");
    }
    this._super(tagName, markup, tokens);
  },
  render: function(context) {
    var output = this._super(context);
    context.scopes.last()[this.to] = [output].flatten().join('');
    return '';
  }
}));


Liquid.Template.registerTag( 'capture', Liquid.Block.extend({
  tagSyntax: /(\w+)/,

  init: function(tagName, markup, tokens) {
    var parts = markup.match(this.tagSyntax)
    if( parts ) {
      this.to = parts[1];
    } else {
      throw ("Syntax error in 'capture' - Valid syntax: capture [var]");
    }
    this._super(tagName, markup, tokens);
  },
  render: function(context) {
    var output = this._super(context);
    context.scopes.last()[this.to.toString()] = [output].flatten().join('');
    return '';
  }
}));

Liquid.Template.registerTag( 'case', Liquid.Block.extend({

  tagSyntax     : /("[^"]+"|'[^']+'|[^\s,|]+)/,
  tagWhenSyntax : /("[^"]+"|'[^']+'|[^\s,|]+)(?:(?:\s+or\s+|\s*\,\s*)("[^"]+"|'[^']+'|[^\s,|]+.*))?/,

  init: function(tagName, markup, tokens) {
    this.blocks = [];
    this.nodelist = [];

    var parts = markup.match(this.tagSyntax)
    if( parts ) {
      this.left = parts[1];
    } else {
      throw ("Syntax error in 'case' - Valid syntax: case [condition]");
    }

    this._super(tagName, markup, tokens);
  },
  unknownTag: function(tag, markup, tokens) {
    switch(tag) {
      case 'when':
        this.recordWhenCondition(markup);
        break;
      case 'else':
        this.recordElseCondition(markup);
        break;
      default:
        this._super(tag, markup, tokens);
    }

  },
  render: function(context) {
    var self = this,
        output = [],
        execElseBlock = true;

    context.stack(function(){
      for (var i=0; i < self.blocks.length; i++) {
        var block = self.blocks[i];
        if( block.isElse  ) {
          if(execElseBlock == true){ output = [output, self.renderAll(block.attachment, context)].flatten(); }
          return output;
        } else if( block.evaluate(context) ) {
          execElseBlock = false;
          output = [output, self.renderAll(block.attachment, context)].flatten();
        }
      };
    });

    return output;
  },
  recordWhenCondition: function(markup) {
    while(markup) {
      var parts = markup.match(this.tagWhenSyntax);
      if(!parts) {
        throw ("Syntax error in tag 'case' - Valid when condition: {% when [condition] [or condition2...] %} ");
      }

      markup = parts[2];

      var block = new Liquid.Condition(this.left, '==', parts[1]);
      this.blocks.push( block );
      this.nodelist = block.attach([]);
    }
  },
  recordElseCondition: function(markup) {
    if( (markup || '').strip() != '') {
      throw ("Syntax error in tag 'case' - Valid else condition: {% else %} (no parameters) ")
    }
    var block = new Liquid.ElseCondition();
    this.blocks.push(block);
    this.nodelist = block.attach([]);
  }
}));

Liquid.Template.registerTag( 'comment', Liquid.Block.extend({
  render: function(context) {
    return '';
  }
}));

Liquid.Template.registerTag( 'cycle', Liquid.Tag.extend({

  tagSimpleSyntax: /"[^"]+"|'[^']+'|[^\s,|]+/,
  tagNamedSyntax:  /("[^"]+"|'[^']+'|[^\s,|]+)\s*\:\s*(.*)/,

  init: function(tag, markup, tokens) {
    var matches, variables;
    matches = markup.match(this.tagNamedSyntax);
    if(matches) {
      this.variables = this.variablesFromString(matches[2]);
      this.name = matches[1];
    } else {
      matches = markup.match(this.tagSimpleSyntax);
      if(matches) {
        this.variables = this.variablesFromString(markup);
        this.name = "'"+ this.variables.toString() +"'";
      } else {
        throw ("Syntax error in 'cycle' - Valid syntax: cycle [name :] var [, var2, var3 ...]");
      }
    }
    this._super(tag, markup, tokens);
  },

  render: function(context) {
    var self   = this,
        key    = context.get(self.name),
        output = '';

    if(!context.registers['cycle']) {
      context.registers['cycle'] = {};
    }

    if(!context.registers['cycle'][key]) {
      context.registers['cycle'][key] = 0;
    }

    context.stack(function(){
      var iter    = context.registers['cycle'][key],
          results = context.get( self.variables[iter] );
      iter += 1;
      if(iter == self.variables.length){ iter = 0; }
      context.registers['cycle'][key] = iter;
      output = results;
    });

    return output;
  },

  variablesFromString: function(markup) {
    return markup.split(',').map(function(varname){
      var match = varname.match(/\s*("[^"]+"|'[^']+'|[^\s,|]+)\s*/);
      return (match[1]) ? match[1] : null
    });
  }
}));

Liquid.Template.registerTag( 'for', Liquid.Block.extend({
  tagSyntax: /(\w+)\s+in\s+((?:\(?[\w\-\.\[\]]\)?)+)/,

  init: function(tag, markup, tokens) {
    var matches = markup.match(this.tagSyntax);
    if(matches) {
      this.variableName = matches[1];
      this.collectionName = matches[2];
      this.name = this.variableName +"-"+ this.collectionName;
      this.attributes = {};
      var attrmarkup = markup.replace(this.tagSyntax, '');
      var attMatchs = markup.match(/(\w*?)\s*\:\s*("[^"]+"|'[^']+'|[^\s,|]+)/g);
      if(attMatchs) {
        attMatchs.each(function(pair){
          pair = pair.split(":");
          this.attributes[pair[0].strip()] = pair[1].strip();
        }, this);
      }
    } else {
      throw ("Syntax error in 'for loop' - Valid syntax: for [item] in [collection]");
    }
    this._super(tag, markup, tokens);
  },

  render: function(context) {
    var self       = this,
        output     = [],
        collection = (context.get(this.collectionName) || []),
        range      = [0, collection.length];

    if(!context.registers['for']){ context.registers['for'] = {}; }

    if(this.attributes['limit'] || this.attributes['offset']) {
      var offset   = 0,
          limit    = 0,
          rangeEnd = 0,
          segment = null;

      if(this.attributes['offset'] == 'continue')
        { offset = context.registers['for'][this.name]; }
      else
        { offset = context.get( this.attributes['offset'] ) || 0; }

      limit = context.get( this.attributes['limit'] );

      rangeEnd = (limit) ? offset + limit + 1 : collection.length;
      range = [ offset, rangeEnd - 1 ];

      context.registers['for'][this.name] = rangeEnd;
    }

    segment = collection.slice(range[0], range[1]);
    if(!segment || segment.length == 0){ return ''; }

    context.stack(function(){
      var length = segment.length;

      segment.each(function(item, index){
        context.set( self.variableName, item );
        context.set( 'forloop', {
          name:   self.name,
          length: length,
          index:  (index + 1),
          index0: index,
          rindex: (length - index),
          rindex0:(length - index - 1),
          first:  (index == 0),
          last:   (index == (length - 1))
        });
        output.push( (self.renderAll(self.nodelist, context) || []).join('') );
      });
    });

    return [output].flatten().join('');
  }
}));

Liquid.Template.registerTag( 'if', Liquid.Block.extend({

  tagSyntax: /("[^"]+"|'[^']+'|[^\s,|]+)\s*([=!<>a-z_]+)?\s*("[^"]+"|'[^']+'|[^\s,|]+)?/,

  init: function(tag, markup, tokens) {
    this.nodelist = [];
    this.blocks = [];
    this.pushBlock('if', markup);
    this._super(tag, markup, tokens);
  },

  unknownTag: function(tag, markup, tokens) {
    if( ['elsif', 'else'].include(tag) ) {
      this.pushBlock(tag, markup);
    } else {
      this._super(tag, markup, tokens);
    }
  },

  render: function(context) {
    var self = this,
        output = '';
    context.stack(function(){
      for (var i=0; i < self.blocks.length; i++) {
        var block = self.blocks[i];
        if( block.evaluate(context) ) {
          output = self.renderAll(block.attachment, context);
          return;
        }
      };
    })
    return [output].flatten().join('');
  },

  pushBlock: function(tag, markup) {
    var block;
    if(tag == 'else') {
      block = new Liquid.ElseCondition();
    } else {
      var expressions = markup.split(/\b(and|or)\b/).reverse(),
          expMatches  = expressions.shift().match( this.tagSyntax );

      if(!expMatches){ throw ("Syntax Error in tag '"+ tag +"' - Valid syntax: "+ tag +" [expression]"); }

      var condition = new Liquid.Condition(expMatches[1], expMatches[2], expMatches[3]);

      while(expressions.length > 0) {
        var operator = expressions.shift(),
            expMatches  = expressions.shift().match( this.tagSyntax );
        if(!expMatches){ throw ("Syntax Error in tag '"+ tag +"' - Valid syntax: "+ tag +" [expression]"); }

        var newCondition = new Liquid.Condition(expMatches[1], expMatches[2], expMatches[3]);
        newCondition[operator](condition);
        condition = newCondition;
      }

      block = condition;
    }
    block.attach([]);
    this.blocks.push(block);
    this.nodelist = block.attachment;
  }
}));

Liquid.Template.registerTag( 'ifchanged', Liquid.Block.extend({

  render: function(context) {
    var self = this,
        output = '';
    context.stack(function(){
      var results = self.renderAll(self.nodelist, context).join('');
      if(results != context.registers['ifchanged']) {
        output = results;
        context.registers['ifchanged'] = output;
      }
    });
    return output;
  }
}));

Liquid.Template.registerTag( 'include', Liquid.Tag.extend({

  tagSyntax: /((?:"[^"]+"|'[^']+'|[^\s,|]+)+)(\s+(?:with|for)\s+((?:"[^"]+"|'[^']+'|[^\s,|]+)+))?/,

  init: function(tag, markup, tokens) {
    var matches = (markup || '').match(this.tagSyntax);
    if(matches) {
      this.templateName = matches[1];
      this.templateNameVar = this.templateName.substring(1, this.templateName.length - 1);
      this.variableName = matches[3];
      this.attributes = {};

      var attMatchs = markup.match(/(\w*?)\s*\:\s*("[^"]+"|'[^']+'|[^\s,|]+)/g);
      if(attMatchs) {
        attMatchs.each(function(pair){
          pair = pair.split(":");
          this.attributes[pair[0].strip()] = pair[1].strip();
        }, this);
      }
    } else {
      throw ("Error in tag 'include' - Valid syntax: include '[template]' (with|for) [object|collection]");
    }
    this._super(tag, markup, tokens);
  },

  render: function(context) {
    var self     = this,
        source   = Liquid.readTemplateFile( context.get(this.templateName) ),
        partial  = Liquid.parse(source),
        variable = context.get((this.variableName || this.templateNameVar)),
        output   = '';
    context.stack(function(){
      self.attributes.each = hackObjectEach;
      self.attributes.each(function(pair){
        context.set(pair.key, context.get(pair.value));
      })

      if(variable instanceof Array) {
        output = variable.map(function(variable){
          context.set( self.templateNameVar, variable );
          return partial.render(context);
        });
      } else {
        context.set(self.templateNameVar, variable);
        output = partial.render(context);
      }
    });
    output = [output].flatten().join('');
    return output
  }
}));

Liquid.Template.registerTag( 'unless', Liquid.Template.tags['if'].extend({

  render: function(context) {
    var self = this,
        output = '';
    context.stack(function(){
      var block = self.blocks[0];
      if( !block.evaluate(context) ) {
        output = self.renderAll(block.attachment, context);
        return;
      }
      for (var i=1; i < self.blocks.length; i++) {
        var block = self.blocks[i];
        if( block.evaluate(context) ) {
          output = self.renderAll(block.attachment, context);
          return;
        }
      };
    })
    return [output].flatten().join('');
  }
}));

Liquid.Template.registerTag( 'raw', Liquid.Block.extend({
  parse: function(tokens) {
    if (!this.nodelist) this.nodelist = [];
    this.nodelist.clear();

    var token = tokens.shift();
    tokens.push('');
    while(tokens.length) {

      if( /^\{\%/.test(token) ) { // It's a tag...
        var tagParts = token.match(/^\{\%\s*(\w+)\s*(.*)?\%\}$/);

        if(tagParts) {
          if( this.blockDelimiter == tagParts[1] ) {
            this.endTag();
            return;
          }
        }
      }

      this.nodelist.push( token || '');
      token = tokens.shift(); // Assign the next token to loop again...
    }
    this.assertMissingDelimitation();
  },

  render: function(context) {
    return this.nodelist.join('');
  }
}));
Liquid.Template.registerFilter({

  _HTML_ESCAPE_MAP: {
    '&': '&amp;',
    '>': '&gt;',
    '<': '&lt;',
    '"': '&quot;',
    "'": '&#39;'
  },

  size: function(iterable) {
    return (iterable['length']) ? iterable.length : 0;
  },

  downcase: function(input) {
    return input.toString().toLowerCase();
  },

  upcase: function(input) {
    return input.toString().toUpperCase();
  },

  capitalize: function(input) {
    return input.toString().capitalize();
  },

  escape: function(input) {
    var self = this;
    return input.replace(/[&<>"']/g, function(chr) {
      return self._HTML_ESCAPE_MAP[chr];
    });
  },

  h: function(input) {
    var self = this;
    return input.replace(/[&<>"']/g, function(chr) {
      return self._HTML_ESCAPE_MAP[chr];
    });
  },

  truncate: function(input, length, string) {
    if(!input || input == ''){ return ''; }
    length = length || 50;
    string = string || "...";

    var seg = input.slice(0, length);
    return (input.length > length ?
            input.slice(0, length) + string :
            input);
  },

  truncatewords: function(input, words, string) {
    if(!input || input == ''){ return ''; }
    words = parseInt(words || 15);
    string = string || '...';
    var wordlist = input.toString().split(" "),
        l = Math.max((words), 0);
    return (wordlist.length > l) ? wordlist.slice(0,l).join(' ') + string : input;
  },

  truncate_words: function(input, words, string) {
    if(!input || input == ''){ return ''; }
    words = parseInt(words || 15);
    string = string || '...';
    var wordlist = input.toString().split(" "),
        l = Math.max((words), 0);
    return (wordlist.length > l) ? wordlist.slice(0,l).join(' ') + string : input;
  },

  strip_html: function(input) {
    return input.toString().replace(/<.*?>/g, '');
  },

  strip_newlines: function(input) {
    return input.toString().replace(/\n/g, '')
  },

  join: function(input, separator) {
    separator = separator ||  ' ';
    return input.join(separator);
  },

  split: function(input, separator) {
    separator = separator ||  ' ';
    return input.split(separator);
  },

  sort: function(input) {
    return input.sort();
  },

  reverse: function(input) {
    return input.reverse();
  },

  replace: function(input, string, replacement) {
    replacement = replacement || '';
    return input.toString().replace(new RegExp(string, 'g'), replacement);
  },

  replace_first: function(input, string, replacement) {
    replacement = replacement || '';
    return input.toString().replace(new RegExp(string, ""), replacement);
  },

  newline_to_br: function(input) {
    return input.toString().replace(/\n/g, "<br/>\n");
  },

  date: function(input, format) {
    var date;
    if( input instanceof Date ){ date = input; }
    if(!(date instanceof Date) && input == 'now'){ date = new Date(); }
    if(!(date instanceof Date) && typeof(input) == 'number'){ date = new Date(input * 1000); }
    if(!(date instanceof Date) && typeof(input) == 'string'){ date = new Date(Date.parse(input));}
    if(!(date instanceof Date)){ return input; } // Punt
    return date.strftime(format);
  },

  first: function(input) {
    return input[0];
  },

  last: function(input) {
    input = input;
    return input[input.length -1];
  },

  minus: function(input, number) {
    return (Number(input) || 0) - (Number(number) || 0);
  },

  plus: function(input, number) {
    return (Number(input) || 0) + (Number(number) || 0);
  },

  times: function(input, number) {
    return (Number(input) || 0) * (Number(number) || 0);
  },

  divided_by: function(input, number) {
    return (Number(input) || 0) / (Number(number) || 0);
  },

  modulo: function(input, number) {
    return (Number(input) || 0) % (Number(number) || 0);
  },

  map: function(input, property) {
    input = input || [];
    var results = [];
    for (var i = 0; i < input.length; i++) {
      results.push(input[i][property]);
    }
    return results;
  },
  escape_once: function(input) {
    var self = this;
    return input.replace(/["><']|&(?!([a-zA-Z]+|(#\d+));)/g, function(chr) {
      return self._HTML_ESCAPE_MAP[chr];
    });
  },

  remove: function(input, string) {
    return input.toString().replace(new RegExp(string, 'g'), '');
  },

  remove_first: function(input, string) {
    return input.toString().replace(string, '');
  },

  prepend: function(input, string) {
    return '' + (string || '').toString() + (input || '').toString();
  },

  append: function(input, string) {
    return '' + (input || '').toString() + (string || '').toString();
  }

});


if(!(new Date()).strftime) {(function(){
Date.ext={};Date.ext.util={};Date.ext.util.xPad=function(x,pad,r){if(typeof (r)=="undefined"){r=10}for(;parseInt(x,10)<r&&r>1;r/=10){x=pad.toString()+x}return x.toString()};Date.prototype.locale="en-GB";if(document.getElementsByTagName("html")&&document.getElementsByTagName("html")[0].lang){Date.prototype.locale=document.getElementsByTagName("html")[0].lang}Date.ext.locales={};Date.ext.locales.en={a:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],A:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],b:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],B:["January","February","March","April","May","June","July","August","September","October","November","December"],c:"%a %d %b %Y %T %Z",p:["AM","PM"],P:["am","pm"],x:"%d/%m/%y",X:"%T"};
if(typeof JSON != 'undefined'){ Date.ext.locales['en-US'] = JSON.parse(JSON.stringify(Date.ext.locales.en)); } else { Date.ext.locales["en-US"]=Date.ext.locales.en;};
Date.ext.locales["en-US"].c="%a %d %b %Y %r %Z";Date.ext.locales["en-US"].x="%D";Date.ext.locales["en-US"].X="%r";Date.ext.locales["en-GB"]=Date.ext.locales.en;Date.ext.locales["en-AU"]=Date.ext.locales["en-GB"];Date.ext.formats={a:function(d){return Date.ext.locales[d.locale].a[d.getDay()]},A:function(d){return Date.ext.locales[d.locale].A[d.getDay()]},b:function(d){return Date.ext.locales[d.locale].b[d.getMonth()]},B:function(d){return Date.ext.locales[d.locale].B[d.getMonth()]},c:"toLocaleString",C:function(d){return Date.ext.util.xPad(parseInt(d.getFullYear()/100,10),0)},d:["getDate","0"],e:["getDate"," "],g:function(d){return Date.ext.util.xPad(parseInt(Date.ext.util.G(d)/100,10),0)},G:function(d){var y=d.getFullYear();var V=parseInt(Date.ext.formats.V(d),10);var W=parseInt(Date.ext.formats.W(d),10);if(W>V){y++}else{if(W===0&&V>=52){y--}}return y},H:["getHours","0"],I:function(d){var I=d.getHours()%12;return Date.ext.util.xPad(I===0?12:I,0)},j:function(d){var ms=d-new Date(""+d.getFullYear()+"/1/1 GMT");ms+=d.getTimezoneOffset()*60000;var doy=parseInt(ms/60000/60/24,10)+1;return Date.ext.util.xPad(doy,0,100)},m:function(d){return Date.ext.util.xPad(d.getMonth()+1,0)},M:["getMinutes","0"],p:function(d){return Date.ext.locales[d.locale].p[d.getHours()>=12?1:0]},P:function(d){return Date.ext.locales[d.locale].P[d.getHours()>=12?1:0]},S:["getSeconds","0"],u:function(d){var dow=d.getDay();return dow===0?7:dow},U:function(d){var doy=parseInt(Date.ext.formats.j(d),10);var rdow=6-d.getDay();var woy=parseInt((doy+rdow)/7,10);return Date.ext.util.xPad(woy,0)},V:function(d){var woy=parseInt(Date.ext.formats.W(d),10);var dow1_1=(new Date(""+d.getFullYear()+"/1/1")).getDay();var idow=woy+(dow1_1>4||dow1_1<=1?0:1);if(idow==53&&(new Date(""+d.getFullYear()+"/12/31")).getDay()<4){idow=1}else{if(idow===0){idow=Date.ext.formats.V(new Date(""+(d.getFullYear()-1)+"/12/31"))}}return Date.ext.util.xPad(idow,0)},w:"getDay",W:function(d){var doy=parseInt(Date.ext.formats.j(d),10);var rdow=7-Date.ext.formats.u(d);var woy=parseInt((doy+rdow)/7,10);return Date.ext.util.xPad(woy,0,10)},y:function(d){return Date.ext.util.xPad(d.getFullYear()%100,0)},Y:"getFullYear",z:function(d){var o=d.getTimezoneOffset();var H=Date.ext.util.xPad(parseInt(Math.abs(o/60),10),0);var M=Date.ext.util.xPad(o%60,0);return(o>0?"-":"+")+H+M},Z:function(d){return d.toString().replace(/^.*\(([^)]+)\)$/,"$1")},"%":function(d){return"%"}};Date.ext.aggregates={c:"locale",D:"%m/%d/%y",h:"%b",n:"\n",r:"%I:%M:%S %p",R:"%H:%M",t:"\t",T:"%H:%M:%S",x:"locale",X:"locale"};Date.ext.aggregates.z=Date.ext.formats.z(new Date());Date.ext.aggregates.Z=Date.ext.formats.Z(new Date());Date.ext.unsupported={};Date.prototype.strftime=function(fmt){if(!(this.locale in Date.ext.locales)){if(this.locale.replace(/-[a-zA-Z]+$/,"") in Date.ext.locales){this.locale=this.locale.replace(/-[a-zA-Z]+$/,"")}else{this.locale="en-GB"}}var d=this;while(fmt.match(/%[cDhnrRtTxXzZ]/)){fmt=fmt.replace(/%([cDhnrRtTxXzZ])/g,function(m0,m1){var f=Date.ext.aggregates[m1];return(f=="locale"?Date.ext.locales[d.locale][m1]:f)})}var str=fmt.replace(/%([aAbBCdegGHIjmMpPSuUVwWyY%])/g,function(m0,m1){var f=Date.ext.formats[m1];if(typeof (f)=="string"){return d[f]()}else{if(typeof (f)=="function"){return f.call(d,d)}else{if(typeof (f)=="object"&&typeof (f[0])=="string"){return Date.ext.util.xPad(d[f[0]](),f[1])}else{return m1}}}});d=null;return str};
})();}
/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
var split;

split = split || function (undef) {

    var nativeSplit = String.prototype.split,
        compliantExecNpcg = /()??/.exec("")[1] === undef, // NPCG: nonparticipating capturing group
        self;

    self = function (str, separator, limit) {
        if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
            return nativeSplit.call(str, separator, limit);
        }
        var output = [],
            flags = (separator.ignoreCase ? "i" : "") +
                    (separator.multiline  ? "m" : "") +
                    (separator.extended   ? "x" : "") + // Proposed for ES6
                    (separator.sticky     ? "y" : ""), // Firefox 3+
            lastLastIndex = 0,
            separator = new RegExp(separator.source, flags + "g"),
            separator2, match, lastIndex, lastLength;
        str += ""; // Type-convert
        if (!compliantExecNpcg) {
            separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
        }
        /* Values for `limit`, per the spec:
         * If undefined: 4294967295 // Math.pow(2, 32) - 1
         * If 0, Infinity, or NaN: 0
         * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
         * If negative number: 4294967296 - Math.floor(Math.abs(limit))
         * If other: Type-convert, then use the above rules
         */
        limit = limit === undef ?
            -1 >>> 0 : // Math.pow(2, 32) - 1
            limit >>> 0; // ToUint32(limit)
        while (match = separator.exec(str)) {
            lastIndex = match.index + match[0].length;
            if (lastIndex > lastLastIndex) {
                output.push(str.slice(lastLastIndex, match.index));
                if (!compliantExecNpcg && match.length > 1) {
                    match[0].replace(separator2, function () {
                        for (var i = 1; i < arguments.length - 2; i++) {
                            if (arguments[i] === undef) {
                                match[i] = undef;
                            }
                        }
                    });
                }
                if (match.length > 1 && match.index < str.length) {
                    Array.prototype.push.apply(output, match.slice(1));
                }
                lastLength = match[0].length;
                lastLastIndex = lastIndex;
                if (output.length >= limit) {
                    break;
                }
            }
            if (separator.lastIndex === match.index) {
                separator.lastIndex++; // Avoid an infinite loop
            }
        }
        if (lastLastIndex === str.length) {
            if (lastLength || !separator.test("")) {
                output.push("");
            }
        } else {
            output.push(str.slice(lastLastIndex));
        }
        return output.length > limit ? output.slice(0, limit) : output;
    };

    String.prototype.split = function (separator, limit) {
        return self(this, separator, limit);
    };

    return self;

}();

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = Liquid;
  }
  exports.Liquid = Liquid;
}

},{}]},{},[1]);
