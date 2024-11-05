
function createSocialLinksBox(block) {

    const box = document.createElement('div');
    const socialLinks = [
        { icon: 'Facebook Icon', src: '/icons/dark_fb.svg', url: '#facebookwknd' },
        { icon: 'Twitter Icon' , src: '/icons/dark_twitter.svg', url: '#twitterwknd' },
        { icon: 'Instagram Icon', src: '/icons/dark_insta.svg', url: '#instawknd' }
    ];
    box.classList.add('social-links-box');
    socialLinks.forEach(link => {
        const anchor = document.createElement('a');
        const span = document.createElement('span');
        span.classList.add('icon', 'social-links-icon');
        const img = document.createElement('img');
        
        anchor.href = link.url;
        anchor.title = link.icon;
        img.src = link.src;

        span.appendChild(img);
        anchor.appendChild(span);
        box.appendChild(anchor);
    });
    return box;
  }


export default async function decorate(block) {
    block.innerHTML = '';
    block.append(createSocialLinksBox(block));
  
    decorateIcons(block);
  }