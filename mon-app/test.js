const pos = [318, 348, 395, 518, 548, 595, 626, 748, 826, 948, 1027, 1227, 1262, 1462, 1760, 1765, 1853, 1960, 1965, 2053, 2678, 2770, 2878, 2970, 3161, 3278, 3361, 3478, 3756, 3758, 3758, 3956]
const points = [318, 348, 395, 626, 748, 1027, 1262, 1760, 1765, 1853, 2678, 2770, 3161, 3278, 3756, 3758, 3758]

function Compteur(pos, points,indice) {
    let com = 0;
    for(var compt=indice;compt<pos.length;compt++)
   {
    
    
        if (pos[compt+indice] == points[compt]) {
            com+= 1;
        }
        else {
            break;
        }
        
   }
   return com;

}

let indice = 0;
let x;

while(indice < 5){
    x = Compteur(pos,points,indice);
    console.log(x);
   
    indice = indice +x;
    console.log(indice);

}

console.log(Compteur(pos, points,10));