import React,{useState} from 'react'

function WeightInputForm(props) {
    const [weight,setWeight] = useState('')


    function handleWeightInput(event) {
        const {value} = event.target
        setWeight(value)
    }
    function handleSubmit(event) {
        event.preventDefault()
        props.onSubmit(weight)
        setWeight('')
    }

    return (
        <form style={{top:0,position:"relative"}} onSubmit={(event)=> handleSubmit(event)}>
            <input name="weight" value={weight}  placeholder="Current weight" onChange={(e)=> handleWeightInput(e) } />
            <button type="submit">SUBMIT</button>
        </form>
    )

}

export default WeightInputForm
