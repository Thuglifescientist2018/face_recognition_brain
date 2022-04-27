function Rank({name, entries}) {
  
    return ( 
        <div className="f3">
            {`${name}, your current rank is`}
            <div className="f1">
                {`#${entries}`}
            </div>
        </div>
     );
}

export default Rank;