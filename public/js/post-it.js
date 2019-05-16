document.getElementById('btn-add').addEventListener('click', () => {
  var containerNotes = document.getElementById('container-notes')
  containerNotes.appendChild(CARD.newNote())
  var cards = document.getElementsByClassName('card')
  for (let card of cards) {
    console.log(card)
  }
})

const CARD = {
  colors: [{
      name: 'azul',
      value: '#4285F4',
      color: '#fff'
    },
    {
      name: 'rojo',
      value: '#EA4335',
      color: '#fff'
    },
    {
      name: 'amarillo',
      value: '#FBBC05',
      color: '#fff'
    },
    {
      name: 'blanco',
      value: '#fff',
      color: '#000'
    },
    {
      name: 'verde',
      value: '#34A853',
      color: '#fff'
    },
    {
      name: 'naranja',
      value: '#F4B416',
      color: '#fff'
    },
    {
      name: 'naranja claro',
      value: '#FBE364',
      color: '#fff'
    }
  ],
  newNote: () => {
    // nota
    var note = document.createElement('div')
    const cardBody = document.createElement('div')
    const title = document.createElement('h5')
    const body = document.createElement('p')
    note.className = 'card'
    note.style.cssFloat = 'left'
    note.style.width = '300px'
    note.style.margin = '15px 15px'
    cardBody.className = 'card-body'
    // titulo de la nota
    const inputTitle = document.createElement('input')
    inputTitle.type = 'text'
    inputTitle.className = 'form-control without-border'
    inputTitle.placeholder = 'Titulo'

    const inputBody = document.createElement('textarea')
    inputBody.className = 'form-control without-border'
    inputBody.placeholder = 'Nota'
    var flagEdit = false
    const inputSave = document.createElement('button')
    inputSave.className = 'btn btn-primary'
    inputSave.innerHTML = 'Guardar'
    inputSave.addEventListener('click', () => {
      if (inputTitle.value !== '' && inputBody.value !== '') {
        CARD.saveCard({
          title,
          body,
          inputTitle,
          inputBody,
          cardBody,
          inputSave
        })
        flagEdit = true
      }
    })
    cardBody.onmouseenter = () => {
      if (flagEdit) {
        const select = document.createElement('div')
        select.className = 'dropdown'
        const btnOptions = document.createElement('a')
        btnOptions.className = 'btn btn-outline-info dropdown-toggle'
        btnOptions.role = 'button'
        btnOptions.id = 'dropdownMenuLink'
        const iconOptions = document.createElement('i')
        iconOptions.className = 'fas fa-palette'
        btnOptions.appendChild(iconOptions)
        btnOptions.setAttribute('data-toggle', 'dropdown')
        btnOptions.setAttribute('aria-haspopup', 'true')
        btnOptions.setAttribute('aria-expanded', 'false')
        select.appendChild(btnOptions)
        const dropdownMenu = document.createElement('div')
        dropdownMenu.className = 'dropdown-menu'
        dropdownMenu.setAttribute('aria-labelledby', 'dropdownMenuLink')
        CARD.colors.forEach(color => {
          let optionColor = document.createElement('a')
          optionColor.innerHTML = color.name
          optionColor.className = 'dropdown-item'
          dropdownMenu.appendChild(optionColor)
          optionColor.onclick = () => {
            note.style.backgroundColor = color.value
            note.style.color = color.color
          }
        })
        select.appendChild(dropdownMenu)
        const buttonEdit = document.createElement('a')
        buttonEdit.className = 'btn btn-outline-info btn-edit'
        const edit = document.createElement('i')
        edit.className = 'fas fa-edit'
        buttonEdit.appendChild(edit)
        cardBody.appendChild(buttonEdit)
        cardBody.appendChild(select)
        buttonEdit.onclick = () => {
          inputTitle.value = title.innerHTML
          inputBody.value = body.innerHTML
          inputTitle.style.color = note.style.color
          inputBody.style.color = note.style.color
          inputTitle.style.backgroundColor = note.style.backgroundColor
          inputBody.style.backgroundColor = note.style.backgroundColor
          cardBody.replaceChild(inputTitle, title)
          cardBody.replaceChild(inputBody, body)
          cardBody.appendChild(inputSave)
          buttonEdit.remove()
          select.remove()
          flagEdit = false
        }
      }
    }

    cardBody.onmouseleave = () => {
      if (flagEdit) {
        cardBody.lastChild.remove()
        cardBody.lastChild.remove()
      }
    }
    cardBody.appendChild(inputTitle)
    cardBody.appendChild(inputBody)
    cardBody.appendChild(inputSave)
    note.appendChild(cardBody)
    return note
  },

  saveCard: (options) => {
    options.title.className = 'card-title'
    options.title.innerHTML = options.inputTitle.value
    options.body.className = 'card-text'
    options.body.innerHTML = options.inputBody.value
    options.cardBody.replaceChild(options.title, options.inputTitle)
    options.cardBody.replaceChild(options.body, options.inputBody)
    options.inputSave.remove()
  }
}