// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START functions_helloworld_get]
const functions = require('@google-cloud/functions-framework');
const hotels = require("./data/hotels.json");

// Register an HTTP function with the Functions Framework that will be executed
// when you make an HTTP request to the deployed function's endpoint.
functions.http('helloGET', (req, res) => {
  res.send('Hello World!');
});

functions.http('hotelGET', (req, res) => {
  const query = req.query;
  if (!query.name) {
    res.status(400).send({ message: 'Missing name parameter' });
  }
  const hotels = require('./data/hotels.json');

  for (const hotelsKey in hotels) {
    if (hotels[hotelsKey] === query.name) {
      res.status(200).send({ hotel: hotels[hotelsKey] });
      return;
    }
  }

  res.status(404).send({ message: 'Hotel not found' });
});

functions.http('healt', (req, res) => {
  res.status(204).send();
});
// [END functions_helloworld_get]
