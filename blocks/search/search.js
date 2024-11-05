import {decorateIcons} from '../../scripts/aem.js';

const searchParams = new URLSearchParams(window.location.search);

function clearSearch() {
  if (window.history.replaceState) {
    const url = new URL(window.location.href);
    url.search = '';
    searchParams.delete('q');
    window.history.replaceState({}, '', url.toString());
    let x = document.getElementById('search');
    x.value = '';
  }
}

async function handleSearch(e, block) {
  const searchValue = e.target.value.trim();
  searchParams.set('q', searchValue);

  if (searchValue.length >= 3) {
    const url = new URL('/search', 'https://www.google.com/');
    url.searchParams.set('q', searchValue);
    window.location.href = url.toString();
    return;
  }

  if (window.history.replaceState) {
    const url = new URL(window.location.href);
    url.search = searchParams.toString();
    window.history.replaceState({}, '', url.toString());
  }

  if (searchValue.length < 3) {
    clearSearch(block);
  }
}

function searchInput(block) {
  const input = document.createElement('input');
  input.setAttribute('type', 'search');
  input.className = 'search-input';
  input.id = 'search';

  const searchPlaceholder = 'Search';
  input.placeholder = searchPlaceholder;
  input.setAttribute('aria-label', searchPlaceholder);

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch(e, block);
      }
  });

  input.addEventListener('keyup', (e) => { if (e.code === 'Escape') { clearSearch(block); } });

  return input;
}

function searchIcon() {
  const icon = document.createElement('span');
  icon.classList.add('icon', 'icon-search');
  return icon;
}

function createSearchBox(block) {
  const box = document.createElement('div');
  box.classList.add('search-box');
  box.append(
    searchIcon(),
    searchInput(block),
  );
  return box;
}

export default async function decorate(block) {
  block.innerHTML = '';
  block.append(createSearchBox(block));

  if (searchParams.get('q')) {
    const input = block.querySelector('input');
    input.value = searchParams.get('q');
    input.dispatchEvent(new Event('input'));
  }

  decorateIcons(block);
}