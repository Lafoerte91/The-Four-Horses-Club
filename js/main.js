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

// Карусель при нажатии в мобильной версии
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

// Зацикленная карусель участников 
const participantsList = Array.from(document.querySelectorAll('.participants__item'))
const leftButton = document.getElementById('leftBtn')
const rightButton = document.getElementById('rightBtn')
const leftCount = document.querySelector('.participants__left')
const rightCount = document.querySelector('.participants__right')
let totalParticipants = participantsList.length
let currentIndex = 0

function showCards(startIndex) {
  participantsList.forEach((card, index) => {
    if(window.matchMedia("(max-width: 375px)").matches) {
      if(index >= startIndex && index < startIndex + 1) {
        card.style.display = 'block'
      } else {
        card.style.display = 'none'
      }
    } else {
      if(index >= startIndex && index < startIndex + 3) {
        card.style.display = 'block'
      } else {
        card.style.display = 'none'
      }
    }
  })
}

function updateCounts(startIndex) {
  if(window.matchMedia("(max-width: 375px)").matches) {
    leftCount.textContent = startIndex 
    rightCount.textContent = startIndex + 1
  } else {
    leftCount.textContent = startIndex 
    rightCount.textContent = startIndex + 3
  }
}

function showNextCards() {
  if(window.matchMedia("(max-width: 375px)").matches) {
    currentIndex = currentIndex + 1 < totalParticipants ? currentIndex + 1 : 0
  } else {
    currentIndex = currentIndex + 3 < totalParticipants ? currentIndex + 3 : 0
  }
  showCards(currentIndex)
  updateCounts(currentIndex)
}

function showPreviousCards() {
  if(window.matchMedia("(max-width: 375px)").matches) {
    currentIndex = currentIndex - 1 >=0 ? currentIndex - 1 : totalParticipants - 1
  } else {
    currentIndex = currentIndex - 3 >=0 ? currentIndex - 3 : totalParticipants - 3
  }
  showCards(currentIndex)
  updateCounts(currentIndex)
}

leftButton.addEventListener('click', showPreviousCards)
rightButton.addEventListener('click', showNextCards)

showCards(currentIndex)
updateCounts(currentIndex)

setInterval(showNextCards, 4000)

