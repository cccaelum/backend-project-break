// {
//     "type": "service_account",
//     "project_id": "backend-project-6c315",
//     "private_key_id": "a58b9b4deeb08cd75fb8e581e30b3cd4904bf8f6",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCyfm3Hg6844gxw\nOjBCn3PePpSR9mICKSwvJUSQBsrUlfb86t2HkMR97yfF1GoZQqDLltEQ6yl4tyxa\nxnglnebw02xF+js26v5iQhspjIIzFGWlLXDMbYPEm4Gky1Pzk9zM3mgMnp2NoTn4\nOYc/jOdeZ+oFMq7zphM7flBS8KJ5HJvwkij4EMYVaT2K1PwvRihzgRv4RNa6vuDo\nMTpZugSnsRuXbCVnhORwZYB83uu/SChCJL4pRlmh9CDR8RmsClm14vuAnpC5qhaM\nsYo0cklfA1XTB4f/aaJSQtuAlX492EPrWJUpL+3FuYARhNuIumtlN5Cq2h7tsdQO\nfFbwOu8LAgMBAAECggEAAnb+exfVbpqog1A6ZGEhT3tbv9xAJDl/U7NXDAob+O2N\nOJbhskKMhBSuXuv8/xZNdCJEBtDIhNM6uJIvDI3up3qz7w9yi+KY2rCBAYTgM2Zf\ntPU4rooAnNFs6+Km6SEslmOn2izCjjcgvs3EkVsXwtT6hVHa2qB7eYHYCB0skTGP\nBmD6TIAwgvPMXfCtdlHQ+YfE7rKChUF6L+TKoPkQpkfKJjfvVCq7eo/irTSGRupg\nZRqBHWOMnR8QVjlRu8R7bqCv7ZOhSe37n5OULMgrWYcBHlLS77wEZWVsKogzqVDf\nzlywtpQHH7ZgRUM86a4rhdYoAlcCxVTyqpZU3GTDyQKBgQDl0a9Yg5HyMkMdiy3i\ngEROMrHBQg4+T2IpGV8nVXMz/HsQYPvUP02DRyK7LhQ2HmEXsvMSlEC7BHR8RKLA\nXeE/ms1V3eKz5xC23/3XEWYUvWVp42eU4n8XzKN/m4eKex1pyMc6SbcBCGLifl25\nqU/A5/aKPhuZmqMrDGJev/ONDQKBgQDG0+yF7JQKKKXkq1gQoeqS3wIj/D2bCBML\nt1kjxdkqzrqW8xdXEZG3WqkabUkEbPO0xdEmGKcjqJ8x6DSelaqZ7uwwvAjXkpfN\njc/GRS2MH/X+y7daxPSwBvJdUmwYGtWwxMvjbLL/e5IGDp/eknOpErOh3VJumQGm\nBzGaoqpWdwKBgQCFDEi8MKdslMagMvQkfeeNcfHQlWJTlneYnZSl2+VvAktopw0D\nyoYgay1jOgD/d8T0CGiKqAN1gdXCH6YtQexme0NG48ccKbhWdwSo3uy/MwqkK7/K\nxPmZGKLK/IqSlEXp+Q/F4ektkuJUh53RH4EJiAEF9YDbA1hVUr0cZ3ojfQKBgF4t\nD0E4F77gFgPD7QijyPocS2VEGuIN5weLpts84WpXVSYeqpWBKuYQOTzdOtKv0Jd1\ng2VqE/Dd89mtxQ7AkXgsJQ/IYN/K/cBNRXcCWVqf4OL5FzYVSFkAUVhGrBCW1VTP\nQkvMttQwcbAQyUShVctlolQvAtaD/rXnfmViWxBtAoGBAIocr+54NbA9hR/0e+V2\nAAKHrGWE5V48jQhkw7MhvQrFfHQGzba2WlIStnDh9DSvspVhGGAczB5zfQDxcYNg\nAtfi+8Yc76FFAtJnbGrJI4o3olXsGn5eqfNbz+MUaEwojRFYebgGMe7lfE1AsIiK\nz02Lzh5wVhoZ8/JtQor4TD6B\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-1tj7i@backend-project-6c315.iam.gserviceaccount.com",
//     "client_id": "104808377545675340125",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1tj7i%40backend-project-6c315.iam.gserviceaccount.com",
//     "universe_domain": "googleapis.com"
//   }
  
require('dotenv').config();
//Inicializa Firebase Admin SDK
const serviceAccount = {
    "type": process.env.FIREBASE_TYPE,
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Reemplazar los saltos de línea
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL,
    "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN
  };
  
  module.exports = serviceAccount