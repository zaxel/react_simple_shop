﻿
export class HoverIntent {
    constructor({
        sensitivity = 0.1, // if speed slower then ...px/ms means cursor on element
        interval = 500,    // change speed every ...ms 
        elem,
        toolTip,
        text
    }) {
        this._sensitivity = sensitivity;
        this._interval = interval;
        this._elem = elem;
        this._toolTip = toolTip;
        this._text = text;

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);

        this.trackSpeed = this.trackSpeed.bind(this);
        this.over = this.over.bind(this);
        this.out = this.out.bind(this);

        this._elem.addEventListener("mouseover", this.onMouseOver);

        this._elem.addEventListener("mouseout", this.onMouseOut);

        console.log(this._text)
    }
    onMouseOver(event) {

        if (this.isOverElement) {
            return;
        }

        this.isOverElement = true;
        this.prevX = event.pageX;
        this.prevY = event.pageY;
        this.prevTime = Date.now();
        this._elem.addEventListener('mousemove', this.onMouseMove);
        this.checkSpeedInterval = setInterval(this.trackSpeed, this._interval);
    }

    onMouseOut(event) {
        if (!event.relatedTarget || !this._elem.contains(event.relatedTarget)) {
            this.isOverElement = false;
            this._elem.removeEventListener('mousemove', this.onMouseMove);
            clearInterval(this.checkSpeedInterval);
            if (this.isHover) {
                this.out.call(this._elem, event);
                this.isHover = false;
            }
        }
    }

    onMouseMove(event) {
        this.lastX = event.pageX;
        this.lastY = event.pageY;
        this.lastTime = Date.now();
    }

    trackSpeed() {
        let speed;
        if (!this.lastTime || this.lastTime == this.prevTime) {
            speed = 0;
        } else {
            speed = Math.sqrt(
                Math.pow(this.prevX - this.lastX, 2) +
                Math.pow(this.prevY - this.lastY, 2)
            ) / (this.lastTime - this.prevTime);
        }

        if (speed < this._sensitivity) {
            clearInterval(this.checkSpeedInterval);
            this.isHover = true;
            this.over.call(this._elem);
        } else {
            this.prevX = this.lastX;
            this.prevY = this.lastY;
            this.prevTime = this.lastTime;
        }
    }

    over() {
        this._toolTip.setToolTipText(this._text);
        let coords = this._elem.getBoundingClientRect();
        this._toolTip.setTop(coords.top + 5);
        let left = coords.left + (this._elem.offsetWidth - this._toolTip.offsetWidth) / 2;
        if (left < 0) left = 0;
        this._toolTip.setLeft(left);
        let top = coords.top - this._toolTip.offsetHeight - 5;

        if (top < 0) { 
            top = coords.bottom + window.pageYOffset + 5;
        }
        this._toolTip.setTop(top);
        this._toolTip.setIsToolTipShown(true);
    }

    out() {
        this._toolTip.setToolTipText('');
        this._toolTip.setIsToolTipShown(false);
    }

    destroy() {
        //   elem.removeEventListener('mousemove', this.onMouseMove);
        //   elem.removeEventListener('mouseover', this.onMouseOver);
        //   elem.removeEventListener('mouseout', this.onMouseOut);
    }

}