document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.grid-gallery');

    console.log('Загружаем мемы с сервера...');

    fetch('http://127.0.0.1:3000/gallery')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Ошибка загрузки: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log('Полученные данные:', data);

            data.data.forEach((meme) => {
                const div = document.createElement('div');
                div.classList.add('grid-item', 'scale-on-hover');

                const img = document.createElement('img');
                img.src = meme.link;
                img.alt = meme.name;
                div.appendChild(img);

                const caption = document.createElement('p');
                caption.textContent = `${meme.name} (${meme.email})`;
                div.appendChild(caption);

                gallery.appendChild(div);
            });
        })
        .catch((error) => {
            console.error('Ошибка при загрузке мемов:', error.message);
        });
});
