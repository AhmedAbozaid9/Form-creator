const takeQuizBtn = document.querySelector('.takeQuiz')
const createQuizBtn = document.querySelector('.createQuiz')

const choices = document.querySelector('.choices')
const header = document.querySelector('h1')

const backContainer = document.querySelector('.backContainer')
const doneContainer = document.querySelector('.doneContainer')
const btnContainer = document.querySelector('.btnContainer')
const cardsContainer = document.querySelector('.cardsContainer')
//functions
function clearScreen(text) {
  choices.style.display = 'none'
  header.innerText = `${text} a quiz`
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
    //remove the button that creates cards
    btnContainer.removeChild(document.querySelector('.addBtn'))
    //reset the header
    header.innerText = 'Choose whether to create a quiz or take one.'
    //delete the cards
    document
      .querySelectorAll('.card')
      .forEach((card) => cardsContainer.removeChild(card))

    //remove the done button
    doneContainer.removeChild(document.querySelector('.doneBtn'))
  })
}

function createCard() {
  let card = document.createElement('div')
  card.classList.add('card')
  card.innerHTML = `
    <input type="text" class="question" placeholder="Question" />
    <section class="answers">
      <div class="answersContainer">
        <div class="answer answer1">
          <div class="markCircle"></div>
          <input type="text" placeholder="type an answer here" />
        </div>
        <div class="answer answer2">
          <div class="markCircle"></div>
          <input type="text" placeholder="type an answer here" />
        </div>
        <div class="answer answer3">
          <div class="markCircle"></div>
          <input type="text" placeholder="type an answer here" />
        </div>
        <div class="answer answer4">
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
    cardData['correctAnswer'] = +card.querySelector('.correctAnswer .nums').value
    quiz['Q' + ++counter] = cardData
  })
  //save the data
  localStorage.setItem('quizData',JSON.stringify(quiz))
  console.log(JSON.parse(localStorage.getItem('quizData')))

}
//event listeners
//create quiz
createQuizBtn.addEventListener('click', () => {
  clearScreen('Create')
  createBackBtn()
  createCard()
  //create the add card button
  const addBtn = document.createElement('button')
  addBtn.innerHTML = '<i class="fas fa-plus fa-2x"></i>'
  addBtn.classList.add('addBtn')
  document.querySelector('.btnContainer').appendChild(addBtn)
  addBtn.addEventListener('click', createCard)
  //create the done button
  const doneBtn = document.createElement('button')
  doneBtn.classList.add('doneBtn')
  doneBtn.innerText = 'Done'
  doneContainer.appendChild(doneBtn)

  doneBtn.addEventListener('click', saveData)
})
takeQuizBtn.addEventListener('click', () => {
  clearScreen('take')
  createBackBtn()
})
