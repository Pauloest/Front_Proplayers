import axios from "axios";

// urls dos serviços para serem usados nas chamadas do banco e nos caminhos de imagens
export const favoritesURL = "http://localhost:3003";
export const playersURL = "http://localhost:3000";

// Conexão com o serviço de jogadores
export const playersApi = axios.create({
  baseURL: playersURL,
});

// Conexão com o serviço de favoritos
export const favoritesApi = axios.create({
  baseURL: favoritesURL,
});