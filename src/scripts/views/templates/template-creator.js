/* eslint-disable camelcase */
import CONFIG from '../../global/config';

const createTotalContainerTemplate = ({
  income = 0, cash = 0, balance = 0, month, year,
}) => `
    <div class="row">
        <div class="col s4 total-item">
            <span>Income</span>
            <span class="value orange-text text-accent-3" id="income">${income < CONFIG.TRANSACTION_LIMIT ? income : `${CONFIG.TRANSACTION_LIMIT}+`}</span>
        </div>

        <div class="col s4 total-item">
            <span>Cash</span>
            <span class="value pink-text text-accent-3" id="cash">${cash < CONFIG.TRANSACTION_LIMIT ? cash : `${CONFIG.TRANSACTION_LIMIT}+`}</span>
            <vr />
        </div>

        <div class="col s4 total-item">
            <span>Balance</span>
            <span class="value green-text text-accent-3" id="balance">${balance < CONFIG.TRANSACTION_LIMIT ? balance : `${CONFIG.TRANSACTION_LIMIT}+`}</span>
        </div>
    </div>

    <hr>

    <span class="date">${month} - ${year}</span>
`;

const createListItemTemplate = ({
  month, date, year, balance,
}) => `
    <div class="card white">
        <div class="card-content">
            <div class="row header">
                <span class="col s5 date">${month} ${date}, ${year}</span>
                <span class="col s7 balance">Balance : ${balance}</span>
                <hr class="col s12">
            </div>
        </div>
    </div>
`;

const createTransactionItemTemplate = ({
  id, type, name, credit,
}) => `
    <a href=#/detail/${id}>
        <div class="detail">
            <div class="detail-item">
                <div class="detail-icon ${type.toLowerCase() === 'income' ? 'blue' : 'pink'} accent-2 white-text">
                    <i class="material-icons" aria-label="${type.toLowerCase() === 'income' ? 'Income' : 'Cash'}">${type.toLowerCase() === 'income' ? 'add' : 'remove'}</i>
                </div>

                <span class="detail-name">${name.length <= 15 ? name : `${name.slice(0, 11)} ...`}</span>
            </div>

            <span class="detail-value">${credit}</span>
        </div>
    </a>
`;

const createDetailItemTemplate = ({
  name, credit, full_date, type, id,
}) => `
    <div class="card white col s12 m8 l6 offset-m2 offset-l3">
        <div class="card-content">
            <div class="row">
                <div class="col s3">
                    <span>Name</span>
                </div>
                <div class="col s1">
                    <span>:</span>
                </div>
                <div class="col s8">
                    <span class="name">${name.length <= 15 ? name : `${name.slice(0, 11)} ...`}</span>
                </div>

                <div class="col s3">
                    <span>Credit</span>
                </div>
                <div class="col s1">
                    <span>:</span>
                </div>
                <div class="col s8">
                    <span class="credit">${credit}</span>
                </div>

                <div class="col s3">
                    <span>Date</span>
                </div>
                <div class="col s1">
                    <span>:</span>
                </div>
                <div class="col s8">
                    <span class="full-date">${full_date}</span>
                </div>

                <div class="col s3">
                    <span>Type</span>
                </div>
                <div class="col s1">
                    <span>:</span>
                </div>
                <div class="col s8">
                    <span class="type">${type}</span>
                </div>
            </div>
        </div>

        <div class="card-action">
            <a href="#/edit/${id}">
                <button class="waves-effect waves-light yellow darken-2 btn" id="edit" aria-label="Edit transaction">
                    <i class="material-icons left" aria-label="Edit transaction">edit</i>Edit
                </button>
            </a>

            <button class="waves-effect waves-light red darken-2 btn" id="delete" aria-label="Delet transaction">
                <i class="material-icons left" aria-label="Delete transaction">delete</i>Delete
            </button>
        </div>
    </div>
`;

const createBalanceTotalTemplate = (total) => `
    <span class="title">Balance Total <hr></span>

    <div class="circle total-container">
        <span>Balance :</span>
        <span class="balance-total">${total < CONFIG.TRANSACTION_LIMIT ? total : `${CONFIG.TRANSACTION_LIMIT}+`}</span>
    </div>
`;

const createMonthBalanceTemplate = (month, balance) => `
    <div class="detail">
        <div class="detail-item">
            <div class="detail-icon yellow darken-3 white-text">
                <i class="material-icons" aria-label="Balance">attach_money</i>
            </div>

            <span class="detail-name">${month}</span>
        </div>

        <span class="detail-value">
            ${balance < CONFIG.TRANSACTION_LIMIT ? balance : `${CONFIG.TRANSACTION_LIMIT}+`}
        </span>
    </div>
`;

export {
  createTotalContainerTemplate,
  createListItemTemplate,
  createTransactionItemTemplate,
  createDetailItemTemplate,
  createBalanceTotalTemplate,
  createMonthBalanceTemplate,
};
