import React from 'react'
import axios from 'axios'
const THREE = require('three')
import TweenMax from 'gsap'


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
      .then(res => {
        this.setState({works: res.data})
        const scene = new THREE.Scene()
        scene.add( new THREE.AmbientLight( 0x666666 ) )
        const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.5, 10000 )
        camera.position.x=0
        camera.position.y=1
        camera.position.z=25
        scene.add( camera )
        const light = new THREE.DirectionalLight( 0xffffff, 0.5 )
        scene.add(light)
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize( window.innerWidth, window.innerHeight )
        document.body.appendChild( renderer.domElement )
        let texture, texture2
        if(this.state.works){
          texture = new THREE.TextureLoader().load( `data:image/png;base64,  ${this.state.works[0].dat.slice(2).slice(0, -1)}` )
          texture2 = new THREE.TextureLoader().load( `data:image/png;base64,  ${this.state.works[1].dat.slice(2).slice(0, -1)}` )
        }
        const geometry = new THREE.PlaneBufferGeometry(16, 8, 1, 1)
        const material1 = new THREE.MeshBasicMaterial({
          map: texture
        })
        const material2 = new THREE.MeshBasicMaterial({
          map: texture2
        })

        const mesh1 = new THREE.Mesh(geometry, material1)
        const mesh2 = new THREE.Mesh(geometry, material2)



        scene.add(mesh1, mesh2)
        let mouse = new THREE.Vector2(0, 0)
window.addEventListener('mousemove', (ev) => { onMouseMove(ev) })

// ...

function onMouseMove(event) {
	TweenMax.to(mouse, 0.5, {
		x: (event.clientX / window.innerWidth) * 2 - 1,
		y: -(event.clientY / window.innerHeight) * 2 + 1,
	})

	TweenMax.to(mesh1.rotation, 0.5, {
		x: -mouse.y * 0.3,
		y: mouse.x * (Math.PI / 6)
	})
  TweenMax.to(mesh2.rotation, 0.5, {
		x: -mouse.y * 0.3,
		y: mouse.x * (Math.PI / 6)
	})
}


        function animate() {


          /* render scene and camera */
          renderer.render(scene,camera)
          requestAnimationFrame(animate)
        }



        requestAnimationFrame(animate)


      })

  }

  componentDidUpdate(){



  }

  mouseMove(e){

    console.log(e)

    this.setState({bass: `${e.screenX /50000} ${e.screenY /50000} `, scale: `${e.screenY /2}` })
  }

  mouseOver(e){



    e.target.classList.remove('distort')
  }

  mouseOff(e){

    e.target.classList.add('distort')
  }


  render() {



    return (
      <div onMouseMove={this.mouseMove} className="body">




      </div>




    )
  }
}
export default Main
