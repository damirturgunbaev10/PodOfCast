const track = document.querySelector(".carousel-track");
const items = Array.from(document.querySelectorAll(".carousel-item"));
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const gap = 20;
const itemWidth = 373 + gap;

// Чтобы сделать бесконечным, клонируем элементы
items.forEach(item => {
  const clone1 = item.cloneNode(true);
  const clone2 = item.cloneNode(true);
  track.appendChild(clone1);
  track.insertBefore(clone2, track.firstChild);
});

const allItems = document.querySelectorAll(".carousel-item");
let index = items.length; // начинаем с середины (оригинальные элементы)

function updateCarousel() {
  track.style.transform = `translateX(-${index * itemWidth}px)`;
}

function nextSlide() {
  index++;
  updateCarousel();
  if (index >= allItems.length - items.length) {
    setTimeout(() => {
      track.style.transition = "none";
      index = items.length;
      updateCarousel();
      setTimeout(() => track.style.transition = "transform 0.5s ease");
    }, 500);
  }
}

function prevSlide() {
  index--;
  updateCarousel();
  if (index < items.length) {
    setTimeout(() => {
      track.style.transition = "none";
      index = allItems.length - items.length * 2;
      updateCarousel();
      setTimeout(() => track.style.transition = "transform 0.5s ease");
    }, 500);
  }
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// авто-прокрутка
setInterval(nextSlide, 4000);

updateCarousel();


const customTrack = document.querySelector('.custom-carousel-track');
const customPrevBtn = document.querySelector('.custom-prev');
const customNextBtn = document.querySelector('.custom-next');
const customItemsArray = Array.from(document.querySelectorAll('.custom-carousel-item'));
const customGap = 20;
let customIndex = 0;

// Бесконечный трек
customTrack.innerHTML = `
  ${customItemsArray.map(i => i.outerHTML).join('')}
  ${customItemsArray.map(i => i.outerHTML).join('')}
  ${customItemsArray.map(i => i.outerHTML).join('')}
`;
const customAllItems = customTrack.querySelectorAll('.custom-carousel-item');
const customStartIndex = customItemsArray.length;
customIndex = customStartIndex;

// Вычисляем ширину элемента с gap
function getItemWidth() {
  return customAllItems[0].offsetWidth + customGap;
}

customTrack.style.transform = `translateX(-${customIndex * getItemWidth()}px)`;

// Перемотка
function customMoveTo(idx) {
  customTrack.style.transition = 'transform 0.5s ease';
  customTrack.style.transform = `translateX(-${idx * getItemWidth()}px)`;
  customIndex = idx;

  setTimeout(() => {
    if (customIndex >= customAllItems.length - customItemsArray.length) {
      customIndex = customStartIndex;
      customTrack.style.transition = 'none';
      customTrack.style.transform = `translateX(-${customIndex * getItemWidth()}px)`;
    } else if (customIndex < 0) {
      customIndex = customStartIndex + customItemsArray.length - 1;
      customTrack.style.transition = 'none';
      customTrack.style.transform = `translateX(-${customIndex * getItemWidth()}px)`;
    }
  }, 500);
}

// Кнопки
customNextBtn.addEventListener('click', () => customMoveTo(customIndex + 1));
customPrevBtn.addEventListener('click', () => customMoveTo(customIndex - 1));

// Автопрокрутка
setInterval(() => customMoveTo(customIndex + 1), 4000);
