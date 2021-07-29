const takeQuizBtn = document.querySelector('.takeQuiz')
const createQuizBtn = document.querySelector('.createQuiz')

const choices = document.querySelector('.choices')
const header = document.querySelector('h1')

const backContainer = document.querySelector('.backContainer')
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

  backBtn.addEventListener('click', () => {
    choices.style.display = 'flex'
    //hide the back button
    backContainer.removeChild(backBtn)
    //remove the button that creates cards
    btnContainer.removeChild(document.querySelector('.addBtn'))
    //reset the header
    header.innerText = 'Choose whether to create a quiz or take one.'
  })
}

function createQuestion() {
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
          <p>The right answer is</p>
          <select class="nums">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>
    </section>
  `
  cardsContainer.appendChild(card)
}
//event listeners

createQuizBtn.addEventListener('click', () => {
  clearScreen('Create')
  createBackBtn()
  createQuestion()

  let addBtn = document.createElement('button')
  addBtn.innerHTML = '<i class="fas fa-plus fa-2x"></i>'
  addBtn.classList.add('addBtn')
  document.querySelector('.btnContainer').appendChild(addBtn)
})
takeQuizBtn.addEventListener('click', () => {
  clearScreen('take')
  createBackBtn()
})
