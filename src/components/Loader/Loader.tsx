import css from './Loader.module.css';
import { ClipLoader } from 'react-spinners';

export default function Loader() {
  return <div className={css.backdrop}><ClipLoader /></div>;
}