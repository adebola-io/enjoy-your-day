/// <reference types="vite/client" />
import { render } from '@adbl/unfinished/render';
import { createRouter } from './router';

const router = createRouter();
router.window = window;
router.attachWindowListeners();

const root = window.document.getElementById('app');
if (root !== null) {
  render(root, router.Outlet(), window)
}