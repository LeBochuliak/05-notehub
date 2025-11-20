import css from './App.module.css'
import { useState } from 'react';
import Product from '../Product/Product'
import Modal from "../Modal/Modal"
import OrderForm from '../OrderForm/OrderForm'
// import ReactPaginate from 'react-paginate';

// const myKey = import.meta.env.VITE_API_KEY;

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  // const [topic, setTopic] = useState('');
  // const [currentPage, setCurrentPage] = useState(1);

  // const { data, isLoading, isError, isSuccess } = useQuery({
  //   queryKey: ['articles', topic, currentPage],
  //   queryFn: () => fetchArticles(topic, currentPage),
  //   enabled: topic !== '',
  //   placeholderData: keepPreviousData,
  // });

  // const totalPages = data?.nbPages ?? 0;

  // const handleSearch = async (newTopic: string) => {
  //   setTopic(newTopic);
  //   setCurrentPage(1);
  // };

  return (
    <>
      <h1 className={css.title}>Products</h1>
      {/* <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        /> */}
      {/* {isLoading && <p>Loading data, please wait...</p>} */}
      {/* {isError && <p>Whoops, something went wrong! Please try again!</p>} */}
      <Product
        name="Tacos With Lime"
        imgUrl="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=640"
        price={10.99}
      />
      <Product
        name="Fries and Burger"
        imgUrl="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?w=640"
        price={14.29}
      />
      <OrderForm />
      <button onClick={openModal}>Open modal</button>
      {isModalOpen && <Modal onClose={closeModal}><h2>Custom Modal Content</h2>
          <p>This is a reusable modal with dynamic content.</p></Modal>}
    </>
  )
}

