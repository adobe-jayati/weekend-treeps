import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footerDiv = document.createElement('footer-div');

  footerDiv.id = 'footer-div';
  while (fragment.firstElementChild) footerDiv.append(fragment.firstElementChild);

  const classes = ['nav', 'content'];
  classes.forEach((c, i) => {
    const section = footerDiv.children[i];
    if (section) section.classList.add(`footer-${c}`);
  });

  const currentPath = window.location.pathname;

  const navItems = document.querySelectorAll('.nav-sections li');

  navItems.forEach((item) => {
    const link = item.querySelector('a');
    if (link && link.getAttribute('href') === currentPath) {
      item.classList.add('active');
    }
  });

  block.append(footerDiv);
}
