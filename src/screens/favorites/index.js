import React, { useState, useEffect } from "react";
import { Image, View, Text, ScrollView, ActivityIndicator } from "react-native";
import { favoritesApi, favoritesURL } from "../../api/index";
import { styles } from "./styles";
import { useRoute } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

export const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [change, setChange] = useState();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);

  let newPlayer = route.params;
  /*
   * Faz uma requisição pro serviço de favoritos
   * Armazena os dados da resposta
   * Faz uma nova requisição pro serviço a cada remoção ou adição de jogador
   * Inicia um estado de loading por 300ms a cada requisição
   */
  async function fetchData() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
    try {
      await favoritesApi.get("favorites").then((response) => {
        setFavorites(response.data);
      });
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchData();
  }, [change, newPlayer]);

// Função de remoção de jogador da coleção de favoritos
  async function handleRemove(params) {
    try {
      await favoritesApi.delete(`${params}`).then((response) => {
        if (response.status == 200) {
          alert("Removed");
        }
      });
    } catch (e) {
      alert("Dont removed");
    }
    setChange(!change);
  }
  return (
    <ScrollView>
      <Text style={styles.title}> Minha Seleção de Jogadores</Text>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {!isLoading && favorites.length == 0 && (
        <Text style={styles.notFound}> Não há dados para favoritos..</Text>
      )}
      <View style={styles.container}>
        {favorites.length > 0 &&
          favorites.map((item, index) => (
            <View key={index} style={styles.content}>
              <Image
                source={`${favoritesURL}/${item.avatar}`}
                S
                style={{
                  width: 150,
                  height: 200,
                  borderRadius: 15,
                  padding: 5,
                }}
                resizeMode="cover"
              ></Image>
              <Text style={styles.textName}>{item.name}</Text>
              <RectButton
                style={styles.removetofavorites}
                onPress={() => handleRemove(item.id)}
              >
                <Text>Remover da Selecao</Text>
              </RectButton>
            </View>
          ))}
      </View>

    </ScrollView>
  );
};
