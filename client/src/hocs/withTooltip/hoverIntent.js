
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
        this.destroy = this.destroy.bind(this);

        this._elem.addEventListener("mouseover", this.onMouseOver);

        this._elem.addEventListener("mouseout", this.onMouseOut);

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
        let left = coords.left + 5;
        if (left < 0) left = 0;
        this._toolTip.setLeft(left);
        
        let top = coords.top - 40;

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
        console.log('destroyed')
          this._elem.removeEventListener('mousemove', this.onMouseMove);
          this._elem.removeEventListener('mouseover', this.onMouseOver);
          this._elem.removeEventListener('mouseout', this.onMouseOut);
    }

}