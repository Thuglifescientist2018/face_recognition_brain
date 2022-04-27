import './FaceRecognition.css';
function FaceRecognition({imageUrl, box}) {
    
    return (  
        <div className="center">
            <div className="absolute mt2">
            <img id="inputimage" src={imageUrl} alt="" width={'500px'} height='auto'/>
            <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol,
            background: "url('https://pngimg.com/uploads/thug_life/thug_life_PNG33.png') no-repeat center 8vh/cover"
            
            }} >

            </div>
            </div>
        </div>
    );
}

export default FaceRecognition;