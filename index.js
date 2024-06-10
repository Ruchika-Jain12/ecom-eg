document.addEventListener('DOMContentLoaded', () => {
  fetch('offerCards.json')
    .then(response => response.json())
    .then(data => {
      const offerContainer = document.getElementById('cardsContainer')
      data.forEach(card => {
        const cardHtml = `
        <div id="offer-${card.id}" class="col-md-2 pt-3 pt-md-0">
          <div class="card shadow-sm">
            <div class="card-body">
              <img class="img-fluid card-img-top" src="${card.imgUrl}" alt="${card.name}">
              <h5 class="card-title">${card.name}</h5>
              <p class="card-text">$${card.price}</p>
            </div>
          </div>
        </div>
        `
        offerContainer.innerHTML += cardHtml
      })
    })

  fetch('discountCards.json')
    .then(response => response.json())
    .then(data => {
      const discountContainer = document.getElementById('discountContainer')
      const topSelling = document.getElementById('topSelling')

      data.forEach(card => {
        const discountCardHtml = `  
        <div id="discount-${card.id}" class="col-6">
          <img class="img-fluid" src="${card.imgUrl}" alt="img" loading="lazy">
          <p>${card.name}</p>
        </div>
        `
        discountContainer.innerHTML += discountCardHtml

        const topSellingCardHtml = `
        <div id="top-${card.id}" class="col-md-6">
          <div class="card mb-3" style="max-width: 500px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${card.imgUrl}" class="img-fluid rounded-start" alt="${card.name}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${card.name}</h5>
                  <p class="card-text">${card.desc}</p>
                  <p class="card-text">$${card.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>`
        topSelling.innerHTML += topSellingCardHtml
      })
    })

  const searchForm = document.getElementById('searchForm')
  searchForm.addEventListener('submit', event => {
    event.preventDefault()
    searchCard()
  })
})

const searchCard = () => {
  const searchInput = document
    .getElementById('searchInput')
    .value.trim()
    .toLowerCase()

  Promise.all([
    fetch('offerCards.json').then(response => response.json()),
    fetch('discountCards.json').then(response => response.json())
  ]).then(([offerCards, discountCards]) => {
    const allCards = [...discountCards, ...offerCards]

    const foundCard = allCards.find(
      card => card.name.toLowerCase() === searchInput
    )

    if (foundCard) {
      const cardElement =
        document.getElementById(`discount-${foundCard.id}`) ||
        document.getElementById(`top-${foundCard.id}`) ||
        document.getElementById(`offer-${foundCard.id}`)

      if (cardElement) {
        // Remove highlight from all cards
        document.querySelectorAll('.card').forEach(card => {
          card.classList.remove('shadow-lg')
        })
        // Adding highlight to the found card
        // cardElement.querySelector('.card').classList.add('shadow-lg')
        cardElement.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      alert('Card not found')
    }
  })
}
