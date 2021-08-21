export const lookup = (char:string):string => {
    switch(char){
        case "A": return "🄰";
        case "B": return "🄱";
        case "C": return "🄲";
        case "D": return "🄳";
        case "E": return "🄴";
        case "F": return "🄵";
        case "G": return "🄶";
        case "H": return "🄷";
        case "I": return "🄸";
        case "J": return "🄹";
        case "K": return "🄺";
        case "L": return "🄻";
        case "M": return "🄼";
        case "N": return "🄽";
        case "O": return "🄾";
        case "P": return "🄿";
        case "Q": return "🅀";
        case "R": return "🅁";
        case "S": return "🅂";
        case "T": return "🅃";
        case "U": return "🅄";
        case "V": return "🅅";
        case "W": return "🅆";
        case "X": return "🅇";
        case "Y": return "🅈";
        case "Z": return "🅉";
    }
    console.log("No match for "+ char);
    return char;
}

const letters:string[] = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

export const convertString = (string:string):string => {
    let convertedString = string.toUpperCase();
    letters.forEach((letter:string)=> {
        const previousString = convertedString;
        const upperLetter = letter.toUpperCase();
        const replacement = lookup(upperLetter);
        convertedString = convertedString.replaceAll(upperLetter, replacement);
        console.log({"change": previousString===convertedString});
    })
    convertedString = convertedString.replaceAll("\t", " ");
    convertedString += "\nhttps://wordsquare.bhison.com"
    return convertedString;
}