import { SimpleObservable } from 'markup-as-js';
import page from 'page';

import App from './App';
import routes from './routes';

const currentPath = new SimpleObservable("/");

const app = App(currentPath);

document.getElementById("app")?.appendChild(app);

let routeNode: Element = document.getElementById("route") as Element;

if (!routeNode) console.error("No #route element found");

if (routeNode) {
  for (let route of routes) {
    page(route.path, (ctx, next) => {
      currentPath.set(route.path);
      let newNode = route.builder(ctx, next);
      routeNode.parentElement?.replaceChild(newNode, routeNode);
      routeNode = newNode;
    });
  }
}
page();