
export function processString(str) {

    if (str.toLowerCase().includes("assembly")) {
       
        return str.replace(/(assembly)/i, ' $1').replace(/^\s/, ''); // Remove leading space if it's at the start
    } else {
       
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

export function getYearFromDate(dateString) {
   
    const date = new Date(dateString);
    
   
    const year = date.getFullYear();
    
    return year;
}

export function capitalize(str){
   return str.toUpperCase();
}