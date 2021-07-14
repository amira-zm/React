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

function tri(delais, points, heights) {
    for (var i = delais.length - 1; i >= 0; i--) {
        //loop again through the array, moving backwards:
        for (var j = i; j >= 0; j--) {
            if (points[i] < points[j]) {
                var temp1 = delais[i];
                var temp = points[i];
                var temp2 = heights[i];

                delais[i] = delais[j];
                points[i] = points[j];
                heights[i] = heights[j];

                delais[j] = temp1;
                points[j] = temp;
                heights[j] = temp2;

            };
        };
    };
}


export default function GenerateDiv(props) {
    const options = [];
    const colors = ['red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'blue'];

    const [points, setPoints] = useState([])
    const [delais, setDelais] = useState([])
    var heights = [];
    for (var j = 0; j < points.length; j++) {
        const h = heights.push(200);
    }
    tri(delais, points, heights);

    useEffect(async () => {
        try {
            const response = await axios.get('http://localhost:1337/activity-logs/');

            setPoints(response.data.map(item => Number(item.currentPoint)));
            setDelais(response.data.map(item => Number(item['delay'])));
            
            var i = 0;
            const l = points.lenght;
            while (i < l) {
                if (points[i + 1] < (points[i]+ 200)) {

                    points.splice(i + 2, 0, (points[i + 1]) + 200);
                    console.log('###');

                    const d = delais.push(delais[i + 1]);
                    delais.splice(i + 1, 1, delais[i] + delais[i + 1]);
                    heights.splice(i, 1, points[i + 1] - points[i]);
                    heights.splice(i, 1, (points[i] + 200) - points[i + 1]);
                    const h = heights.push((points[i + 1] + 200) - (points[i] + 200));
                    tri(delais, points, heights);
                    l += 1;
                    console.log(l);
                    

                }

                i += 1;
            }

        } catch (error) {
            console.log({ error });
        }
    }, [])

    console.log({ points });

    // tri(delais,points);


    // // var heights = [];
    // // var positions=[];
    // // var delays=[];
    // // for (var i = 0; i < points.length-1; i++) {

    // //     if (Number(points[i+1])<Number(points[i])+200){
    // //         const p =positions.push(points[i]);
    // //         const d=delays.push(Number(delais[i]));
    // //         const h=heights.push(Number(points[i+1])-Number(points[i]));
    // //         const p1 =positions.push(points[i+1]);
    // //         const d1=delays.push(Number(delais[i])+Number(delais[i+1]));
    // //         const h1=heights.push(200-(Number(points[i+1])-Number(points[i])));


    // //     }
    // //     else{
    // //         const p =positions.push(points[i]);
    // //         const d=delays.push(Number(delais[i]));
    // //         const h=heights.push(200);

    // //     }
    // // }
    // var i=0;
























    for (var i = 0; i < points.length; i++) {

        options.push(<div className="child1 child2" style={{ marginTop: Number(points[i]), height: heights[i], background: colors[i] }}></div>)


    }
    return (
        <div>
            {options}
        </div>)

}