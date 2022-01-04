import {useEffect, useState} from 'react';

const width = 8;
//definindo array para cores 
const candyColors = [
    'blue',
    'green',
    'orange',
    'purple',
    'red',
    'yellow'
]


//function App() {
const App = () => {
  const [currentColorArragment, setCurrentColorArragment] = useState([]);
  const[ squareBeingDragged, setSquareBeingDragged] = useState(null);
  const[ squareBeingReplaced, setSquareBeingReplaced] = useState(null); 

  const checkForColumnOfFour = () =>{
    for(let i = 0; i <= 39; i++){
      const columnOfFour = [i, i +width, i + width * 2, i + width * 3]
      const decidedColor = currentColorArragment[i]
  
      if( columnOfFour.every(square => currentColorArragment[square] === decidedColor)){
        columnOfFour.forEach(square => currentColorArragment[square] = '')
        return true
     }
   }
  }

  //verificando se a coluna só tem até 3 quadrados iguais por linha
const checkForRowOfFor = () =>{    
  for(let i = 0; i < 64; i++){
    const rowOfFour = [i, i + 1, i +2, i + 3]
    const decidedColor = currentColorArragment[i]
    const notValid = [5,6,7,13,14,15,21, 22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
    if(notValid.includes(i)) continue

    if( rowOfFour.every(square => currentColorArragment[square] === decidedColor)){
      rowOfFour.forEach(square => currentColorArragment[square] = '')
      return true
     }
   }
  }

  

  //verificando se a coluna só tem até 3 quadrados iguais por coluna 
  const checkForColumnOfThree = () =>{
    for(let i = 0; i <= 47; i++){
      const columnOfThree = [i, i +width, i + width * 2]
      const decidedColor = currentColorArragment[i]
  
      if( columnOfThree.every(square => currentColorArragment[square] === decidedColor)){
        columnOfThree.forEach(square => currentColorArragment[square] = '')
        return true
     }
   }
  }  

//verificando se a coluna só tem até 3 quadrados iguais por linha
const checkForRowOfThree = () =>{    
    for(let i = 0; i < 64; i++){
      const rowOfthree = [i, i + 1, i +2]
      const decidedColor = currentColorArragment[i]
      const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
      if(notValid.includes(i)) continue

      if( rowOfthree.every(square => currentColorArragment[square] === decidedColor)){
        rowOfthree.forEach(square => currentColorArragment[square] = '')
        return true
       }
     }
    }

    const moveIntoSquareBellow = () => {
      for(let i = 0; i <= 55; i++){
        const firstRow = [0,1,2,3,4,5,6,7]
        const isFirstRow = firstRow.includes()

        if(isFirstRow && currentColorArragment[i] === '' ){
          let randomNumber =  Math.floor(Math.random() * candyColors.length)
          currentColorArragment[i] = candyColors[randomNumber]
        }

        if((currentColorArragment[i + width]) === ''){
          currentColorArragment[i + width] = currentColorArragment[i]
          currentColorArragment[i] = ''
        }
      }
    }

    const dragStart = (e) => {
      console.log(e.target)
      console.log('drag start')
      setSquareBeingDragged(e.target)
    }

    const dragDrop= (e) => {
      console.log(e.target)
      console.log('drag drop')
      setSquareBeingReplaced(e.target)
    }

    const dragEnd = (e) => { 
      console.log('drag dragEnd')

      const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
      const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

      currentColorArragment[squareBeingReplacedId] = squareBeingDragged.style.backgroundColor
      currentColorArragment[squareBeingDraggedId] = squareBeingReplaced.style.backgroundColor

      const validMoves = [
        squareBeingDraggedId -1,
        squareBeingDraggedId - width,
        squareBeingDraggedId + 1,
        squareBeingDraggedId + width
      ]

      const validMove = validMoves.includes(squareBeingReplacedId)
      
      const isAColumnOfFour = checkForColumnOfFour()
      const isARowOfFour = checkForRowOfFor()
      const isAcolumnOfThree =  checkForColumnOfThree()
      const isARowOfThree = checkForRowOfThree()

      if(squareBeingReplacedId && 
        validMove && 
        ( isARowOfThree || isARowOfFour || isAcolumnOfThree)){
        setSquareBeingDragged(null)
        setSquareBeingReplaced(null)
      } else {
        currentColorArragment[squareBeingReplacedId] = squareBeingReplaced.style.backgroundColor
        currentColorArragment[squareBeingDraggedId] = squareBeingDragged.style.backgroundColor
        setCurrentColorArragment([...currentColorArragment])
      }


    }


  //sorteando as cores e posições para o  array
  const createBoard = () => {
    const randomColorArragment = [];
    for(let i = 0; i < width * width; i++){    
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArragment.push(randomColor);
    }
    setCurrentColorArragment(randomColorArragment) //colocando "sorteio" em uma var
  }

  useEffect(()=>{
    createBoard() //a cada atualização resetar o o card
  }, []);

  useEffect(()=> {
    const timer = setInterval(()=> {
      checkForColumnOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      checkForRowOfFor()
      moveIntoSquareBellow()
      setCurrentColorArragment([...currentColorArragment])
    }, 100)
    return() => clearInterval(timer)
  }, [ checkForColumnOfFour, checkForColumnOfThree, checkForRowOfThree,checkForRowOfFor,moveIntoSquareBellow,currentColorArragment]);
  

  return ( 
    <div className='app'>
      <div className='game'>
          {currentColorArragment.map((candyColor, index)=> ( //passando dentro do array e exibindo item a item sorteados
            <img //controlando peça a peça do jogo
              key={index}
              style={{backgroundColor: candyColor}}
              alt={candyColor}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e)=> e.preventDefault()}
              onDragEnter={(e)=> e.preventDefault()}
              onDragLeave={(e)=> e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
