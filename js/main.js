// Плавные якори к ссылкам
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault()
    const targetId = this.getAttribute('href').substring(1)
    const targetElement = document.getElementById(targetId)
    if(targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      })
    }
  })
})

// Карусель
const cards = document.querySelectorAll('.stages-mobile__card')
const circles = document.querySelectorAll('.stages-mobile__circle')
let currentCardIndex = 0

function showCard(index) {
  cards.forEach((card, i) => {
    card.classList.remove('active')
    if(i === index) {
      card.classList.add('active')
    }
    if(index == 0) {
      document.getElementById('prevBtn').style.backgroundColor = '#D9D9D9'
    } else {
      document.getElementById('prevBtn').style.backgroundColor = 'rgb(49, 49, 49)'
    }
    if(index == cards.length - 1) {
      document.getElementById('nextBtn').style.backgroundColor = '#D9D9D9'
    } else {
      document.getElementById('nextBtn').style.backgroundColor = 'rgb(49, 49, 49)'
    }
  }) 
  circles.forEach((circle, i) => {
    circle.classList.remove('active')
    if(i === index) {
      circle.classList.add('active')
    }
  })
}

document.getElementById('prevBtn').addEventListener('click', function() {
  currentCardIndex = Math.max(currentCardIndex - 1, 0)
  showCard(currentCardIndex)
})

document.getElementById('nextBtn').addEventListener('click', function() {
  currentCardIndex = Math.min(currentCardIndex + 1, cards.length - 1)
  showCard(currentCardIndex)
})

// Показываем первую карточку из карусели при загрузке страницы
function showFirstCard() {
  const cards = document.querySelectorAll('.stages-mobile__card')
  const circles = document.querySelectorAll('.stages-mobile__circle')
  cards[0].classList.add('active')
  circles[0].classList.add('active')
  document.getElementById('prevBtn').style.backgroundColor = '#D9D9D9'
}

document.addEventListener('DOMContentLoaded', function() {
  showFirstCard()
})