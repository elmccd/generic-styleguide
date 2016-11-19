document.querySelectorAll('.docs-example').forEach(el => {
    var pre = el.closest('pre');
    pre.parentNode.insertBefore(el, pre);
});