
const form = document.querySelector('form');
let accordionElements = [];
let currentIndex = 0;

const currIndexElement = document.querySelector('.item-no');

const value1 = form.querySelector('input[name="value1"]').value = '';
const textAreaInput = form.querySelector('textarea[name="text-area-input"]').value = '';



document.addEventListener('DOMContentLoaded', function () {
    fetch('php/get-from-database.php')
    .then(response => response.json())
    .then(data => {
        currIndexElement.textContent = `Поточний елемент: ${currentIndex + 1}`;
        if (data.length > 0) {
            accordionElements = data;
            showAccordionElement(currentIndex);
        } else {
            accordionElements.push({ value1, textAreaInput });
        }
        document.querySelector('.delete-button').disabled = accordionElements.length === 1;
    })
    .catch(error => {
        console.error('Произошла ошибка при загрузке данных:', error);
    });
});







function saveCurrentElement() {
    let value1 = form.querySelector('input[name="value1"]').value;
    let textAreaInput = form.querySelector('textarea[name="text-area-input"]').value;

    accordionElements[currentIndex] = { value1, textAreaInput };

}




function deleteAccordionElement(event) {
    event.preventDefault()
    if (accordionElements.length > 1) {
        accordionElements.splice(currentIndex, 1);
        currentIndex = Math.max(currentIndex - 1, 0);
        showAccordionElement(currentIndex);
        currIndexElement.textContent = `Поточний елемент: ${currentIndex + 1}`;
        document.querySelector('.delete-button').disabled = accordionElements.length === 1;
    }
    console.log(currentIndex, accordionElements.length);
}

function addAccordionElement(event) {
	event.preventDefault();
    saveCurrentElement()
    
    currentIndex++;
    
    let value1 = form.querySelector('input[name="value1"]').value = '';
    let textAreaInput = form.querySelector('textarea[name="text-area-input"]').value = '';
    
    currIndexElement.textContent = `Поточний елемент: ${currentIndex + 1}`;
    accordionElements.push({ value1, textAreaInput });
    document.querySelector('.delete-button').disabled = accordionElements.length === 1;
    const isLastElement = currentIndex === accordionElements.length - 1;
    document.querySelector('.form__elements-management button:nth-of-type(1)').disabled = !isLastElement;
    console.log(accordionElements)
}


function showAccordionElement(index) {
	if (accordionElements.length > 0) {
		 const currentElement = accordionElements[index];
		 form.querySelector('input[name="value1"]').value = currentElement.value1;
		 form.querySelector('textarea[name="text-area-input"]').value = currentElement.textAreaInput;

		 currIndexElement.textContent = `Поточний елемент: ${currentIndex + 1}`;
         const isLastElement = currentIndex === accordionElements.length - 1;
         document.querySelector('.form__elements-management button:nth-of-type(1)').disabled = !isLastElement;
	}
}

form.querySelector('.form__arrows').addEventListener('click', function (event) {
	event.preventDefault();


    if (event.target.textContent === '<' && currentIndex != 0) {
        saveCurrentElement()
        currentIndex = currentIndex - 1;
        showAccordionElement(currentIndex);
    } else if (event.target.textContent === '>' && currentIndex < accordionElements.length - 1) {
        saveCurrentElement()
        currentIndex = currentIndex + 1;
        showAccordionElement(currentIndex);
    }
    const isLastElement = currentIndex === accordionElements.length - 1;
    document.querySelector('.form__elements-management button:nth-of-type(1)').disabled = !isLastElement;
});

form.querySelector('.form__elements-management').querySelector('button:nth-of-type(1)').addEventListener('click', addAccordionElement);

form.querySelector('.form__elements-management').querySelector('.delete-button').addEventListener('click', deleteAccordionElement);

form.querySelector('.form__save').addEventListener('click', function (event) {
    event.preventDefault();
    saveCurrentElement()
    
    fetch('php/save-to-database.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(accordionElements)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Данные успешно сохранены в базе данных!');
        } else {
            console.error('Ошибка при сохранении данных в базе данных');
        }
    })
    .catch(error => {
        console.error('Произошла ошибка:', error);
    });
});
