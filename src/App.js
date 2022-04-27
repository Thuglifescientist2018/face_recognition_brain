import { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particleConfig from "./particle-config";

import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";




import './App.css';

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
    }
}


class App extends Component {
    constructor() {
        super();
        this.state = initialState;
        console.log(this.state)
    }
   

     particlesInit = async (main) => {
       
    
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
      };
    
       particlesLoaded = (container) => {
       
      };
      calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById("inputimage");
        const width = Number(image.width)
        const height = Number(image.height)
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
           
        }
    }
    displayFaceBox = (box) => {
        
        this.setState({box: box})
      
    }
      onInputChange = (e) => {
          this.setState({input: e.target.value})
      }
      onSubmit = () => {
        this.setState({imageUrl: this.state.input})
        fetch('https://powerful-depths-32365.herokuapp.com/imageurl', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                input: this.state.input
            })
          

        })
        .then(response => response.json())
        .then(response =>{
          
            if(response) {
                if(!response.outputs[0].data.regions[0].region_info.bounding_box ) {
                  
                    return Error("unable to detect face")
                }
                fetch('https://powerful-depths-32365.herokuapp.com/image', {
                    method: 'PUT',
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                  

                }).then(response => response.json()).then((count) => {

                        this.setState(Object.assign(this.state.user, {entries: count}))
                }).catch(() => "failed to get count")
            }
         
            this.displayFaceBox(this.calculateFaceLocation(response))
            
        }
          )
          .catch(err => console.log(err));
      }
      onRouteChange = (route) => {
          if(route === 'signout') {
          this.setState(initialState)
          }
          else if(route === "home") {
              this.setState({isSignedIn: true})
          }
          this.setState({route: route})
      }
      loadUser = (data) => {
          this.setState({user: {
              id: data.id,
              name: data.name,
              email: data.email,
              entries: data.entries,
              joined: data.joined
          }})
     
      }
    render() {
        const {isSignedIn, imageUrl, route, box} = this.state
        return (
        <div className="App">
        <Particles
        id="tsparticles"
        init={this.particlesInit}
        loaded={this.particlesLoaded}
        options={particleConfig}
        />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
            {
                route === 'home' ?
                <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
               <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
               <FaceRecognition box={box} imageUrl={imageUrl} />
                </div>
                : (
                    route === "signin" ?
                     <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
                     : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                   
                )
            }
        
           
        </div>
        )
    }
}

export default App;