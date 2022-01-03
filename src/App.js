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
  
  //verificando se a coluna só tem até 3 quadrados iguais
  const checkForColumnOfThree = () =>{
    for(let i = 0; i < 47; i++){
      const columnOfThree = [i, i +width, i + width * 2]
      const decidedColor = currentColorArragment[i]

      if( columnOfThree.every(square => currentColorArragment[square] === decidedColor)){
        columnOfThree.forEach(square => currentColorArragment[square] = '')

     }
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
      checkForColumnOfThree()
      setCurrentColorArragment([...currentColorArragment])
    }, 100)
    return() => clearInterval(timer)
  }, [checkForColumnOfThree, currentColorArragment]);

  console.log(currentColorArragment)

  return ( 
    <div className='app'>
      <div className='game'>
          {currentColorArragment.map((candyColor, index)=> ( //passando dentro do array e exibindo item a item sorteados
            <img 
              key={index}
              style={{backgroundColor: candyColor}}
              alt={candyColor}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
