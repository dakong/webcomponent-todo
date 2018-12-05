import styles from './styles';

const template = `
    <style>
        ${styles}
    </style>

    <div id="header">
        <div id="collapse-btn"></div>
        <h1>
            <span id="count"></span>
            <span id="header-text">Items</span>
        </h1>
    </div>
    <div id="list">
        <slot name="item"></slot>
    </div>
`;

export default template;