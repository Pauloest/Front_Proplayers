import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
// import { players } from '../../api/index'
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { playersURL, playersApi, favoritesApi } from "../../api";

export const Search = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerSelected, setPlayerSelected] = useState([]);
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  // Requisição pro serviço
  useEffect(() => {
    try {
      playersApi.get("players").then((response) => {
        setPlayers(response.data.players);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  /*
   * Função de pesquisa por nome
   * Inicia um estado de loading que dura 300ms
   * Caso existam dados no array "players", retornará um novo array filtrado com o conteúdo do campo de pesquisa
   */
  function searchPlayer(value) {
    setIsLoading(true);
    setTimeout(() => {
      if (players.length > 0) {
        const search = players.filter((item) =>
          item.name.toLocaleLowerCase().match(value.toLocaleLowerCase())
        );

        setPlayerSelected(search);
      }
      setIsLoading(false);
    }, 300);
  }

  function playerNameInputHandler(value) {
    setPlayerName(value);
  }
// adiciona o jogador selecionado a favoritos
  async function handleFavorites(params) {
    try {
      await favoritesApi.post("create-favorite", params).then((response) => {
        if (response.status == 201) {
          navigation.navigate("Favorites", { params });
        }
      });
    } catch (e) {
      alert("This player already exist in your favorites colection ");
    }
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput style={styles.input} onChangeText={playerNameInputHandler} />
        <RectButton
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => searchPlayer(playerName)}
        >
          <Text style={styles.buttonText}>Pesquisar Jogador</Text>
        </RectButton>
      </View>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {playerSelected.length == 0 && !isLoading && (
        <Text style={styles.notFound}> Não há dados...</Text>
      )}
      {playerSelected.length > 0 &&
        playerSelected.map((item, index) => (
          <View key={index} style={styles.content}>
            <Image
              source={`${playersURL}/${item.avatar}`}
              style={{ width: 150, height: 200, borderRadius: 15, padding: 5 }}
              resizeMode="cover"
            ></Image>
            <Text key={item.name} style={styles.textName}>
              {item.name}
            </Text>
            <Text style={styles.textTeam}>{item.team}</Text>
            <RectButton
              style={styles.addtofavorites}
              onPress={() => handleFavorites(item)}
            >
              <Text>Adicionar a selecao</Text>
            </RectButton>
          </View>
        ))}
    </ScrollView>
  );
};
