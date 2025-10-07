"use strict";

const defaultValue = "Animal Jam Rocks!";

const translations = {
  createAnimal: {
    en: "Create an Animal",
    fr: "Création d'Animaux",
    de: "Erstelle ein Tier",
    es: "Crear un Animal",
    pt: "Criar um Animal",
  },
  emailRequired: {
    en: "You must enter an email",
    fr: "Veuillez entrer une adresse email",
    de: "Du musst deine E-Mail-Adresse eingeben",
    es: "Debe escribir un correo electrónico",
    pt: "Você deve inserir um e-mail",
  },
  parentEmail: {
    en: "Parent Email Address",
    fr: "Adresse e-mail Parent",
    de: "Eltern-Email-Adresse",
    es: "Dirección de correo electrónico del padre",
    pt: "Endereço de e-mail Pais",
  },
  forgotPassword: {
    en: "Forgot your password?",
    fr: "Mot de passe oublié ?",
    de: "Passwort vergessen?",
    es: "¿Olvidó su contraseña?",
    pt: "Esqueceu sua senha?",
  },
  forgotPasswordNote: {
    en: "Forgot your password? No problem! Just enter your username and parents' email and hit submit.",
    fr: "Mot de passe oublié ? Aucun problème ! Indiquez simplement votre adresse email puis cliquez sur envoyer.",
    de: "Passwort vergessen? Kein Problem! Gib nur deine E-Mail-Adresse ein und klicke auf Abschicken.",
    es: "¿Olvidaste tu contraseña? ¡No hay problema! Escriba su dirección de correo electrónico y haga clic en enviar.",
    pt: "Esqueceu a senha? Sem problema! Apenas insira o seu endereço de email e clique em enviar.",
  },
  login: {
    en: "Log In",
    fr: "Se Connecter",
    de: "Anmelden",
    es: "Acesso",
    pt: "Iniciar sessão",
  },
  loginError: {
    en: "There was an error logging in. Please try again later.",
    fr: "Une erreur s'est produite. Veuillez réessayer ultérieurement.",
    de: "Es gab einen Fehler beim anmelden. Bitte versuche es später noch einmal.",
    es: "Se ha producido un error al iniciar sesión. Vuelve a intentarlo más tarde.",
    pt: "Ocorreu um erro ao iniciar sua sessão. Por favor tente novamente mais tarde.",
  },
  newToAnimalJam: {
    en: "New To Animal Jam?",
    fr: "Nouveau dans Animal Jam ?",
    de: "Neu auf Animal Jam?",
    es: "¿Eres nuevo en Animal Jam?",
    pt: "O Animal Jam é novidade para você?",
  },
  newToAnimalJamNote: {
    en: "If you’re new to Animal Jam you will need to create an animal to begin.",
    fr: "Si tu es nouveau dans Animal Jam, tu dois commencer par créer un animal.",
    de: "Wenn du neu in Animal Jam bist, musst du ein Tier erstellen, um zu beginnen",
    es: "Si eres nuevo en Animal Jam necesitas crear un animal para comenzar.",
    pt: "Se você é novo no Animal Jam você precisará criar um animal para começar.",
  },
  password: {
    en: "Password",
    fr: "Mot de passe",
    de: "Passwort",
    es: "Contraseña",
    pt: "Senha",
  },
  passwordReset: {
    en: "password reset",
    fr: "réinitialiser le mot de passe",
    de: "passwort zurücksetzen",
    es: "restablecer contraseña",
    pt: "redefinição de senha",
  },
  playerLogin: {
    en: "Player Login",
    fr: "Connexion joueur",
    de: "Spieler-Anmeldung",
    es: "Inicio de sesión de jugador",
    pt: "Acesso do jogador",
  },
  submit: {
    en: "submit",
    fr: "envoyer",
    de: "abschicken",
    es: "enviar",
    pt: "enviar",
  },
  userBanned: {
    en: "This account has been permanently banned from Animal Jam and cannot login.",
    fr: "Ce compte a été banni de façon permanente d'Animal Jam et ne peut pas se connecter.",
    de: "Dieses Konto wurde dauerhaft für Animal Jam gesperrt und du kannst dich nicht einloggen.",
    es: "Esta cuenta ha sido suspendida permanentemente de Animal Jam y no se puede iniciar sesión.",
    pt: "Esta conta foi permanentemente suspensa do Animal Jam e não pode ser acessada.",
  },
  username: {
    en: "Username",
    fr: "Nom d'utilisateur",
    de: "Benutzername",
    es: "Usuario",
    pt: "Nome de usuário",
  },
  usernameEmailRequired: {
    en: "You must enter both a username and an email address",
    fr: "Vous devez fournir un nom d'utilisateur et une adresse email",
    de: "Du musst einen Benutzernamen und eine E-Mail-Adresse eingeben.",
    es: "Você precisa inserir o nome de usuário e o endereço de e-mail.",
    pt: "Debes escribir un usuario y una correo electrónico",
  },
  usernameRequired: {
    en: "You must enter a username",
    fr: "Il faut indiquer un nom d'utilisateur",
    de: "Du musst einen Benutzernamen eingeben",
    es: "Debe poner su nombre de usuario",
    pt: "Você deve digitar um nome de usuário",
  },
  userNotFound: {
    en: "Sorry, we cannot find an account matching that username.",
    fr: "Désolé, aucun compte ne correspond à ce nom d'utilisateur.",
    de: "Wir können leider kein Konto zu dem Benutzernamen finden.",
    es: "Lo siento, no fue posible encontrar una cuenta que coincidiera con ese usuario.",
    pt: "Desculpe, não foi possível encontrar uma conta correspondente a este nome de usuário.",
  },
  userSuspended: {
    en: "This account is currently suspended and cannot login at this time.",
    fr: "Ce compte est actuellement suspendu",
    de: "Dieses Konto ist derzeit gesperrt",
    es: "Esta cuenta se encuentra actualmente suspendida y no puede iniciar sesión en este momento.",
    pt: "Esta conta está atualmente suspensa",
  },
  wrongEmail: {
    en: "The email address you entered does not match our records",
    fr: "L'adresse email que vous avez fournie ne correspond pas à nos données.",
    de: "Die eingegebene E-Mail-Adresse stimmt nicht mit unseren Unterlagen überein.",
    es: "La dirección de correo electrónico que escribió no coincide con nuestros registros.",
    pt: "O endereço de e-mail inserido não é o mesmo que consta em nossos registros.",
  },
  wrongCredentials: {
    en: "Sorry, we are unable to log you in. Please make sure both your username and password are correct.",
    fr: "Nous n'avons malheureusement pas pu vous connecter. Assurez-vous que votre nom d'utilisateur et votre mot de passe soient tous les deux corrects.",
    de: "Leider können wir dich nicht anmelden. Bitte vergewissere dich, dass Benutzername und Passwort korrekt sind.",
    es: "Lo sentimos, no fue posible iniciar tu sesión. Asegúrate de que tu nombre de usuario y contraseña sean correctos.",
    pt: "Não foi possível fazer a conexão. Confirme se tanto seu nome de usuário quanto sua senha estão corretos.",
  },
  emptyPassword: {
    en: "Your password cannot be empty.",
    fr: "Ton mot de passe ne peut pas être vide.",
    de: "Dein Passwort darf nicht leer sein.",
    es: "La contraseña no puede quedar vacía.",
    pt: "Você deve digitar uma senha.",
  },
  fullScreenButtonText: {
    en: "Expand",
    fr: "Élargir",
    de: "Erweitere",
    es: "Ampliar",
    pt: "Ampliar",
  },
  logoutText: {
    en: "Log out",
    fr: "Se déconnecter",
    de: "Abmelden",
    es: "Cerrar sesión",
    pt: "desconectar",
  },
  exitText: {
    en: "Exit",
    fr: "Sortie",
    de: "Beenden",
    es: "Salida",
    pt: "Sair",
  },
  rememberMeText: {
    en: "Remember Me",
    fr: "Se souvenir de moi",
    de: "Erinnerst du dich an mich",
    es: "Recuérdame",
    pt: "Lembre-se de mim",
  },
  changeUsernameSubmit: {
    en: "Rename Account",
    fr: "Renommer le compte",
    de: "Konto Neu Benennen",
    es: "Renonbrar Cuenta",
    pt: "Renomeie a Conta",
  },
  changeUsernameHeader: {
    en: "Oops!",
    fr: "Oh oh !",
    de: "Hoppla!",
    es: "¡Ups!",
    pt: "Ups!",
  },
  changeUsernameNoteText: {
    en: "Your username (%s) has been rejected by our moderators. Please create a new username.",
    fr: "Ton nom d'utilisateur (%s) a été rejeté par nos modérateurs. Merci de créer un nouveau nom d'utilisateur.",
    de: "Dein Benutzername (%s) wurde von unseren Moderatoren abgelehnt. Bitte erstelle einen neuen Benutzernamen.",
    es: "Tu nombre de usuario (%s) ha sido rechazado por nuestros moderadores. Por favor, crea un nuevo nombre de usuario.",
    pt: "Seu nome de Usuário (%s) foi rejeitado por nossos moderadores. Por favor crie outro nome de usuário.",
  },
  usernameTooShort: {
    en: "Usernames need to have at least 4 characters.",
    fr: "Un nom d'utilisateur doit contenir au moins 4 caractères.",
    de: "Benutzernamen müssen mindestens 4 Zeichen lang sein.",
    es: "Los nombres de usuario deben tener al menos 4 caracteres.",
    pt: "Nomes de usuário precisam conter pelo menos 4 caracteres.",
  },
  invalidUsername: {
    en: "Please type a valid username",
    fr: "Choisis un nom d'utilisateur valide",
    de: "Bitte gib einen gültigen Benutzernamen ein",
    es: "¡Escribe un nombre de usuario válido!",
    pt: "Digite um nome de usuário válido!",
  },
  nameTaken: {
    en: "That username is already taken. Please choose another.",
    fr: "Ce nom d'animal est déjà pris. Choisis-en un autre.",
    de: "Dieser Tiername ist bereits vergeben. Bitte wähle ein anderes.",
    es: "Ese nombre de animal ya existe. Por favor escoge otro.",
    pt: "Alguém já escolheu este nome de animal. Por favor, escolha outro.",
  },
  nameChanged: {
    en: "Your new username is %s. Be sure to remember it and use it whenever you log in.",
    fr: "Ton nom d'utilisateur a été mis à jour. Utilise ton nouveau nom d'utilisateur pour te connecter.",
    de: "Dein Benutzername wurde aktualisiert. Benutze deinen neuen Benutzernamen, wenn du dich anmeldest.",
    es: "Tu nombre de usuario ha sido actualizado. Usa tu nuevo nombre de usuario cuando inicies sesión.",
    pt: "Seu Nome de Usuário foi atualizado. Use o seu novo Nome de Usuário quando for entrar no Jogo.",
  },
  contactAjhqForNameChange: {
    en: "We were unable to update your username at this time. Please contact our customer support for assistance.",
    fr: "We were unable to update your username at this time. Please contact our customer support for assistance.",
    de: "We were unable to update your username at this time. Please contact our customer support for assistance.",
    es: "We were unable to update your username at this time. Please contact our customer support for assistance.",
    pt: "We were unable to update your username at this time. Please contact our customer support for assistance.",
  },
  ok: {
    en: "Ok",
    fr: "Ok",
    de: "OK",
    es: "Ok",
    pt: "Ok",
  },
  restartApp: {
    en: "Uh-oh! Something went wrong. Please restart the application.",
    fr: "Oh-oh ! Quelque chose s'est mal passé. Merci de redémarrer l'application.",
    de: "Oh-oh! Etwas ist schief gelaufen. Bitte die Anwendung neu starten.",
    es: "¡Oh-oh! Se ha producido un error. Por favor, reinicie su aplicación.",
    pt: "Ups! Algo deu errado. Por favor, reinicie o aplicativo.",
  },
  success: {
    en: "Success!",
    fr: "Félicitations !",
    de: "Erfolg!",
    es: "¡Éxito!",
    pt: "Sucesso!",
  },
  // Placeholder google translated strings
  needAccount: {
    en: "Don't have an account?",
    fr: "Tu n'as pas encore de compte ?",
    de: "Hast du noch kein Konto?",
    es: "¿No tienes cuenta?",
    pt: "Você já possui uma conta?",
  },
  // Placeholder google translated strings
  createAccount: {
    en: "Create Account",
    fr: "Créer un compte",
    de: "Konto erstellen",
    es: "Crear una Cuenta",
    pt: "Criar Conta",
  },
  otpTitle: {
    en: "2-STEP VERIFICATION",
    fr: "VÉRIFICATION EN 2 ÉTAPES",
    de: "ZWEISTUFIGE VERIFIZIERUNG",
    es: "VERIFICACIÓN DE DOS PASOS",
    pt: "VERIFICAÇÃO EM 2 ETAPAS",
  },
  otpMessage: {
    en: "Enter the Verification Code sent to your parent's email:",
    fr: "Saisissez le code de vérification envoyé à l'adresse e-mail parentale :",
    de: "Gib den Verifizierungscode ein, den deine Eltern per E-Mail erhalten haben:",
    es: "Ingresa el código de verificación enviado al correo electrónico de tus padres:",
    pt: "Digite o Código de Verificação enviado para o e-mail dos seus pais ou responsáveis:",
  },
  otpButton: {
    en: "Verify",
    fr: "Vérifier",
    de: "Verifizieren",
    es: "Verificar",
    pt: "Verificar",
  },
  otpLabel: {
    en: "Code",
    fr: "Code",
    de: "Code",
    es: "Código",
    pt: "Código",
  },
  version: {
    en: "Version",
    fr: "Version",
    de: "Version",
    es: "Versión",
    pt: "Versão",
  },
  lastUpdated: {
    en: "Last App Update",
    fr: "Dernière mise à jour de l'application",
    de: "Letzte Aktualisierung der App",
    es: "Actualización más reciente",
    pt: "Última atualização do aplicativo",
  },
  os: {
    en: "Operating System",
    fr: "Système d'exploitation",
    de: "Betriebssystem",
    es: "Sistema operativo",
    pt: "Sistema operacional",
  },
  copyDetails: {
    en: "Copy This Info",
    fr: "Copier ces infos",
    de: "Diese Information kopieren",
    es: "Copiar esta información",
    pt: "Copie estas informações",
  },
  restartMessage: {
    en: "An update has been downloaded. Please restart the app to apply it.",
    fr: "Une mise à jour a été téléchargée. Veuillez redémarrer l'application pour l'installer.",
    de: "Eine Aktualisierung wurde heruntergeladen. Bitte starte die App neu, um es zu übernehmen.",
    es: "Se descargó la actualización. Por favor reinicia la aplicación para implementarla.",
    pt: "Foi feito o download de uma atualização. Reinicie o aplicativo para ativá-la.",
  },
  restartButton: {
    en: "Restart and Update",
    fr: "Redémarrer et mettre à jour",
    de: "Neu starten und aktualisieren",
    es: "Reiniciar y actualizar",
    pt: "Reiniciar e atualizar",
  },
  updateError: {
    en: "Unable to check for updates. Please download and run the latest installer from the website if you cannot play.",
    fr: "Impossible de vérifier les mise à jour. Veuillez télécharger et exécuter le dernier installateur depuis le site Web si vous n'arrivez pas à jouer.",
    de: "Nach Aktualisierungen kann nicht gesucht werden. Bitte lade das neueste Installationsprogramm von der Website herunter, wenn das Spielen nicht möglich ist.",
    es: "No se pudo encontrar alguna actualización. Descarga y ejecuta el instalador más reciente desde el sitio web si no puedes jugar.",
    pt: "Não é possível verificar se há atualizações. Se não consegue jogar, faça o download e execute o instalador mais recente da página web.",
  },
  websiteButton: {
    en: "Visit Website",
    fr: "Visiter le site Web",
    de: "Website besuchen",
    es: "Visita el sitio web",
    pt: "Visitar página web",
  },
};

let language = localStorage.getItem("language") || "en";

const translation = {
  setLanguage: (newLanguage) => {
    language = newLanguage;
    localStorage.setItem("language", newLanguage);
  },

  translate: (phrase) => {
    if (!translations[phrase]) {
      return { value: defaultValue, error: `Unable to find phrase "${phrase}"` };
    }
    if (!translations[phrase][language]) {
      return {
        value: translations[phrase].en || defaultValue,
        error: `Unable to find phrase "${phrase}" for ${language}`,
      };
    }
    return { value: translations[phrase][language] };
  },
};

window.translation = translation;
