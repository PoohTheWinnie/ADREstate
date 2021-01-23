// import React, { Component } from 'react';
// import {
//     Container,
//     Card,
//     CardBody,
//     CardText,
//     CardTitle,
//     CardSubtitle,
//     Button,
//     Input,
//     CardGroup,
// } from 'reactstrap';
// const tf = require('@tensorflow/tfjs');
// require('@tensorflow/tfjs-node');

// // const csvUrl =
// // 'https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/boston-housing-train.csv';
// const csvUrl = "file://./data.csv"


// async function run() {
// // We want to predict the column "medv", which represents a median value of
// // a home (in $1000s), so we mark it as a label.
//     const csvDataset = tf.data.csv(
//         csvUrl, {
//         columnConfigs: {
//             price: {
//             isLabel: true
//             }
//         }
//     });
        
//     // Number of features is the number of column names minus one for the label
//     // column.
//     const numOfFeatures = (await csvDataset.columnNames()).length - 1;
//     console.log(csvDataset.columnNames());
//     // Prepare the Dataset for training.
//     const flattenedDataset =
//         csvDataset
//         .map(({xs, ys}) =>
//         {
//             // Convert xs(features) and ys(labels) from object form (keyed by
//             // column name) to array form.
//             console.log(xs);
//             console.log(ys);
//             return {xs:Object.values(xs), ys:Object.values(ys)};
//         })
//         .batch(10);

//     // Define the model.
//     const model = tf.sequential();
//     model.add(tf.layers.dense({
//         inputShape: [numOfFeatures],
//         units: 1,
//     }));
//     // model.add(tf.layers.dense({
//     //     units:1, 
//     //     activation: 'softmax'
//     // }));
//     model.compile({
//         optimizer: 'sgd', 
//         loss: 'binaryCrossentropy', 
//         lr:1
//     });

//     // Fit the model using the prepared Dataset
//     await model.fitDataset(flattenedDataset, {
//         epochs: 10,
//         callbacks: {
//         onEpochEnd: async (epoch, logs) => {
//             console.log(epoch + ':' + logs.loss);
//         }
//         }
//     });
//     // let test = tf.tensor2d([[0.26169, 0, 9.9, 0, 0.544, 6.023, 90.4, 2.834, 4, 304, 18.4, 11.72]])
//     let test = tf.tensor2d([[3,1.5,1340,7912,1.5,0,0,3],[5,2.5,3650,9050,2,0,4,5]])
//     model.predict(test).print();
// }

// run();