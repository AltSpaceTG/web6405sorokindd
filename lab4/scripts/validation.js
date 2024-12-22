document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    const loader = document.getElementById('loader');

    if (form) {
        // Регулярное выражение для проверки email и ссылок
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;

        // Валидация полей формы
        form.name.addEventListener('input', () => {
            form.name.style.borderColor = form.name.value.trim() === '' ? 'red' : '';
        });

        form.email.addEventListener('input', () => {
            form.email.style.borderColor = !emailRegex.test(form.email.value.trim()) ? 'red' : '';
        });

        form.link.addEventListener('input', () => {
            form.link.style.borderColor = !urlRegex.test(form.link.value.trim()) ? 'red' : '';
        });

        // Обработка отправки формы
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Проверка всех полей
            if (
                form.name.value.trim() === '' ||
                !emailRegex.test(form.email.value.trim()) ||
                !urlRegex.test(form.link.value.trim())
            ) {
                alert('Пожалуйста, корректно заполните все поля.');
                return;
            }

            const data = {
                name: form.name.value.trim(),
                email: form.email.value.trim(),
                link: form.link.value.trim(),
            };

            console.log('Отправляемые данные формы:', data);

            try {
                loader.style.display = 'block'; // Показать индикатор загрузки

                const response = await fetch('http://localhost:3000/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                loader.style.display = 'none'; // Скрыть индикатор загрузки

                if (!response.ok) {
                    throw new Error(`Ошибка сервера: ${response.status}`);
                }

                const result = await response.json();
                console.log('Ответ от сервера:', result);

                formMessage.style.display = 'block';
                formMessage.style.color = 'green';
                formMessage.textContent = result.data.message;
                form.reset(); // Сбросить поля формы
            } catch (error) {
                loader.style.display = 'none'; // Скрыть индикатор загрузки
                console.error('Ошибка при отправке формы:', error.message);

                formMessage.style.display = 'block';
                formMessage.style.color = 'red';
                formMessage.textContent = `Ошибка при отправке: ${error.message}`;
            }
        });
    }
});
