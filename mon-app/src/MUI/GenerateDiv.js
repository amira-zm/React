import React, { useEffect, useState } from 'react';
import './Dialog.css';
import height from './Dialog';
import axios from "axios";

function axiosTest(x, ch) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:1337/activity-logs/')
            .then(response => {
                resolve(response.data[x][ch])
            }).catch(err => {
                reject(err.message)
            })
    })
}

function tri(delais, points) {
    for (var i = delais.length - 1; i >= 0; i--) {
        //loop again through the array, moving backwards:
        for (var j = i; j >= 0; j--) {
            if (points[i] < points[j]) {
                var temp1 = delais[i];
                var temp = points[i];
                //var temp2 = heights[i];

                delais[i] = delais[j];
                points[i] = points[j];
                //heights[i] = heights[j];

                delais[j] = temp1;
                points[j] = temp;
                //heights[j] = temp2;

            };
        };
    };
}
function tri1(delais) {
    for (var i = delais.length - 1; i >= 0; i--) {
        //loop again through the array, moving backwards:
        for (var j = i; j >= 0; j--) {
            if (delais[i] < delais[j]) {
                var temp1 = delais[i];
                //var temp = points[i];
                //var temp2 = heights[i];

                delais[i] = delais[j];
                //points[i] = points[j];
                //heights[i] = heights[j];

                delais[j] = temp1;
                //points[j] = temp;
                //heights[j] = temp2;

            };
        };
    };
}


export default function GenerateDiv(props) {
    var c =0;
    const options = [];
    const colors = ['red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue'];
    const [points, setPoints] = useState([])
    const [delais, setDelais] = useState([])
    var heights = [];
    for (var j = 0; j < points.length; j++) {
        const h = heights.push(200);
    }


    useEffect(async () => {
        try {
            const response = await axios.get('http://localhost:1337/activity-logs/');

            setPoints(response.data.map(item => Number(item.currentPoint)));
            setDelais(response.data.map(item => Number(item['delay'])));

        } catch (error) {
            console.log({ error });
        }
    }, [])

    var l = points.length;
    var k = 0;
    var pos = [];
    var heigh = [];
    var del = [];
    var k1 = 0;

   
    tri(delais, points)
    console.log({ delais });
    
    do {

        c=0
        var x = true;
        k1 = k;
        // var somme = 0;
        
        // for (var x = 0; x <  (2 * compteur) - 1; x++) {
        //     const s = del.push(0);
        // }
        // console.log('vb', del)
        // for (var m = 0, t =   (2 * compteur) - 1; m <  ((2 * compteur) - 1) / 2, t >  ((2 * compteur) - 1) / 2; m++, t--) {
        //     somme += delais[m];
        //     console.log('indices', m, t - 1)
        //     if ((t - 1) != m) {

        //         del.splice(m, 1, somme);
        //         console.log('yes')
        //         del.splice(t - 1, 1, somme);

        //     }
        //     else {
        //         del.splice(m, 1, somme);
        //     }

        // }





        do {

            console.log({ c });
            if (points[k1] < (points[k] + 200)) {
                
                
                var pos1 = pos.push(points[k1]);
                pos1 = pos.push(points[k1] + 200)
                tri1(pos);
                k1++;
                
            }
            else {
                x = false;
                                

            }
            k += 1;
        } while (x == true);
        
        
    } while (k <= l);
    
    console.log({ points });
    console.log({ pos });

    for (var y = 1; y < pos.length; y++) {
        //console.log(y);
        var h1 = heigh.push(pos[y] - pos[y - 1]);

    }

    console.log({ del });


var compt=0;
let com=0;
do{if(pos[compt]==points[compt]){
    com+=1;
}
else{
    console.log('+++++++++++++++++++',com);
    
}
compt++;
}while(compt<34)







    for (var i = 0; i < pos.length; i++) {

        options.push(<div className="child1 child2" style={{ marginTop: Number(pos[i]), height: heigh[i], background: colors[i] }}></div>)


    }
    return (
        <div>
            {options}
        </div>)

}