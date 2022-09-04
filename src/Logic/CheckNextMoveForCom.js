import {checkForThreatPotential,CheckForWinPotential} from './CheckCondition'


export const CheckNextMoveForCom = ({boxes,typeOfCom})=>{
    let newBoxes = [...boxes];
    let currentAmountOfComputerMoves = newBoxes.filter(i => i=== typeOfCom).length;
    let currentAmountOfUserMoves = newBoxes.filter(i => i!== typeOfCom && i !== "").length;

    if(currentAmountOfComputerMoves === 0){
        newBoxes = computerFirstMove(newBoxes,typeOfCom,currentAmountOfUserMoves);
        return newBoxes;
    }

    if(currentAmountOfComputerMoves === 1){
        newBoxes = computerSecondMove(newBoxes,typeOfCom,currentAmountOfUserMoves);
        return newBoxes;
    }
    const checkPointIndex = CheckForWinPotential(newBoxes,typeOfCom);
    if(checkPointIndex !== -1){
        let newBoxes = [...boxes].map((i,index) => index === checkPointIndex ? typeOfCom : i);
        return newBoxes;
    }
    
    newBoxes = computerTheFollowingMove(newBoxes,typeOfCom,currentAmountOfUserMoves);
    return newBoxes;
}

const computerFirstMove = (boxes,typeOfCom,currentAmountOfUserMoves)=>{
    if(boxes.every(box => box === "")){
        let newBoxes = [...boxes].map((i,index)=> index === 4 ? typeOfCom : i);
        return newBoxes;
    }else if(currentAmountOfUserMoves===1){
        if([...boxes][4] !== "" && [...boxes][4] !== typeOfCom){
            const availablePotentialMoves = [1,3,7,9];
            const chosenNumber = Math.floor(Math.random() * availablePotentialMoves.length);
            let newBoxes = [...boxes].map((i,index) => index === availablePotentialMoves[chosenNumber]-1 ? typeOfCom : i);
            return newBoxes;
        }else{
            let newBoxes = [...boxes].map((i,index)=> index === 4 ? typeOfCom : i);
            return newBoxes;
        }
    }
}

const computerSecondMove = (boxes,typeOfCom,currentAmountOfUserMoves)=>{
    // Computer go first (player 1 move Com 1 move)
    const availablePotentialMoves = [1,3,7,9];
    if(currentAmountOfUserMoves === 1){
        // Case when player do not check at the 4 corner of the board
        if(availablePotentialMoves.every(i => i === "")){
            const chosenNumber = Math.floor(Math.random() * availablePotentialMoves.length);
            let newBoxes = [...boxes].map((i,index) => index === availablePotentialMoves[chosenNumber]-1 ? typeOfCom : i);
            return newBoxes;
        }else{
            // Case when player check at one of the 4 corner
            let indexOfUnCheckedPotentialBoxes = [];
            availablePotentialMoves.forEach((i)=>{
                if([...boxes][i-1] === ""){
                    indexOfUnCheckedPotentialBoxes.push(i);
                }
            })
            const chosenNumber = Math.floor(Math.random() * indexOfUnCheckedPotentialBoxes.length);
            let newBoxes = [...boxes].map((i,index) => index === indexOfUnCheckedPotentialBoxes[chosenNumber]-1 ? typeOfCom : i);
            return newBoxes;
        }
    }else{
        // Com go second (Com 1 move Player 2 moves)
        const warningIndex = checkForThreatPotential(boxes,typeOfCom);
        if(warningIndex !== -1){
            let newBoxes = [...boxes].map((i,index) => index === warningIndex ? typeOfCom : i);
            return newBoxes;
        }else{
            const caseWhenTwoCrossLineOccupied = [
                ["1","9"],["7","3"]
            ]
            const caseWhenTheLineOccupied = [
                ["1","2","3"],["1","4","7"],["7","8","9"],["3","6","9"]
            ]
            let checkedArr = [];
            if(typeOfCom === "circle"){
                boxes.forEach((i,index)=>{
                    if(i === "check"){
                        checkedArr.push((index+1).toString());
                    }
                })
            }else{
                boxes.forEach((i,index)=>{
                    if(i === "circle"){
                        checkedArr.push((index+1).toString());
                    }
                })
            }
            // Player check 2 opposite corners through the center 
            if(caseWhenTwoCrossLineOccupied.some(i => checkedArr.every(item => i.includes(item)))){
                const availablePotentialMoves = [2,4,6,8];
                const chosenNumber = Math.floor(Math.random() * availablePotentialMoves.length);
                let newBoxes = [...boxes].map((i,index) => index === availablePotentialMoves[chosenNumber]-1 ? typeOfCom : i);
                return newBoxes;
                // Player check 1 corner 
            }else if(caseWhenTwoCrossLineOccupied.some(i => checkedArr.some(item => i.includes(item)))){
                const lineForCheckBox = caseWhenTwoCrossLineOccupied.find(i => !checkedArr.some(item => i.includes(item)));
                const notChosenIndex = lineForCheckBox.find(i => !checkedArr.includes(i));
                let newBoxes = [...boxes].map((i,index) => index === notChosenIndex -1 ? typeOfCom : i);
                return newBoxes;   
            }else{
                // Player did not check any corner
                const linesContainingPlayerChecks = caseWhenTheLineOccupied.filter(item => checkedArr.some(i => item.includes(i)));
                const connectionIndex = [];
                for(let i = 0; i < linesContainingPlayerChecks[0].length; i++) {
                    if(linesContainingPlayerChecks[1].includes(linesContainingPlayerChecks[0][i])){
                        connectionIndex.push(linesContainingPlayerChecks[0][i]);
                    }
                }
                if(connectionIndex.length>0){
                    let newBoxes = [...boxes].map((i,index) => index === parseInt(connectionIndex[0]-1) ? typeOfCom : i);
                    return newBoxes;   
                }else{
                    const chosenNumber = Math.floor(Math.random() * availablePotentialMoves.length);
                    let newBoxes = [...boxes].map((i,index) => index === availablePotentialMoves[chosenNumber]-1 ? typeOfCom : i);
                    return newBoxes;
                }
            }
        }
    }
}

const computerTheFollowingMove = (boxes,typeOfCom,currentAmountOfUserMoves)=>{
    const warningIndex = checkForThreatPotential(boxes,typeOfCom);
    if(warningIndex !== -1){
        let newBoxes = [...boxes].map((i,index) => index === warningIndex ? typeOfCom : i);
        return newBoxes;
    }else{
        const remainingPosition = [];
        boxes.forEach((i,index) =>{
            if(i === ""){
                remainingPosition.push(index+1);
            }
        })
        const chosenNumber = Math.floor(Math.random() * remainingPosition.length);
        let newBoxes = [...boxes].map((i,index) => index === remainingPosition[chosenNumber]-1 ? typeOfCom : i);
        return newBoxes;
    }
}