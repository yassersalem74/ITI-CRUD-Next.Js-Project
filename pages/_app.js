import "@/styles/main.css";
import MainLayout from "@/components/mainLayout";
import 'bootstrap/dist/css/bootstrap.css'
export default function App({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
