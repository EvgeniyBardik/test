document.addEventListener('DOMContentLoaded', function () {
    fetch('php/get-from-database.php')
        .then(response => response.json())
        .then(data => renderAccordion(data))
        .catch(error => console.error('Ошибка получения данных:', error));
});

function renderAccordion(data) {
    const accordionSection = document.querySelector('.accordion');

    if (data.length === 0) {
        accordionSection.innerHTML = '<p>Нет данных для отображения</p>';
        return;
    }

    const accordionHTML = data.map(item => `
        <div class="accordion-item">
            <input type="checkbox" id="item-${item.id}">
            <label for="item-${item.id}" class="accordion-item-label">${item.value1}</label>
            <div class="accordion-item-content">${item.textAreaInput}</div>
        </div>
    `).join('');

    accordionSection.innerHTML = accordionHTML;
}

