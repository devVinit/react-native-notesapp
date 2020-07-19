import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface ToasterComponentProps {
    message: string;
}

const ToasterComponent = (props: ToasterComponentProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.message}>{props.message}</Text>
            </View>
        </View>
    );
};

export default ToasterComponent;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: '25%',
        width: '100%',
        alignItems: 'center'
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#3A3A3A',
    },
    message: {
        fontSize: 16,
        color: '#fff',
        padding: 10
    }
});
