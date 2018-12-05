const styles = `
    :host {
        display: inline-block;
        line-height: 0;
        color: #273444;
        width: 100%;

        position: relative;
    }

    :host([hidden]) {
        display: none;
    }

    #container {
        border-width: 1px 0 1px 0;
        border-style: solid;
        border-color: transparent;
        box-sizing: border-box;
    }

    #container:focus-within {
        border-color: #C0CCDA;
    }

    #checkbox {
        position: absolute;
        top: 50%;
        left: 1.6rem;
        margin-top: -0.6rem;
        width: 1.2rem;
        height: 1.2rem;

        box-sizing: border-box;
        border: solid #C0CCDA 0.1rem;
        border-radius: 0.2rem;
        background-color: #F9FAFC;
        cursor: pointer;
        z-index: 1000;

    }

    #add {
        position: absolute;
        top: 50%;
        left: 1.6rem;
        margin-top: -0.6rem;
        width: 1.2rem;
        height: 1.2rem;

        background: url('svg/plus25.svg') no-repeat center;
        color: #C0CCDA;
        box-sizing: border-box;
        border-radius: 0.2rem;
        cursor: pointer;
        z-index: 1000;
    }

    #checkbox:focus {
        outline: 0;
        border-color: #1F2D3D;
    }

    #checkmark {
        width: 100%;
        height: 100%;
        position: relative;
    }


    :host([checked]) #checkmark:after {
        content: '';
        position: absolute;
        box-sizing: border-box;
        display: block;

        width: 0.4rem;
        height: 0.7rem;
        left: 36%;
        bottom: 22%;

        border-width: 0 0.1rem 0.1rem 0;
        border-color: #273444;
        border-style: solid;

        transform-origin: center;
        transform: rotate(45deg);
    }

    :host(:not([state=new])) #add {
        display: none;
    }

    :host([state=new]) #checkbox {
        display: none;
    }

    :host([state=new]) #delete-icon {
        display: none;
    }

    #checkbox-label {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
        width: 100%;
        box-sizing: border-box;
        padding: .2rem 1.6rem .2rem 3.2rem;
    }

    :host([checked]) input {
        text-decoration: line-through;
    }

    input {
        font-size: 0.8rem;
        padding: 0.4rem 0.2rem;
        width: 100%;

        box-sizing: border-box;
        border-style: solid;
        border-color: #273444;
        border-width: 0;
    }

    input:focus {
        outline: 0;
    }

    #delete-icon:focus {
        outline: 1px solid #C0CCDA;
        outline-offset: 0.15rem;
    }

    :host([hover]) #delete-icon,
    #container:focus-within #delete-icon {
        cursor: pointer;
        top: 50%;
        right: 1.6rem;
        margin-top: -0.5rem;
        position: absolute;
        width: 1rem;
        height: 1rem;
        z-index: 0;
    }

    :host([hover]) #delete-icon:before,
    :host([hover]) #delete-icon:after,
    #container:focus-within #delete-icon:before,
    #container:focus-within #delete-icon:after {
        content: '';
        width: 0.1rem;
        height: 1.0rem;
        border-radius: 3px;
        background-color: #C0CCDA;
        position: absolute;
        left: 50%;
        margin-left: -0.06rem;
    }

    :host([hover]) #delete-icon:before,
    #container:focus-within #delete-icon:before {
        transform-origin: center;
        transform: rotate(45deg);
    }

    :host([hover]) #delete-icon:after,
    #container:focus-within #delete-icon:after {
        transform-origin: center;
        transform: rotate(-45deg);
    }
`;

export default styles;