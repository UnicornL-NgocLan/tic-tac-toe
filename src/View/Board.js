import React,{useState,useEffect} from 'react'
import styled from 'styled-components'

import Box from './Box'
import { CheckNextMoveForCom } from '../Logic/CheckNextMoveForCom'
import { CheckWinCondition } from '../Logic/CheckCondition'

const Board = () => {
    const [boxes,setBoxes] = useState(["","","","","","","","",""]);
    const [isCheckWin,setIsCheckWin] = useState(0);

    const [iamCheck,setIamCheck] = useState(false);
    const [isMyTurn,setIsMyTurn] = useState(true);
    const [isDraw,setIsDraw] = useState(false);

    const handleMove = ({order,type}) =>{
        const newBoxes = [...boxes].map((i,index) => order === index+1 ? type : i);
        if(CheckWinCondition(newBoxes,iamCheck ? 'check':'circle')){
            setIsCheckWin(iamCheck ? 1 : 2);
            setBoxes(newBoxes);
        }else if(newBoxes.filter(i => i==="").length ===0 && !CheckWinCondition(newBoxes,iamCheck ? 'check':'circle')){
            setBoxes(newBoxes);
            setIsDraw(true);
        }   
        else{
            setBoxes(newBoxes);
            setIsMyTurn(!isMyTurn);
        }
    }

    const handleRestartGame = ()=>{
        setIsDraw(false);
        setIsMyTurn(!isMyTurn);
        setIamCheck(!iamCheck);
        setIsCheckWin(0);
        setBoxes(["","","","","","","","",""]);
    }

    useEffect(() => {
        if(!isMyTurn){
            const newBoxes = CheckNextMoveForCom({boxes,isComputerTurn:true,typeOfCom:iamCheck ? 'circle' : 'check'});
            if(CheckWinCondition(newBoxes,iamCheck ? 'circle':'check')){
                setIsCheckWin(iamCheck ? 2 : 1);
                setBoxes(newBoxes);
            }else if(newBoxes.filter(i => i==="").length ===0 && !CheckWinCondition(newBoxes,iamCheck ? 'circle':'check')){
                setBoxes(newBoxes);
                setIsDraw(true);
            } 

            else{
                setBoxes(newBoxes);
                setIsMyTurn(!isMyTurn);
            }
        }
    }, [isMyTurn]);

  return (
    <Wrapper>
        <div className="board-wrapper">
            {isDraw && <small>Draw</small>}
            {isCheckWin !== 0 && <small>{isCheckWin === 1 && iamCheck ? "You win!" : isCheckWin === 1 && !iamCheck ? "You lose" :isCheckWin === 2 && iamCheck ? "You lose!" :  "You win"}</small>}
            {(isCheckWin !== 0 || isDraw)  && <div className="restart-btn" onClick={handleRestartGame}>
                <span>Play again</span>
            </div>}
            <div className="board">
                {
                    boxes.map((i,index)=><Box 
                    key={index} order={index+1} 
                    type={i}
                    handleMove={handleMove}
                    isMyTurn={isMyTurn}
                    iamCheck={iamCheck}
                    />)
                }
            </div>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100vw;
    height:100vh;
    .board-wrapper{
        small{
            font-size:2rem;
            font-weight:bold;
        }
        .restart-btn{
            padding:0.5rem 1rem;
            border-radius:0.5rem;
            background:black;
            transition:all 0.4s linear;
            cursor:pointer;
            margin:1rem 0;
            span{
                color:white;
                font-weight:500;
            }
            :hover{
                background:grey;
            }
        }
        .board{
            display:grid;
            background:black;
            grid-template-columns:repeat(3,1fr);
            width:auto;
            height:auto;
            gap:0.5rem;
            padding:0.5rem;
            border-radius:0.5rem;
        }
    }
`

export default Board