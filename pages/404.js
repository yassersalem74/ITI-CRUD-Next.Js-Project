import Image from 'next/image';
import errorPic from '../public/404.png';
import { useRouter } from 'next/router';
import  Button  from 'react-bootstrap/Button';

export default function Custom404() {
    const router = useRouter();
  return (
    <div className='fullscreen-container'>
      <div className="image-container">
        <Image className='error-image'
          src={errorPic}
          layout="responsive"
          alt="Not Found Page"
        />
      <Button  onClick={() => router.push(`/posts/`)} >Go Back</Button>

      </div>
    </div>
  );
}
