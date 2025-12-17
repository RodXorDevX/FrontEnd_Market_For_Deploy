import '../assets/css/Register.css';
import { Link } from "react-router-dom";
import registerImg from '../assets/img/Register/Sale_image.jpg';
import { useState } from 'react';
import avatar1 from '../assets/img/avatares/perro.png';
import avatar2 from '../assets/img/avatares/gatito.png';
import avatar3 from '../assets/img/avatares/panda.png';
import avatar4 from '../assets/img/avatares/leon.png';
import avatar5 from '../assets/img/avatares/elefante.png';
import avatar6 from '../assets/img/avatares/caballo.png';
import avatar7 from '../assets/img/avatares/tucan.png';
import avatar8 from '../assets/img/avatares/pato.png';
import avatar9 from '../assets/img/avatares/delfin.png';
import avatar10 from '../assets/img/avatares/pinguino.png';
import avatar11 from '../assets/img/avatares/tortuga.png';
import avatar12 from '../assets/img/avatares/unicornio.png';
import avatar13 from '../assets/img/avatares/rata.png';
import avatar14 from '../assets/img/avatares/rana.png';
import avatar15 from '../assets/img/avatares/mono.png';
import avatar16 from '../assets/img/avatares/anaconda.png';
import avatar17 from '../assets/img/avatares/medusa.png';
import avatar18 from '../assets/img/avatares/erizo.png';
import avatar19 from '../assets/img/avatares/abeja.png';
import avatar20 from '../assets/img/avatares/pajaro.png';

import api from "../api";

const Register = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    direccion: '', // opcional
    avatar: ''
  });
  const [showMoreAvatars, setShowMoreAvatars] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarSelect = (avatar) => {
    setForm((prevForm) => ({
      ...prevForm,
      avatar: avatar  
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!form.nombre.trim()) {
      alert("Debes ingresar un nombre");
      return;
    }

    if (!form.email.trim()) {
      alert("Debes escribir un correo electrónico");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Debes escribir un correo válido");
      return;
    }
    

    if (!form.direccion.trim()) {
      alert("Debes escribir una dirección");
      return;
    }

    if (!form.password.trim()) {
      alert("Debes escribir una contraseña");
      return;
    }

    if (!form.avatar) {
      alert("Debes elegir un avatar");
      return;
    }

    try {
      const res = await api.post('/usuarios/registro', form);

      console.log('Usuario registrado:', res.data);
      window.location.href = '/login';
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error al registrar usuario. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="page-container">
      <div className="box">
        <div className="imagen-izquierda">
          <img src={registerImg} alt="Promo registro" loading="lazy" />
        </div>
        <div className="registro">
          <h1 className="text-wrapper-2">REGISTRO</h1>
          <label htmlFor="nombre" className="form-label">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            required
            className="input-field"
            autoComplete="name"
          />

          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
            className="input-field"
            autoComplete="email"
          />

          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
            className="input-field"
            autoComplete="new-password"
          />

          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            placeholder="Dirección"
            value={form.direccion}
            onChange={handleChange}
            required
            className="input-field"
            autoComplete="street-address"
          />

          <div className="avatar-selection">
            <legend>Selecciona un avatar:</legend>
            <div className="avatar-options">
              <img
                src={avatar1}
                alt="Perro"
                className={`avatar-option ${form.avatar === 'avatar1' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar1')}
              />
              <img
                src={avatar2}
                alt="Gatito"
                className={`avatar-option ${form.avatar === 'avatar2' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar2')}
              />
              <img
                src={avatar3}
                alt="Panda"
                className={`avatar-option ${form.avatar === 'avatar3' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar3')}
              />
              <img
                src={avatar4}
                alt="León"
                className={`avatar-option ${form.avatar === 'avatar4' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar4')}
              />
              <img
                src={avatar5}
                alt="Elefante"
                className={`avatar-option ${form.avatar === 'avatar5' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar5')}
              />

            <img
                src={avatar6}
                alt="Caballo"
                className={`avatar-option ${form.avatar === 'avatar6' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar6')}
              />
              <img
                src={avatar7}
                alt="Tucán"
                className={`avatar-option ${form.avatar === 'avatar7' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar7')}
              />
              <img
                src={avatar8}
                alt="Pato"
                className={`avatar-option ${form.avatar === 'avatar8' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar8')}
              />
              <img
                src={avatar9}
                alt="Delfín"
                className={`avatar-option ${form.avatar === 'avatar9' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar9')}
              />
              <img
                src={avatar10}
                alt="Pingüino"
                className={`avatar-option ${form.avatar === 'avatar10' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar10')}
              />
            </div>

            {/* Botón para mostrar más avatares */}
            <div className="avatar-toggle">
              <button
                type="button"
                className="avatar-toggle-btn"
                onClick={() => setShowMoreAvatars(!showMoreAvatars)}
              >
                {showMoreAvatars ? '− Mostrar menos' : '+ Mostrar más avatares'}
              </button>
            </div>

            {/* Avatares adicionales (expandidos) */}
            {showMoreAvatars && (
              <div className="avatar-options expanded">
                <img
                  src={avatar11}
                  alt="Tortuga"
                  className={`avatar-option ${form.avatar === 'avatar11' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar11')}
                />
                <img
                  src={avatar12}
                  alt="Unicornio"
                  className={`avatar-option ${form.avatar === 'avatar12' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar12')}
                />
                <img
                  src={avatar13}
                  alt="Rata"
                  className={`avatar-option ${form.avatar === 'avatar13' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar13')}
                />
                <img
                  src={avatar14}
                  alt="Rana"
                  className={`avatar-option ${form.avatar === 'avatar14' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar14')}
                />
                <img
                  src={avatar15}
                  alt="Mono"
                  className={`avatar-option ${form.avatar === 'avatar15' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar15')}
                />
                <img
                  src={avatar16}
                  alt="Anaconda"
                  className={`avatar-option ${form.avatar === 'avatar16' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar16')}
                />
                <img
                  src={avatar17}
                  alt="Medusa"
                  className={`avatar-option ${form.avatar === 'avatar17' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar17')}
                />
                <img
                  src={avatar18}
                  alt="Erizo"
                  className={`avatar-option ${form.avatar === 'avatar18' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar18')}
                />
                <img
                  src={avatar19}
                  alt="Abeja"
                  className={`avatar-option ${form.avatar === 'avatar19' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar19')}
                />
                <img
                  src={avatar20}
                  alt="Pájaro"
                  className={`avatar-option ${form.avatar === 'avatar20' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar20')}
                />
              </div>
            )}
          </div>

          <button type="button" onClick={handleSubmit} className="submit-btn">Registrarme</button>

          <p className="tienes-cuenta">
            <span className="span">¿Tienes cuenta? </span>
            <span className="text-wrapper-3"><Link to="/login" className="link-login">Ingresa aquí</Link></span> 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
