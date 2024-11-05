import {
    decorateMain,
  } from '../../scripts/scripts.js';
  
  import {
    loadSections,
  } from '../../scripts/aem.js';

export async function loadFragment(path) {
    console.log("path", path)
    if (path && path.startsWith('/')) {
      const resp = await fetch(`${path}`);
      if (resp.ok) {
        const main = document.createElement('main');
        main.innerHTML = await resp.text();
        console.log("resp", resp)
  
        // reset base path for media to fragment base
        const resetAttributeBase = (tag, attr) => {
          main.querySelectorAll(`${tag}[${attr}^="./media_"]`).forEach((elem) => {
            elem[attr] = new URL(elem.getAttribute(attr), new URL(path, window.location)).href;
          });
        };
        resetAttributeBase('img', 'src');
        resetAttributeBase('source', 'srcset');
  
        decorateMain(main);
        await loadSections(main);
        return main;
      }
    }
    return null;
  }

async function getDataFromJSON(jsonURL) {
    try {
    const response = await fetch(jsonURL);
    console.log(response)
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${jsonURL}`);
    }
    const jsonData = await response.json();
    console.log(jsonData)
    // Filter data to include only those records with template 'magazine'
    const filteredData = jsonData.data.filter((item) => item.template === 'magazine');
    // Map through filtered data to structure it for the UI
    return filteredData.map((item) => ({
      imgSrc: item.image, // URL of the image
      title: item.title, // Title of the article
      description: item.description, // Description of the article
      link: item.path, // Path for the anchor tag
    }));
  } catch (error) {
    throw new Error('Error fetching JSON data');
  }
}

export default async function decorate(block) {
    console.log("block", block);
    const link = block.querySelector('a');
    console.log(link)
    const path = link ? link.getAttribute('href') : block.textContent.trim();
    const fragment = await loadFragment(path);


    // const resp = await fetch(pathname);
    // const json = await resp.json();
    // console.log("=====JSON=====> {} ",json);
    // if (dataListAnchor) {
    //   const jsonURL = dataListAnchor.href;
    //   renderCustomList(jsonURL);
    // }
  }