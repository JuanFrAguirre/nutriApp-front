import { ToastContainer } from 'react-toastify';
import { Container } from './components/container/container';
import { Header } from './components/header/header';
import { Products } from './components/products/products';

export default function Home() {
  return (
    <>
      <Container>
        <Header />
        <Products />
      </Container>
    </>
  );
}
