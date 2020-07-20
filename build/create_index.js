
/* Copyright 2020 DigitalOcean
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

// Loads in all dependancies initially.
const fs = require("fs");
const posthtml = require("posthtml");

// Compile the base HTML.
const compile = posthtml()
    .use(require("posthtml-extend")())
    .use(require("posthtml-custom-elements")())
    .process(fs.readFileSync(`./base_extensions${process.env.NODE_ENV === 'development' ? '.dev' : ''}.html`), { sync: true })
    .html;

// Write the HTML.
fs.writeFileSync("./dist/index.html", compile);
