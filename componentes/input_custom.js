import { useRef, useState, useEffect } from 'react';
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomInput = ({ containerStyle, placeholder, onChangeText, error, mask = '', texto, ...props }) => {

    const [isFocused, setIsFocused] = useState(false);
    const [text, setText] = useState(texto || '');
    const [rawText, setRawText] = useState(texto ? texto.replace(/[^a-zA-Z0-9]/g, '') : '');
    const [showPassword, setShowPassword] = useState(props.secureTextEntry);
    const labelPosition = useRef(new Animated.Value(text ? 1 : 0)).current;

    useEffect(() => {
        setText(texto);
        setRawText(texto ? texto.replace(/[^a-zA-Z0-9]/g, '') : '');
        if (texto) {
            animatedLabel(1);
        }
    }, [texto]);

    const handleFocus = () => {
        setIsFocused(true);
        animatedLabel(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (!text) {
            animatedLabel(0);
        }
    };

    const applyMask = (inputText) => {
        if (!mask) return inputText;

        let maskedText = '';
        let textIndex = 0;

        for (let i = 0; i < mask.length; i++) {
            if (mask[i] === 'n' && textIndex < inputText.length && /\d/.test(inputText[textIndex])) {
                maskedText += inputText[textIndex++];
            } else if (mask[i] === 'd' && textIndex < inputText.length && /[a-zA-Z]/.test(inputText[textIndex])) {
                maskedText += inputText[textIndex++];
            } else if (mask[i] !== 'n' && mask[i] !== 'd') {
                maskedText += mask[i];
            } else {
                break;
            }
        }

        return maskedText;
    };

    const handleTextChange = (inputText) => {
        if (!mask) {
            setText(inputText);
            if (onChangeText) {
                onChangeText(inputText);
            }
        } else {
            let newRawText = inputText.replace(/[^a-zA-Z0-9]/g, '');
            const maskedText = applyMask(newRawText);
            setRawText(newRawText);
            setText(maskedText);
            if (onChangeText) {
                onChangeText(maskedText);
            }
        }

        if (inputText) {
            animatedLabel(1);
        } else {
            animatedLabel(isFocused ? 1 : 0);
        }
    };

    const handleKeyPress = ({ nativeEvent }) => {
        if (nativeEvent.key === 'Backspace' && text.length > 0) {
            let newRawText = rawText;

            if (mask && text.length > 0) {
                const lastChar = text[text.length - 1];
                const secondLastChar = text.length > 1 ? text[text.length - 2] : '';

                if (lastChar && !/^[a-zA-Z0-9]$/.test(lastChar)) {
                    newRawText = newRawText.slice(0, -1);
                } else if (secondLastChar && !/^[a-zA-Z0-9]$/.test(secondLastChar)) {
                    newRawText = newRawText.slice(0, -1);
                }
            } else {
                newRawText = newRawText.slice(0, -1);
            }

            const maskedText = applyMask(newRawText);
            setRawText(newRawText);
            setText(maskedText);

            if (onChangeText) {
                onChangeText(maskedText);
            }
        }
    };

    const animatedLabel = (toValue) => {
        Animated.timing(labelPosition, {
            toValue: toValue,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const labelStyle = {
        left: 10,
        top: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [17, 0],
        }),
        fontSize: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 14],
        }),
        color: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: ['gray', '#888'],
        }),
    };

    return (
        <View style={containerStyle}>
            <View style={[styles.innerContainer, error && { borderColor: 'red' }]}>
                <Animated.Text style={[styles.label, labelStyle]}>{placeholder}</Animated.Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        {...props}
                        style={styles.input}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChangeText={handleTextChange}
                        onKeyPress={handleKeyPress}
                        value={text}
                        textAlignVertical="center"
                        textContentType={props.secureTextEntry ? 'newPassword' : props.secureTextEntry}
                        secureTextEntry={showPassword}
                    />
                    {props.secureTextEntry && !!text && (
                        <View>
                            <TouchableOpacity
                                style={{ width: 24 }}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                {!showPassword ? (
                                    <Icon name="eye-outline" color={'gray'} size={24} />
                                ) : (
                                    <Icon name="eye-off-outline" color={'gray'} size={24} />
                                )}
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    innerContainer: {
        borderWidth: 1.5,
        borderColor: '#eee',
        borderRadius: 5,
        height: 60,
        justifyContent: 'center',
        shadowColor: '#000',
    },
    label: {
        position: 'absolute',
        color: 'gray',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: 60,
        marginTop: 10,
        paddingLeft: 10,
    },
    errorText: {
        marginTop: 5,
        fontSize: 14,
        color: 'red',
    },
});

export default CustomInput;
