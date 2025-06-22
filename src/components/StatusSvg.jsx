const StatusSvg = ({data}) => {
     const eachStatuspath ={
        name:{'stalled':[{path:"",fill:""},{path:'',fill:''}]}
     };

     const{statusPathArray} = eachStatus.name[data]

    return ( 
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        {statusPathArray.map(item => 
             <path d={item.path} fill={item.fill}/>
        )}
       
       
    </svg>

     );
}
 
export default StatusSvg;