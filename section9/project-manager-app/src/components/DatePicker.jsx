import './InputGroup.css';

const DatePicker = ({ label, value, onChange }) => {
    return (
        <div className='input-group'>
            <label>{label}</label>
            <input type='date' value={value} onChange={onChange} />
        </div>
    );
};

export default DatePicker;
