import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';

const App = () => {
  const apiToken = '';
  const query = 'weather';
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiToken}`;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json.articles))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  console.log(data);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>News Feed</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => {
            console.log(item.url);
            return (
              <View style={styles.article}>
                <Image style={styles.image} source={{ uri: item.urlToImage }} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.description}</Text>
                <Text style={styles.author}>Author: {item.author}</Text>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 20,
    marginTop: 30,
  },
  header: {
    fontSize: 26,
  },
  article: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 20,
  },
  title: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,

    fontSize: 20,
    backgroundColor: '#fff',
    marginTop: -36,
    marginLeft: 20,
    marginRight: 20,
    zIndex: 1,
  },

  image: {
    width: '100%',
    height: 168,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  text: {
    fontSize: 18,
    padding: 16,
    marginBottom: 36,
  },
  author: {
    fontSize: 16,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
  },
});

export default App;
