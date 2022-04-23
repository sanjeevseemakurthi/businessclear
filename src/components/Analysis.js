import { Text,View,TextInput,StyleSheet } from "react-native";
import { useState } from "react";

export default function Analysis() {
  const [text, onChangeText] = useState("Useless Text");
    return (
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
       <Text>{text}</Text>
      </View>
    );
  }
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  