import Tilt from 'react-parallax-tilt';
import './Logo.css'
function Logo() {
    return (  
        <div className="ma4 mt0">
             
            <Tilt className='Tilt br2 shadow-2 pa3' style={{display: 'inline-block !important',height: '200px', width: '200px'}}>
            <div className="Tilt-inner" style={{marginTop: '1rem'}}>
                <img src="https://www.pngplay.com/wp-content/uploads/4/Brain-Transparent-File.png" alt="logo" />
            </div>
            </Tilt>
        </div>
    );
}

export default Logo;