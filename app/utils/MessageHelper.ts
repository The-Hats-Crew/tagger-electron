const DOMPurify = require("dompurify");

function makeHtmlSafe(untrustedHtml) {

  DOMPurify.setConfig({ ADD_ATTR: ["target"] });

  DOMPurify.addHook("uponSanitizeAttribute", function(node){
    if(node.localName === "a"){
      node.removeAttribute("target");
      node.setAttribute("onClick",
      `
        require("electron").shell.openExternal('${node.getAttribute("href")}');
      `)
    }
  })

  DOMPurify.addHook("afterSanitizeAttributes", function(node) {
    if (node.localName === "a") {
      node.setAttribute("href", "#");
    }
  });

  const sanitizedHtml = DOMPurify.sanitize(untrustedHtml);

  return sanitizedHtml;
}

module.exports = {
  makeHtmlSafe
}
