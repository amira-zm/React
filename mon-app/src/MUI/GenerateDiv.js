import React, { useEffect ,useState } from 'react';
import './Dialog.css';
import height from './Dialog';
import axios from "axios";

function axiosTest(x,ch) {
    return new Promise ((resolve,reject) => {
        axios.get('http://localhost:1337/activity-logs/')
    .then(response => {
        resolve(response.data[x][ch])
    }).catch(err => {
        reject(err.message)
    })
    })
}




export default function GenerateDiv(props) {
    const options = [];
    const colors = ['red', 'blue', 'yellow'];
    const [activityLogs, setActivityLogs] = useState()
    const [points, setPoints] = useState([])
    console.log({points});
    useEffect(async () => {
        try {
            const response = await axios.get('http://localhost:1337/activity-logs/');
            setActivityLogs(response.data);
            setPoints(response.data.map(item => item.currentPoint))
        } catch (error) {
            console.log({error});
        }
    }, [])





    console.log({activityLogs});
    // var marg = [1000,100,2000];
    var delais = [];
    //     axios.get('http://localhost:1337/activity-logs/').then(response => {
    //   for(var j=0 ;j<response.data.length;j++){
    //       const pos = marg.push(response.data[j]['currentPoint']);
    //       const delai = delais.push(response.data[j]['delay']);
    //   }

    // });
    // console.log(marg);
    // console.log(delais);
    // for(var j=0 ;j<17;j++){
    // axiosTest(j,'delay').then(result =>{
       
    //         //   const pos = marg.push(response.data[j]['currentPoint']);
    //           const delai = delais.push(result);
             
    // }).catch(error =>{
    //     console.log("error:",error);
    // })
    // }

    console.log('##########',axiosTest(1,'delay'));

    // for (var i = 0; i < 17; i++) {

    //     options.push(<div className="child1 child2" style={{ marginTop: marg[i], height: 200, background: 'red' }}></div>)


    // }

    return (<div>


        {points.map(item =>{
            return (
                <div className="child1 child2" style={{ marginTop: Number(item), height: 200, background: 'red' }}></div>

            )
        })}

    </div>)

}