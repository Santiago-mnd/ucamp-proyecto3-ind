import './index.css';

const Loader = () => {
  return (
    <div className="flex flex-col items-center">
      <span className="loader"></span>
      <p className="text-xl font-bold">
        No encuentro información sobre esta banda o artista. 🤔
      </p>
    </div>
  );
};

export default Loader;
