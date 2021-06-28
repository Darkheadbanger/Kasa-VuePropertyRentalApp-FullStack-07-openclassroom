//Page pour recuperer les données de serveur. dans le cas ou on accède la page proteger, le protocole HTTP doit avoir l'autorisation de l'entête
// On créer une fonction authHeader, ce fonction permet de checker le localStorage pour user.
export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  //S'il y a un usser se connecte avec accessToken (jwt), on retourne l'aithorization du header si non, on return un objet vide
  if (user && user.accessToken) {
    return {'x-access-token': user.accessToken}
  } else {
    return {};
  }
}