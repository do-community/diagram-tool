/*
Copyright 2020 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

class LineGenerator {
    _createContainer() {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.top = '0';
        div.style.left = '0';
        div.style.overflow = 'show';
        div.style.pointerEvents = 'none';
        document.body.appendChild(div);
        return div;
    }

    _createInnerSvg(container) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('overflow', 'visible');
        container.appendChild(svg);
        return svg;
    }

    _purgeLines() {
        if (this.lineDiv) this.lineDiv.remove();
        if (this.eventHandler) window.removeEventListener('resize', this.eventHandler);
    }

    drawLine(obj) {
        // Handle the initialisation of the lines.
        this._purgeLines();
        if (!obj) return;
        this.lineDiv = this._createContainer();
        const svg = this._createInnerSvg(this.lineDiv);
        const {x, y} = obj;
        
        // Draw the X line.
        const xLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        xLine.setAttribute('stroke', '#000000');
        xLine.setAttribute('stroke-width', '1');
        xLine.setAttribute('x1', '0');
        xLine.setAttribute('x2', `${window.innerWidth}`);
        xLine.setAttribute('y1', `${y}`);
        xLine.setAttribute('y2', `${y}`);
        svg.appendChild(xLine);

        // Draw the Y line.
        const yLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        yLine.setAttribute('stroke', '#000000');
        yLine.setAttribute('stroke-width', '1');
        yLine.setAttribute('x1', `${x}`);
        yLine.setAttribute('x2', `${x}`);
        yLine.setAttribute('y1', '0');
        yLine.setAttribute('y2', `${window.innerHeight}`);
        svg.appendChild(yLine);

        // Create the event handler.
        this.eventHandler = () => this.drawLine(obj);
        window.addEventListener('resize', this.eventHandler);
    }
}

const instance = new LineGenerator();
export default instance.drawLine.bind(instance);
