import { Container } from '@nutriApp/components/container/container';
import { Header } from '@nutriApp/components/header/header';
import { AddProduct } from '@nutriApp/components/products/addProduct';

const Page = () => {
  return (
    <>
      <Container>
        <Header />
        <AddProduct />
      </Container>
    </>
  );
};

export default Page;
