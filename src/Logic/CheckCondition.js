const conditionsFor3x3 = [
    ["1","2","3"],["1","4","7"],["1","5","9"],
    ["2","5","8"],["3","6","9"],["4","5","6"],
    ["7","5","3"],["7","8","9"]
]

export const CheckWinCondition = (boxes,playerType)=>{
    let didPlayerWin = false;
    let checkedArr = [];
    if(playerType === "check"){
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
    didPlayerWin = conditionsFor3x3.some(item => item.every(i => checkedArr.includes(i)));
    return didPlayerWin;
}

export const CheckForWinPotential = (boxes,comType) =>{
    let potentialIndex = 0;
    let checkedArr = [];
    let potentialArrs;
    if(comType === "circle"){
        boxes.forEach((i,index)=>{
            if(i === "circle"){
                checkedArr.push((index+1).toString());
            }
        })
    }else{
        boxes.forEach((i,index)=>{
            if(i === "check"){
                checkedArr.push((index+1).toString());
            }
        })
    }

    potentialArrs = conditionsFor3x3.filter(condition => condition.filter(i => checkedArr.includes(i)).length>1);
    let victoryArr;

    if(potentialArrs.length == 1){
        victoryArr = potentialArrs[0];
    }else{
        victoryArr = potentialArrs.find(arr => arr.some(i => boxes[parseInt(i)-1] ===""));
    }
    if(victoryArr){
        const remainingIndexOfWarningArr = victoryArr.filter(i => !checkedArr.includes(i));
        if(boxes[parseInt(remainingIndexOfWarningArr[0]-1)] !== ""){
            potentialIndex = -1;
        }else{
            potentialIndex = remainingIndexOfWarningArr-1;
        }
    }else{
        potentialIndex = -1;
    }
    return potentialIndex;
}

export const checkForThreatPotential = (boxes,comType)=>{
    let warningIndex = 0;
    let checkedArr = [];
    let warningArrs;
    if(comType === "circle"){
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

    warningArrs = conditionsFor3x3.filter(condition => condition.filter(i => checkedArr.includes(i)).length>1);
    let warningArr;

    if(warningArrs.length == 1){
        warningArr = warningArrs[0];
    }else{
        warningArr = warningArrs.find(arr => arr.some(i => boxes[parseInt(i)-1] ===""));
    }


    if(warningArr){
        const remainingIndexOfWarningArr = warningArr.filter(i => !checkedArr.includes(i));
        if(boxes[parseInt(remainingIndexOfWarningArr[0]-1)] !== ""){
            warningIndex = -1;
        }else{
            warningIndex = remainingIndexOfWarningArr-1;
        }
    }else{
        warningIndex = -1;
    }
    return warningIndex;
}