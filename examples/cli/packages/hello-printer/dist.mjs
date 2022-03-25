import "source-map-support/register";
// packages/hello-printer/index.ts
function helloPrinter() {
  console.log("Hello world!");
}
export {
  helloPrinter as default
};
