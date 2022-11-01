import './index.css';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 ">
      <span className="loader"></span>
      <p className="text-xl font-bold text-center">
        No encuentro información sobre esta banda o artista. 🤔
      </p>
    </div>
  );
};

export default Loader;
