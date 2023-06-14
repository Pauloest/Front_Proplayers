import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { favoritesApi, playersApi, playersURL } from "../../api";

export const Feed = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 5;
  const total = useRef(0);

    /*
   * Faz uma requisição pro serviço de players
   * Armazena os dados da resposta
   * Faz uma nova requisição pro serviço a cada alteração da variavel de paginação
   * Inicia um estado de loading por 500ms a cada requisição
   */
  useEffect(() => {
    fetchItems();
  }, [pageNumber]);

  const fetchItems = async () => {
    setTimeout(async () => {
      try {
        const response = await playersApi.get("players", {
          params: {
            skip: (pageNumber - 1) * itemsPerPage,
            take: itemsPerPage,
          },
        });
        const { players, count } = response.data;
        total.current = count;

        setPlayers((prevItems) => [...prevItems, ...players]);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    }, 500);
  };

  /*
   * Gatilho para realizar uma nova requisição
  * será acionado quando houver um evento de scroll
  * verifica se todos os jogadores disponiveis na api já estão  no array "players"
  * e faz uma nova requisição com os parametros da paginação (pageNumber e itemsPerPage)
   */
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    if (
      !isLoading &&
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    ) {
      if (total.current > players.length) {
        fetchMorePlayers();
      }
    }
  };
  const fetchMorePlayers = () => {
    setIsLoading(true);

    setPageNumber(pageNumber + 1);
  };
// Aciona o segundo micro serviço gravando os dados do jogador e navegando para a página de favoritos
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
    <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
      <Text style={styles.title}> Jogadores Pro</Text>
      <View style={styles.container}>
        {players.length == 0 && (
          <>
            {" "}
            <Text style={styles.notFound}> Não há dados..</Text>
            <RectButton style={styles.fetchBtn} onPress={fetchMorePlayers}>
              <Text>Buscar dados no servidor</Text>
            </RectButton>
          </>
        )}
        {players.length > 0 &&
          players.map((item, index) => (
            <View key={index} style={styles.content}>
              <Image
                // caminho para a imagem no servidor
                source={`${playersURL}/${item.avatar}`}
                S
                style={{
                  width: 150,
                  height: 200,
                  borderRadius: 15,
                  padding: 5,
                }}
                resizeMode="cover"
              ></Image>
              <Text key={item.name} style={styles.textName}>
                {item.name}
              </Text>
              <Text style={styles.textTeam}>{item.team}</Text>
              <Text style={styles.textScore}>{item.score}</Text>
              <RectButton
                style={styles.addtofavorites}
                onPress={() => handleFavorites(item)}
              >
                <Text>Adicione a Selecao</Text>
              </RectButton>
            </View>
          ))}
      </View>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </ScrollView>
  );
};
