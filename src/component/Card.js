import React from "react"

const Card= ()=>{

    return (
    <>
    <div className="col-sm-3">
      <div className="card">
        <img src={props.img} alt="Fissure in Sandstone"/>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
        </div>
      </div>
    </div>
  </>
    )
}


export default Card