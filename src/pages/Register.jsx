import '../assets/css/Register.css';
import { Link } from "react-router-dom";
import registerImg from '../assets/img/Register/Sale_image.jpg';
import { useState } from 'react';
import avatar1 from '../assets/img/Register/icon1.png';
import avatar2 from '../assets/img/Register/icon2.png';
import avatar3 from '../assets/img/Register/icon3.png';
import avatar4 from '../assets/img/Register/icon4.png';
import avatar5 from '../assets/img/Register/icon5.png';
import avatar6 from '../assets/img/Register/icon6.png';
import avatar7 from '../assets/img/Register/avatar7.svg'; // Oso
import avatar8 from '../assets/img/Register/avatar8.svg'; // Ave
import avatar9 from '../assets/img/Register/avatar9.svg'; // Delfín
import avatar10 from '../assets/img/Register/avatar10.svg'; // Conejo
import avatar11 from '../assets/img/Register/avatar11.svg'; // León
import avatar12 from '../assets/img/Register/avatar12.svg'; // Zorro
import avatar13 from '../assets/img/Register/avatar13.svg'; // Elefante
import avatar14 from '../assets/img/Register/avatar14.svg'; // Tigre
import avatar15 from '../assets/img/Register/avatar15.svg'; // Panda
import avatar16 from '../assets/img/Register/avatar16.svg'; // Canguro
import avatar17 from '../assets/img/Register/avatar17.svg'; // Tortuga
import avatar18 from '../assets/img/Register/avatar18.svg'; // Hipopótamo
import avatar19 from '../assets/img/Register/avatar19.svg'; // Suri (Alpaca)
import avatar20 from '../assets/img/Register/avatar20.svg'; // Jirafa

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
                alt="Avatar 1"
                className={`avatar-option ${form.avatar === 'avatar1' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar1')}
              />
              <img
                src={avatar2}
                alt="Avatar 2"
                className={`avatar-option ${form.avatar === 'avatar2' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar2')}
              />
              <img
                src={avatar3}
                alt="Avatar 3"
                className={`avatar-option ${form.avatar === 'avatar3' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar3')}
              />
              <img
                src={avatar4}
                alt="Avatar 4"
                className={`avatar-option ${form.avatar === 'avatar4' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar4')}
              />

  <img
                src={avatar5}
                alt="Avatar 5"
                className={`avatar-option ${form.avatar === 'avatar5' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar5')}
              />

<img
                src={avatar6}
                alt="Avatar 6"
                className={`avatar-option ${form.avatar === 'avatar6' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar6')}
              />
              <img
                src={avatar7}
                alt="Oso"
                className={`avatar-option ${form.avatar === 'avatar7' ? 'selected' : ''}`}
                onClick={() => handleAvatarSelect('avatar7')}
              />
              <img
                src={avatar8}
                alt="Ave"
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
                alt="Conejo"
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
                  alt="León"
                  className={`avatar-option ${form.avatar === 'avatar11' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar11')}
                />
                <img
                  src={avatar12}
                  alt="Zorro"
                  className={`avatar-option ${form.avatar === 'avatar12' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar12')}
                />
                <img
                  src={avatar13}
                  alt="Elefante"
                  className={`avatar-option ${form.avatar === 'avatar13' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar13')}
                />
                <img
                  src={avatar14}
                  alt="Tigre"
                  className={`avatar-option ${form.avatar === 'avatar14' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar14')}
                />
                <img
                  src={avatar15}
                  alt="Panda"
                  className={`avatar-option ${form.avatar === 'avatar15' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar15')}
                />
                <img
                  src={avatar16}
                  alt="Canguro"
                  className={`avatar-option ${form.avatar === 'avatar16' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar16')}
                />
                <img
                  src={avatar17}
                  alt="Tortuga"
                  className={`avatar-option ${form.avatar === 'avatar17' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar17')}
                />
                <img
                  src={avatar18}
                  alt="Hipopótamo"
                  className={`avatar-option ${form.avatar === 'avatar18' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar18')}
                />
                <img
                  src={avatar19}
                  alt="Suri"
                  className={`avatar-option ${form.avatar === 'avatar19' ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect('avatar19')}
                />
                <img
                  src={avatar20}
                  alt="Jirafa"
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
