import {
  decorateMain,
} from '../../scripts/scripts.js';

import { loadSections, createOptimizedPicture } from '../../scripts/aem.js';

export async function loadFragment(path) {
  if (path && path.startsWith('/')) {
    const resp = await fetch(`${path}.plain.html`);
    console.log("resp", resp)
    if (resp.ok) {
      const main = document.createElement('main');
      main.innerHTML = await resp.text();

      // reset base path for media to fragment base
      // const resetAttributeBase = (tag, attr) => {
      //   main.querySelectorAll(`${tag}[${attr}^="./media_"]`).forEach((elem) => {
      //     elem[attr] = new URL(elem.getAttribute(attr), new URL(path, window.location)).href;
      //   });
      // };
      // resetAttributeBase('img', 'src');
      // resetAttributeBase('source', 'srcset');

      decorateMain(main);
      await loadSections(main);
      return main;
    }
  }
  return null;
}

export default async function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';

  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : block.textContent.trim();
  console.log("path", path)
  const fragment = await loadFragment(path);
  
  block.append(ul);
}
