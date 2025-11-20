import css from './Product.module.css';

interface ProductProps {
  name: string;
  imgUrl: string;
  price: number;
};


export default function Product({ name, imgUrl, price }: ProductProps) {
  return (
    <div>
      <h2 className={css.title}>{name}</h2>
			<img src={imgUrl} alt={name} width="320" />
			<p>Price: {price} credits</p>
    </div>
  );
}
