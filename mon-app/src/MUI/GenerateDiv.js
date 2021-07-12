import React from 'react';
import './Dialog.css';
import height from './Dialog';
import axios from "axios";
function axiosTest() {
    return axios.get('http://localhost:1337/activity-logs/').then(response => response.data.query.answer


    )


}

export default function GenerateDiv(props) {
    const options = [];
    const colors = ['red', 'blue', 'yellow'];



    var marg = [];
    var delais = [];
    //     axios.get('http://localhost:1337/activity-logs/').then(response => {
    //   for(var j=0 ;j<response.data.length;j++){
    //       const pos = marg.push(response.data[j]['currentPoint']);
    //       const delai = delais.push(response.data[j]['delay']);
    //   }

    // });
    // console.log(marg);
    // console.log(delais);
    // console.log('******************',axiosTest(1));
    //   for(var j=0 ;j<17;j++){
    //     //   const pos = marg.push(response.data[j]['currentPoint']);
    //       const delai = delais.push(axiosTest());
    //   }
    const promise = axiosTest().resolve(1);

    const onFulfilled = () => { };
    const onRejected = () => { };

    // JavaScript will call `onFulfilled` if the promise is fulfilled,
    // and `onRejected` if the promise is rejected.
    promise.then(onFulfilled, onRejected);
    console.log(promise);
    console.log(delais);

    for (var i = 0; i < marg.length; i++) {

        options.push(<div className="child1 child2" style={{ marginTop: marg[i], height: 200, background: 'red' }}></div>)


    }
    return (<div>


        {options}

    </div>)

}