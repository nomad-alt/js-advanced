function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

Color.prototype.rgb = function () {
  return `rgb(${this.r},${this.g},${this.b})`;
};
// this function is converting rgb to its respective hexa code
Color.prototype.hex = function () {
  let hexR = this.r.toString(16).padStart(2, "0");
  let hexG = this.g.toString(16).padStart(2, "0");
  let hexB = this.b.toString(16).padStart(2, "0");
  return `#${hexR}${hexG}${hexB}`;
};

Color.prototype.rgba = function (a) {
  return `rgba(${this.r},${this.g},${this.b},${a})`;
};

let myColor = new Color(125, 34, 256);
let backgroundColor = myColor.rgba(0.5); // 0 means fully opaque or 1 means no opacity
document.body.style.backgroundColor = backgroundColor;
