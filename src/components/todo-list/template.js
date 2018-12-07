import styles from './styles';

const template = `
    <style>
        ${styles}
    </style>

    <div id="todo-list">
        <slot name="todo-item"></slot>
    </div>

    <div id="header">
        <div id="collapse-btn"></div>
        <h1>
            <span id="count"></span>
            <span id="header-text">Items</span>
        </h1>
    </div>
    <div id="completed-list">
        <slot name="completed-item"></slot>
    </div>
`;

export default template;