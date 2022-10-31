import './index.css';

const Loader = () => {
  return (
    <div className="flex flex-col items-center">
      <span className="loader"></span>
      <p className="text-xl font-bold">
        ¿Está bien escrito el nombre del artista? 🤔
      </p>
    </div>
  );
};

export default Loader;
