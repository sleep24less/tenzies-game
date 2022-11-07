export default function Die(props) {
    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "#ffffff"
    }

    return (
        <div className="die noselect" style={style} onClick={props.holdDice}>
            <img src={`./public/${props.value}.png`} alt={props.value} className='dice_img' />
        </div>
    )
}