import React from 'react';

export default async function test() {
    const data = await fetchData();
    await fetchData();
    const a = <div>222222222</div>;
}

const f = async function() {
    const data = await fetchData();
    await fetchData();
}

function fetchData() {
    console.log(e);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('success!')
        });
    });
}