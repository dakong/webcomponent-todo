const styles = `
    :host {
        display: block;
        color: #273444;
    }

    :host([hidden]) {
        display: none;
    }

    :host([hide-header]) #header{
        display: none;
    }

    h1 {
        padding: 0.8rem 1.6rem 0.8rem 3.2rem;
        margin: 0;
        font-size: 1.0rem;
        display: inline-block;
    }

    #header {
        position: relative;
        cursor: pointer;
        user-select: none;
    }

    #collapse-btn {
        position: absolute;
        width: 1.2rem;
        height: 1.2rem;
        top: 50%;
        margin-top: -0.6rem;
        left: 1.6rem;
        box-sizing: border-box;
    }

    #collapse-btn::after {
        content: '';
        position: absolute;
        height: 1.2rem;
        width: 1.2rem;
        background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTBweCIgaGVpZ2h0PSI2cHgiIHZpZXdCb3g9IjAgMCAxMCA2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0OC4yICg0NzMyNykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+Y2hldnJvbjIxPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImNoZXZyb24yMSIgZmlsbD0iIzI3MzQ0NCI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik05Ljc5Nzc3Nzc4LDAuNjg0MDc1IEw5LjMxMjkzNjUxLDAuMjI1NzUgQzkuMTQ0ODQxMjcsMC4wNzUwNzUgOC45NDg2NTA3OSwtMC4wMDAzIDguNzI0NjAzMTcsLTAuMDAwMyBDOC40OTYwMzE3NSwtMC4wMDAzIDguMzAyMDYzNDksMC4wNzUwNzUgOC4xNDI1Mzk2OCwwLjIyNTc1IEw1LDMuMTk1NTI1IEwxLjg1NzQ2MDMyLDAuMjI1ODI1IEMxLjY5NzkzNjUxLDAuMDc1MTUgMS41MDM5NjgyNSwtMC4wMDAyMjUgMS4yNzU0NzYxOSwtMC4wMDAyMjUgQzEuMDUxMzQ5MjEsLTAuMDAwMjI1IDAuODU1MTU4NzMsMC4wNzUxNSAwLjY4NzA2MzQ5MiwwLjIyNTgyNSBMMC4yMDg1NzE0MjksMC42ODQxNSBDMC4wNDQ3NjE5MDQ4LDAuODM4ODc1IC0wLjAzNzE0Mjg1NzEsMS4wMjQyNzUgLTAuMDM3MTQyODU3MSwxLjI0MDIgQy0wLjAzNzE0Mjg1NzEsMS40NjAxNzUgMC4wNDQ4NDEyNjk4LDEuNjQzNDc1IDAuMjA4NTcxNDI5LDEuNzkwMSBMNC40MTgwMTU4Nyw1Ljc2ODAyNSBDNC41NzMyNTM5Nyw1LjkyMjgyNSA0Ljc2NzE0Mjg2LDYuMDAwMjI1IDUsNi4wMDAyMjUgQzUuMjI4NDkyMDYsNi4wMDAyMjUgNS40MjQ2MDMxNyw1LjkyMjgyNSA1LjU4ODMzMzMzLDUuNzY4MDI1IEw5Ljc5Nzc3Nzc4LDEuNzkwMSBDOS45NTczMDE1OSwxLjYzOTM1IDEwLjAzNzE0MjksMS40NTYwNSAxMC4wMzcxNDI5LDEuMjQwMiBDMTAuMDM3MTQyOSwxLjAyODMyNSA5Ljk1NzMwMTU5LDAuODQzIDkuNzk3Nzc3NzgsMC42ODQwNzUgTDkuNzk3Nzc3NzgsMC42ODQwNzUgWiIgaWQ9IlNoYXBlIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=) no-repeat center;
    }

    :host([collapsed]) #collapse-btn:after {
        transform: rotate(-90deg);
    }

    :host([collapsed]) #completed-list {
        display: none;
    }

    .hidden {
        display: none;
    }
`;

export default styles;