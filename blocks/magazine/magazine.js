// eslint-disable-next-line
export default async function decorate(block) {
  await fetch('/magazine/query-index.json')
    .then((response) => {
      console.log('response', response);
      if (!response.ok) {
        throw new Error('error encountered', response.statusText);
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      const cardsData = result.data;
      console.log('cardsData', cardsData);
      const wrapper = document.querySelector('.magazine-container');
      wrapper.classList.add('.dynamic-card');
      wrapper.classList.add('.cards-wrapper');
      console.log('wrapper', wrapper);

      const cardsBlock = document.createElement('div');
      cardsBlock.className = 'cards block';

      const ul = document.createElement('ul');

      cardsData.forEach((card) => {
        const li = document.createElement('li');

        const cardImageDiv = document.createElement('div');
        cardImageDiv.className = 'cards-card-image';

        const picture = document.createElement('picture');

        const source = document.createElement('source');
        source.type = 'image/webp';
        source.srcset = card.image;

        const img = document.createElement('img');
        img.loading = 'lazy';
        img.alt = card.title;
        img.src = card.image;

        picture.appendChild(source);
        picture.appendChild(img);
        cardImageDiv.appendChild(picture);

        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'cards-card-body';

        const titleParagraph = document.createElement('p');
        titleParagraph.textContent = card.title;

        const descriptionParagraph = document.createElement('p');
        descriptionParagraph.textContent = card.description;

        cardBodyDiv.appendChild(titleParagraph);
        cardBodyDiv.appendChild(descriptionParagraph);

        li.appendChild(cardImageDiv);
        li.appendChild(cardBodyDiv);

        ul.appendChild(li);
      });

      cardsBlock.appendChild(ul);
      wrapper.appendChild(cardsBlock);
    });
}
