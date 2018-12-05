import styles from './styles';

const template = `
    <div id="container">
        <style>
            ${styles}
        </style>
        <div id="checkbox" tabindex="0" aria-label="checkbox">
            <div id="checkmark"></div>
        </div>

        <div id="add" tabindex="-1">
        </div>

        <div id="checkbox-label">
            <input value=""/>
        </div>

        <div id="delete-icon" tabindex="0" aria-label="delete item"></div>
    </div>
`;

export default template;