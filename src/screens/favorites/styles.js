import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  title: {
    justifyContent: "center",
    textAlign: "center",
    padding: 10,
    backgroundColor: "#000",
    color: "#BBBBBB",
    fontSize: 25,
    fontWeight: "bold",
  },
  notFound: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "45%",
    backgroundColor: "#BBBBBB",
    borderRadius: 10,
    marginHorizontal: "auto",
    marginVertical: 5,
    paddingBottom: 5,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 5,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    backgroundColor: "#BBBBBB",
    borderRadius: 10,
    margin: 5,
    paddingBottom: 5,
  },
  textName: {
    margin: 5,
    color: "#16226c",
  },
  textTeam: {
    color: "#16226c",
  },
  textScore: {
    color: "#16226c",
  },
  removetofavorites: {
    backgroundColor: "#c72c72",
    padding: 7,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
