import Image from 'next/image';
import ViewSource from '../components/view-source';
import mountains from '../public/mountains.jpg';

const Fill = () => (
  <div>
    <ViewSource pathname="pages/fill.tsx" />
    <h1>Image Component With Layout Fill</h1>
    <h2>Cover</h2>
    {/* <div style={{ position: 'relative', width: '300px', height: '500px' }}> */}
    <Image
      alt="Mountains"
      src={'https://picsum.photos/200/300'}
      // fill
      width={300}
      height={300}
      sizes="100vw"
      style={{
        objectFit: 'cover',
      }}
    />
    {/* </div> */}
    <h2>img contain</h2>
    <img src={'https://picsum.photos/200/300'}></img>
    <h2>Contain</h2>
    {/* <div style={{ position: 'relative', width: '300px', height: '500px' }}> */}
    <Image
      alt="Mountains"
      src={mountains}
      // fill
      sizes="100vw"
      style={{
        objectFit: 'contain',
      }}
    />
    {/* </div> */}
    <h2>None</h2>
    {/* <div style={{ position: 'relative', width: '300px', height: '500px' }}> */}
    <Image
      alt="Mountains"
      src={mountains}
      // quality={100}
      // fill
      sizes="100vw"
      style={{
        objectFit: 'none',
      }}
    />
    {/* </div> */}
    <h2>size 50</h2>
    <div style={{ position: 'relative', width: '300px', height: '500px' }}>
      <Image
        alt="Mountains"
        src={mountains}
        // quality={100}

        // fill
        sizes="50vw"
        style={{
          objectFit: 'none',
        }}
      />
    </div>
  </div>
);

export default Fill;
