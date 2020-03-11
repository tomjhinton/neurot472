import React from 'react'
import axios from 'axios'




class Main extends React.Component{
  constructor(){
    super()
    this.state = {
      data: {},
      error: ''

    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
    this.mouseOver = this.mouseOver.bind(this)
    this.mouseOff = this.mouseOff.bind(this)





  }


  componentDidMount(){
    axios.get('/api/works')
      .then(res => this.setState({works: res.data}))
    //   let t = 1
    //   let a
    // setInterval(() => {
    //     t+=1
    //     a = Math.abs(Math.sin(t))
    //     console.log(a)
    //     this.setState({bass: `${a/100} ${a/100}` })
    //   }, 200);


  }

  componentDidUpdate(){



  }

  mouseMove(e){

    console.log()

    this.setState({bass: `${e.screenX /50000} ${e.screenY /50000} `, scale: `${e.screenY /2}` })
  }

  mouseOver(e){

    console.log()

    e.target.classList.remove('distort')
  }

  mouseOff(e){

    e.target.classList.add('distort')
  }


  render() {



    return (
      <div onMouseMove={this.mouseMove} className="body">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="svg-filters">
  <defs>
    <filter id="filter">
      <feTurbulence type="fractalNoise" baseFrequency={this.state.bass} numOctaves="5" result="warp"></feTurbulence>
      <feDisplacementMap xChannelSelector="R" yChannelSelector="B" scale={this.state.scale} in="SourceGraphic" in2="warpOffset" />
    </filter>

  </defs>
</svg>
      <h1 className="text"  onMouseMove={this.mouseMove}>The intersection of art  and technology</h1>

        {this.state.works &&this.state.works.map(x=>{
        return(
          <div key={x.id}>
          <img src={`data:image/png;base64,  ${x.dat.slice(2).slice(0, -1)}`} className='distort' onMouseOver={this.mouseOver} onMouseLeave={this.mouseOff}/>

          </div>
        )


      })}



      </div>




    )
  }
}
export default Main
