import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/style.js";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  style,
}) {
  const sanitizedValue =
    value === null || value === undefined ? "" : String(value);

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>

      <View
        style={[styles.inputWrapper, isInvalid && styles.inputWrapperInvalid]}
      >
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={(text) => {
            onUpdateValue(text);
          }}
          value={sanitizedValue}
        />
      </View>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    gap: 4,
    marginBottom: 16,
  },

  label: {
    color: Colors.primary100, // soft gold
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "600",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowRadius: 4,
  },

  labelInvalid: {
    color: Colors.error500,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.45)", // dark casino field
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.primary500, // gold border
    paddingHorizontal: 14,
    height: 48,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },

  inputWrapperInvalid: {
    borderColor: Colors.error500,
    backgroundColor: "rgba(255,0,0,0.15)",
  },

  input: {
    flex: 1,
    fontSize: 17,
    color: Colors.white, // clean white text
    fontWeight: "500",
  },
});
