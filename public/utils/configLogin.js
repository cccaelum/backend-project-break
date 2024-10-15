// Importa las funciones necesarias desde Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHM6QNYJFhhgK3g-kDTf4gnI2PGpDxKXI",
  authDomain: "backend-project-6c315.firebaseapp.com",
  projectId: "backend-project-6c315",
  storageBucket: "backend-project-6c315.appspot.com",
  messagingSenderId: "570228057536",
  appId: "1:570228057536:web:0756c5568caa13b4441425"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Define la función login como una arrow function
const login = async () => {
    console.log('Login function called'); 
    const mensajeDiv = document.getElementById('mensaje'); // Obtén el div para mostrar errores
    mensajeDiv.textContent = ''; // Limpia mensajes anteriores
  
    try {
      // Obtén los valores de email y password
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      // Validación de entrada
      if (!email || !password) {
        mensajeDiv.textContent = 'Email and password are required';
        return;
      }
  
      // Autentica al usuario con Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User Credential:', userCredential);

      // Obtén el ID token del usuario autenticado
      const idToken = await userCredential.user.getIdToken(); // usado por firebase. Esto es JWT 
      console.log('ID Token:', idToken);

      // Envía el ID token al servidor
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      console.log('Response from server:', response);
  
      const data = await response.json();

      console.log('Response data:', data);
  
      // Redirige al dashboard si el login es exitoso
      if (data.success) {
        window.location.href = '/dashboard';
      } else {
        mensajeDiv.textContent = 'Login failed: ' + data.error;
      }
    } catch (error) {
      mensajeDiv.textContent = 'Error during login: ' + error.message;
    }
  };
  
// Event listener para el botón de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional
    login(); // Llama a la función login
});
