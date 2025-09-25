import '../index.css'

export const Home = () => {
  return (
    <div className='hero-container'>
      <div className='hero-left'>
        <div className='hero-text-content'>
          <h1 className='hero-title'>
            Únete a una comunidad de deportistas que es apasionada, decidida y solidaria.
          </h1>

          <div className='image-small-container' />
        </div>
      </div>
      <div className='hero-right'>
        <img
          src='https://i.pinimg.com/474x/ae/1d/f7/ae1df7c238e6d190de5247a381cc719d.jpg'
          alt='Cancha de tenis moderna'
          className='image-large'
        />
      </div>
    </div>
  )
}
