const takeQuizBtn = document.querySelector('.takeQuiz')
const createQuizBtn = document.querySelector('.createQuiz')

const choices = document.querySelector('.choices')
const header = document.querySelector('h1')

const backContainer = document.querySelector('.backContainer')
const doneContainer = document.querySelector('.doneContainer')
const addContainer = document.querySelector('.addContainer')
const resContainer = document.querySelector('.resContainer')
let cardsContainer = document.querySelector('.cardsContainer') //this is a variable because of how the app works
//to know what the client chose
let choice = ''
//functions
function clearScreen(text) {
  choices.style.display = 'none'
  header.innerText = `${text} the quiz`
}

function createBackBtn() {
  let backBtn = document.createElement('button')
  backBtn.innerText = '< Back'
  backBtn.classList.add('backBtn')
  backContainer.appendChild(backBtn)
  //clear the screen
  backBtn.addEventListener('click', () => {
    choices.style.display = 'flex'
    //hide the back button
    backContainer.removeChild(backBtn)
    //reset the header
    header.innerText = 'Choose whether to create a quiz or take one.'
    if (choice === 'create') {
      //remove the button that creates cards
      addContainer.innerHTML = ''
      //delete the cards
      cardsContainer.innerHTML = ''

      //remove the done button
      doneContainer.innerHTML = ''
    } else {
      //remove the cards
      cardsContainer = document.querySelector('.cardsContainer')
      cardsContainer.innerHTML = ''
      //remove the button
      resContainer.innerHTML = ''
    }
  })
}

function createCard() {
  let card = document.createElement('div')
  card.classList.add('card')
  card.innerHTML = `
    <input type="text" class="question" placeholder="Question" />
    <section class="answers">
      <div class="answersContainer">
        <div class="answer">
          <div class="markCircle"></div>
          <input type="text" placeholder="type an answer here" />
        </div>
        <div class="answer">
          <div class="markCircle"></div>
          <input type="text" placeholder="type an answer here" />
        </div>
        <div class="answer">
          <div class="markCircle"></div>
          <input type="text" placeholder="type an answer here" />
        </div>
        <div class="answer">
          <div class="markCircle"></div>
          <input type="text" placeholder="type an answer here" />
        </div>
        <div class="correctAnswer">
          <p>The correct answer is</p>
          <select class="nums">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>
    </section>
    <i class="fas fa-trash-alt fa-2x deleteBtn"></i>
  `
  cardsContainer.appendChild(card)
  //the delete card button
  //I'll get the latest button that I've added and add the event listener to it
  const deleteBtns = document.querySelectorAll('.deleteBtn')
  const lastBtn = deleteBtns[deleteBtns.length - 1]

  lastBtn.addEventListener('click', () => {
    const card = lastBtn.parentElement
    cardsContainer.removeChild(card)
  })
}

//save data
function saveData() {
  //get the data
  let quiz = {}
  let cards = document.querySelectorAll('.card')
  let counter = 0
  cards.forEach((card) => {
    let cardData = {}
    cardData['question'] = card.querySelector('.question').value
    //get the answers of this question as an array
    cardData['answers'] = Array.prototype.slice
      .call(card.querySelectorAll('.answer input'))
      .map((el) => el.value)
    cardData['correctAnswer'] =
      +card.querySelector('.correctAnswer .nums').value - 1
    quiz['Q' + ++counter] = cardData
  })
  //save the data
  localStorage.setItem('quizData', JSON.stringify(quiz))
}
//event listeners
//create quiz
createQuizBtn.addEventListener('click', () => {
  clearScreen('Edit')
  createBackBtn()
  //determine the choice
  choice = 'create'
  //get the saved data
  let data = JSON.parse(localStorage.getItem('quizData'))
  for (let q in data) {
    createCard()
    let cards = document.querySelectorAll('.card')
    let card = cards[cards.length - 1]
    //get the question
    card.querySelector('.question').value = data[q].question
    //get the answers
    for (let i = 0; i < 4; i++) {
      card.querySelectorAll('.answer input')[i].value = data[q].answers[i]
    }
    //get the correct answer
    card.querySelector('.correctAnswer .nums').value = data[q].correctAnswer
  }
  //create the add card button
  const addBtn = document.createElement('button')
  addBtn.innerHTML = '<i class="fas fa-plus fa-2x"></i>'
  addBtn.classList.add('addBtn')
  document.querySelector('.addContainer').appendChild(addBtn)
  addBtn.addEventListener('click', createCard)
  //create the done button
  const doneBtn = document.createElement('button')
  doneBtn.classList.add('doneBtn')
  doneBtn.innerText = 'Save'
  doneContainer.appendChild(doneBtn)

  doneBtn.addEventListener('click', () => {
    saveData()
    const saveText = document.createElement('p')
    saveText.innerText = 'The quiz has been saved'
    saveText.classList.add('saveText')
    document.body.appendChild(saveText)
    //added a set timeout to give the dom time to update
    setTimeout(() => saveText.classList.add('show'), 0)
    setTimeout(() => saveText.classList.remove('show'), 1300)
    setTimeout(() => document.body.removeChild(saveText), 1700)
  })
})

//take the quiz
takeQuizBtn.addEventListener('click', () => {
  clearScreen('Take')
  createBackBtn()
  //determine the choice
  choice = 'take'
  const data = JSON.parse(localStorage.getItem('quizData'))
  //create new cards for the questions
  for (let q in data) {
    if (data[q].question !== '') {
      let qCard = document.createElement('div')
      qCard.classList.add('qCard')
      qCard.innerHTML = `
      <p></p>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>`
      qCard.querySelector('p').innerText = data[q].question
      const listItems = qCard.querySelectorAll('li')
      listItems.forEach((el, idx) => {
        //add the inner text
        el.innerHTML = '<i class="far fa-circle"></i> ' + data[q].answers[idx]
        //add the ability to select
        el.addEventListener('click', () => {
          listItems.forEach((i) => i.classList.remove('selected'))
          el.classList.add('selected')
        })
      })
      //add the questions
      cardsContainer.appendChild(qCard)
    }
  }
  //add the results button
  const resBtn = document.createElement('button')
  resBtn.classList.add('resBtn')
  resBtn.innerText = 'Results'
  resContainer.appendChild(resBtn)

  resBtn.addEventListener('click', () => {
    let data = JSON.parse(localStorage.getItem('quizData'))
    let qCards = document.querySelectorAll('.qCard')
    let qCount = Object.keys(data).length // the number of total questionsa
    let score = 0
    //get the correct answers
    let correctAnswers = []
    for (let q in data) correctAnswers.push(data[q].correctAnswer)
    //mark the answers
    qCards.forEach((qCard, qIdx) => {
      //get the chosen answer
      let answers = qCard.querySelectorAll('li')
      //compare the answers
      answers.forEach((answer, idx) => {
        if (answer.classList.contains('selected')) {
          if (idx === correctAnswers[qIdx]) {
            answer.classList.add('correct')
            score++
          } else {
            answer.classList.add('wrong')
            //find the right answer and highlight it
            answers[correctAnswers[qIdx]].classList.add('correct')
          }
        }
      })
    })

    //show the result
    header.innerText = `Your score is ${score} / ${qCount}`
    //create a clone for the card container to remove all the event listeners
    cardsContainer.replaceWith(cardsContainer.cloneNode(true))
  })
})
