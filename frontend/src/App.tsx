
import './App.css';
import Home from './Pages/home';
import Foot from './Pages/foot';
import Header from './Pages/header';
import Article from './Pages/article';
import Articles from './Pages/articles';
import Documentation from './Pages/documentation';
import Bio from './Pages/bio';
import Bios from './Pages/bios';
import { Routes, Route } from "react-router-dom";
import Project from './Pages/project';
import Projects from './Pages/projects';
import Book from './Pages/book';
import Chapter from './Pages/chapter';
import Admin from './admin';
import Message from './Pages/message';
import Manifest from './Pages/manifest';
import Manifiesto from './Pages/manifiesto';
import Plataformas from './Pages/plataformas';
import Labs from './Pages/labs';
import Acerca from './Pages/acerca';
import Chatbot from './Pages/chatbot';
import DesignSystemDemo from './Pages/design-system-demo';
import Document from './Pages/document'; // Ensure this import is correct
import ExamplePage from './assets/example';
import Products from './Pages/products';
import Product from './Pages/product';
import Harmonia from './Pages/harmonia';
import EthicsI from './Pages/ethicsi';
import InnvaLab from './Pages/innvalab';
import IdeasPage from './Pages/ideas';
import IdeaPage from './Pages/idea';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="app-main">
     
        {/* El router principal se encarga de gestionar las rutas de la aplicación y renderizar los componentes correspondientes */}  
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/document/:id" element={<Document />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/bios" element={<Bios />} />
          <Route path="/bio/:name" element={<Bio />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:name" element={<Project />} />
          <Route path="/book" element={<Book />} />
          <Route path="/chapter/:name" element={<Chapter />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/message" element={<Message />} />
          <Route path="/manifest" element={<Manifest />} />
          <Route path="/manifiesto" element={<Manifiesto />} />
          <Route path="/plataformas" element={<Plataformas />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/acerca" element={<Acerca />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/design-system" element={<DesignSystemDemo />} />
          <Route path="/example" element={<ExamplePage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:name" element={<Product />} />
          <Route path="/harmonia" element={<Harmonia />} />
          <Route path="/ethicsi" element={<EthicsI />} />
          <Route path="/innvalab" element={<InnvaLab />} />
          <Route path="/ideas" element={<IdeasPage />} />
          <Route path="/idea/:name" element={<IdeaPage />} />
          <Route path="/plataformas/harmonia" element={<Harmonia />} />
          <Route path="/plataformas/ethicsi" element={<EthicsI />} />
          <Route path="/plataformas/innvalab" element={<InnvaLab />} />

        </Routes>
      </main>
      <Foot />
    </div>
  )
}

export default App
