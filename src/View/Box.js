import React from 'react'
import styled from 'styled-components'

const Box = ({order,type,iamCheck,isMyTurn,handleMove,isCheckWin,isDraw}) => {
    const handleClickBox = ()=>{
        if(type !== "" || !isMyTurn || isDraw || isCheckWin !== 0) return;
        handleMove({order,type:iamCheck ? 'check' : 'circle'})
    }

  return (
    <Wrapper>
        {
            type === ""
            ?
            <div className="empty_icon" onClick={handleClickBox} style={{}}>
            {
                iamCheck && isMyTurn
                ?
                <img className="placeholder_img" src="https://res.cloudinary.com/dhrpdnd8m/image/upload/v1658376518/zvhinkjq5tg9y3wqpf7z.png" alt=""/>
                :
                !iamCheck && isMyTurn
                ?
                <img className="placeholder_img" src="https://res.cloudinary.com/dhrpdnd8m/image/upload/v1661916515/p0hrhcyuo71ynlrgyxri.png" alt=""/>
                :
                <div></div>
                }
            </div>
            :
            <div className="icon" style={{}}>
                {
                    type === "check"
                    ?
                    <img className="placeholder_img" src="https://res.cloudinary.com/dhrpdnd8m/image/upload/v1658376518/zvhinkjq5tg9y3wqpf7z.png" alt=""/>
                    :
                    <img className="placeholder_img" src="https://res.cloudinary.com/dhrpdnd8m/image/upload/v1661916515/p0hrhcyuo71ynlrgyxri.png" alt=""/>
                }
            </div>
        }
    </Wrapper>
  )
}

const Wrapper = styled.div`
    height:100px;
    width:100px;
    background:white;
    border-radius:0.5rem;
    @media(max-width:375px){
        height:80px;
        width:80px;
    }
    .empty_icon{
        width:100%;
        height:100%;
        display:none;
        align-items:center;
        cursor:pointer;
        justify-content:center;
        opacity:0.4;
        .placeholder_img{
            height:80%;
            width:80%;
            object-fit:cover;
        }
    }
    .icon{
        width:100%;
        height:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        cursor:not-allowed;
        opacity:1;
        .placeholder_img{
            height:80%;
            width:80%;
            object-fit:cover;
        }
    }
    :hover{
        .empty_icon{
            display:flex;
        }
    }
`

export default Box