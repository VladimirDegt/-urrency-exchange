import { RiExchangeDollarFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { fetchChangeCurrency } from 'reduxState/thunk';
import styles from './ExchangeForm.module.css';

export const ExchangeForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const { value } = e.target.elements.currency;
    const [amount, from, , to] = value.split(' ');
    dispatch(fetchChangeCurrency({ amount, from, to }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        title="Request format 15 USD in UAH"
        className={styles.input}
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder="15 USD in UAH"
        name="currency"
        defaultValue="15 USD in UAH"
      />
    </form>
  );
};
