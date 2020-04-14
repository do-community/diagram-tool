class LineGenerator {
    _createContainer() {
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.top = "0";
        div.style.left = "0";
        div.style.overflow = "show";
        div.style.pointerEvents = "none";
        document.body.appendChild(div);
        return div;
    }

    _createInnerSvg(container) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("overflow", "visible");
        container.appendChild(svg);
        return svg;
    }

    _purgeLines() {
        if (this.lineDiv) this.lineDiv.remove();
    }

    drawLine(items) {
        this._purgeLines();
        if (!items) return;
        this.lineDiv = this._createContainer();
        const svg = this._createInnerSvg(this.lineDiv);
        for (const obj of items) {
            const {x1, x2, y1, y2} = obj;
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("stroke", "#000000");
            line.setAttribute("stroke-width", "1");
            line.setAttribute("x1", x1.toString());
            line.setAttribute("x2", x2.toString());
            line.setAttribute("y1", y1.toString());
            line.setAttribute("y2", y2.toString());
            svg.appendChild(line);
        }
    }
}

const instance = new LineGenerator();
export default instance.drawLine.bind(instance);
