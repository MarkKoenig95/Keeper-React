import React from "react";

var curYear = new Date().getFullYear();

function Footer() {
  let footer = (
    <footer>
      <p>Copywrite {curYear}</p>
    </footer>
  );
  return footer;
}

export default Footer;
