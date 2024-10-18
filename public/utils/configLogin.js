// Importa las funciones necesarias desde Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';

// Función para obtener la configuración de Firebase desde el servidor
const fetchFirebaseConfig = async () => {
    const response = await fetch('/firebase-config'); 
    if (!response.ok) {
        throw new Error('Failed to fetch Firebase config');
    }
    return await response.json(); // Devuelve la configuración como un objeto
};

let auth; 

// Inicializa Firebase
const initializeFirebase = async () => {
        const firebaseConfig = await fetchFirebaseConfig(); 
        const app = initializeApp(firebaseConfig);
        auth = getAuth(app); // Obtiene la autenticación de Firebase
    };


const login = async () => {
    console.log('Login function called'); 
    const mensajeDiv = document.getElementById('mensaje'); // div para mostrar errores
    mensajeDiv.textContent = ''; 
  
    try {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (!email || !password) {
        mensajeDiv.textContent = 'Email and password are required';
        return;
      }
  
      // Autentica al usuario con Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User Credential:', userCredential);

      // ID token del usuario autenticado
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
  
      if (data.success) {
        window.location.href = '/dashboard';
      } else {
        mensajeDiv.textContent = 'Login failed: ' + data.error;
      }
    } catch (error) {
      mensajeDiv.textContent = 'Error during login: ' + error.message;
    }
  };
  

document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault(); // el formulario se envía evitando que la pagina se recargue
    login(); 
});

initializeFirebase();