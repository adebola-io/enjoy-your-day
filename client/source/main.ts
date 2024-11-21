/// <reference types="vite/client" />
import { render } from '@adbl/unfinished/render';
import { createRouter } from './router';

export default async function main() {
  const root = document.createElement('div');
  root.id = 'app';
  document.body.appendChild(root);

  const router = createRouter();
  router.window = window;
  router.attachWindowListeners();

  document.querySelector('#start-screen')?.remove();

  if (root !== null) {
    render(root, router.Outlet(), window);
    router.navigate('/');
  }
}
