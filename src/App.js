import {useState, useEffect} from 'react'
import {RiCloseLine} from 'react-icons/ri'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import {
  GameNamesandScoreContainer,
  GamesNamesPara,
  GameHeading,
  ScorePara,
  GamesScore,
  ScoreContainer,
  GamesImagesContainer,
  FinalImg,
  ResultContainer,
  PopUpContainer,
  TriggerButton,
  TriggerImage,
  GeneralContainer,
  MainContainer,
  GameImg,
  CloseButton,
  GameButton,
  ResultHeading,
  ResultButton,
} from './styledComponents'

import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

const rulesImg =
  'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png'

const App = () => {
  const [score, setScore] = useState(0)
  const [isgameClicked, setIsGameClicked] = useState(false)
  const [player, setPlayer] = useState(null)
  const [opposition, setOpposition] = useState(null)
  const [gameResult, setGameResult] = useState(null)

  const gameHeaderContainer = () => (
    <GameNamesandScoreContainer>
      <GameHeading>Rock Paper Scissors</GameHeading>
      <ScoreContainer>
        <ScorePara>Score</ScorePara>
        <GamesScore>{score}</GamesScore>
      </ScoreContainer>
    </GameNamesandScoreContainer>
  )

  const playAgain = () => {
    setIsGameClicked(false)
  }

  const gameResultSettingFunction = playerId => {
    if (opposition === playerId) {
      setGameResult('Draw')
    } else if (
      (playerId === 'ROCK' && opposition === 'SCISSORS') ||
      (playerId === 'PAPER' && opposition === 'ROCK') ||
      (playerId === 'SCISSORS' && opposition === 'PAPER')
    ) {
      setScore(prevScore => prevScore + 1)
      setGameResult('Win')
    } else {
      setScore(prevScore => prevScore - 1)
      setGameResult('Loose')
    }
  }

  const gameButtonClicked = id => {
    setIsGameClicked(true)
    setPlayer(id)
    gameResultSettingFunction(id)
  }

  const rockPaperImages = () => (
    <GamesImagesContainer>
      {choicesList.map(eachGame => (
        <GameButton
          key={eachGame.id}
          data-testid={`${eachGame.id.toLowerCase()}Button`}
          onClick={() => gameButtonClicked(eachGame.id)}
        >
          <GameImg src={eachGame.imageUrl} alt={eachGame.id} />
        </GameButton>
      ))}
    </GamesImagesContainer>
  )

  const reactPopUp = () => (
    <PopUpContainer>
      <Popup modal trigger={<TriggerButton type="button">Rules</TriggerButton>}>
        {close => (
          <GeneralContainer>
            <CloseButton
              type="button"
              className="trigger-button"
              onClick={() => close()}
            >
              <RiCloseLine size="20" />
            </CloseButton>
            <TriggerImage src={rulesImg} alt="rules" />
          </GeneralContainer>
        )}
      </Popup>
    </PopUpContainer>
  )

  const gameNotStarted = () => (
    <>
      {rockPaperImages()}
      {reactPopUp()}
    </>
  )

  const winContainer = () => {
    const playerObject = choicesList.find(each => each.id === player)
    const playerImage = playerObject.imageUrl
    const opponentObject = choicesList.find(each => each.id === opposition)
    const oppositionImage = opponentObject.imageUrl

    return (
      <GeneralContainer>
        <ResultContainer>
          <GeneralContainer>
            <GamesNamesPara>YOU</GamesNamesPara>
            <FinalImg src={playerImage} alt="your choice" />
          </GeneralContainer>
          <GeneralContainer>
            <GamesNamesPara>OPPONENT</GamesNamesPara>
            <FinalImg src={oppositionImage} alt="opponent choice" />
          </GeneralContainer>
        </ResultContainer>
        <ResultHeading>YOU WON</ResultHeading>
        <ResultButton onClick={playAgain}>PLAY AGAIN</ResultButton>
      </GeneralContainer>
    )
  }

  const looseContainer = () => {
    const playerObject = choicesList.find(each => each.id === player)
    const playerImage = playerObject.imageUrl
    const opponentObject = choicesList.find(each => each.id === opposition)
    const oppositionImage = opponentObject.imageUrl

    return (
      <GeneralContainer>
        <ResultContainer>
          <GeneralContainer>
            <GamesNamesPara>OPPONENT</GamesNamesPara>
            <FinalImg src={oppositionImage} alt="opponent choice" />
          </GeneralContainer>
          <GeneralContainer>
            <GamesNamesPara>YOU</GamesNamesPara>
            <FinalImg src={playerImage} alt="your choice" />
          </GeneralContainer>
        </ResultContainer>
        <ResultHeading>YOU LOSE</ResultHeading>
        <ResultButton onClick={playAgain}>PLAY AGAIN</ResultButton>
      </GeneralContainer>
    )
  }

  const drawContainer = () => {
    const playerObject = choicesList.find(each => each.id === player)
    const playerImage = playerObject.imageUrl
    const opponentObject = choicesList.find(each => each.id === opposition)
    const oppositionImage = opponentObject.imageUrl

    return (
      <GeneralContainer>
        <ResultContainer>
          <GeneralContainer>
            <GamesNamesPara>YOU</GamesNamesPara>
            <FinalImg src={playerImage} alt="your choice" />
          </GeneralContainer>
          <GeneralContainer>
            <GamesNamesPara>OPPONENT</GamesNamesPara>
            <FinalImg src={oppositionImage} alt="opponent choice" />
          </GeneralContainer>
        </ResultContainer>
        <ResultHeading>IT IS DRAW</ResultHeading>
        <ResultButton onClick={playAgain}>PLAY AGAIN</ResultButton>
      </GeneralContainer>
    )
  }

  const result = () => {
    switch (gameResult) {
      case 'Win':
        return winContainer()
      case 'Loose':
        return looseContainer()
      case 'Draw':
        return drawContainer()
      default:
        return null
    }
  }

  useEffect(() => {
    const randomOpponent = () => {
      const random = Math.random() * choicesList.length
      const randomFloor = Math.floor(random)
      console.log(randomFloor)
      setOpposition(choicesList[randomFloor].id)
    }
    randomOpponent()
  }, [])

  return (
    <MainContainer>
      {gameHeaderContainer()}
      {isgameClicked ? result() : gameNotStarted()}
    </MainContainer>
  )
}

export default App
// {isgameClicked ? result() : gameNotStarted()}
