//Mock document
import { JSDOM } from "jsdom";
const dom = new JSDOM('<DOCTYPE html><body></body>');
global.document = dom.window.document;
global.window = dom.window;