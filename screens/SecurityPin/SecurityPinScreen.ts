import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback, AsyncStorage } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIconSvg from '../../components/Svg/BackIconSvg';
import NoteIconSvg from '../../components/Svg/NoteIconSvg';
import { useDispatch } from 'react-redux';
import { appLogin } from '../../redux/actions/LoginActions';
import { commonStyle } from '../../CompponStyles';

interface SecurityPinScreenProps {
    navigation: any;
    route: any;
}

export enum SecurityPinScreenMode {
    NEW = 'NEW',
    EDIT = 'EDIT',
    LOGIN = 'LOGIN'
}

enum PinStatus {
    CORRECT = 'CORRECT',
    INPROGRESS = 'INPROGRESS',
    INCORRECT = 'INCORRECT'
}

const SecurityPinScreen = ({ route, navigation }: SecurityPinScreenProps) => {

    const [pin, setPin] = useState<number[]>([]);
    const [expectedPin, setExpectedPin] = useState<string>();
    const [pinStatus, setPinStatus] = useState<string>();
    const [mode, setMode] = useState<any>(route.params && route.params.mode);

    const dispatch = useDispatch();

    useEffect(() => {
        AsyncStorage
            .getItem('SECURITY_CODE')
            .then(pin => {
                if (mode !== SecurityPinScreenMode.EDIT) {
                    if (pin && pin.length === 4) {
                        setMode(SecurityPinScreenMode.LOGIN);
                        setExpectedPin(pin);
                    } else {
                        setMode(SecurityPinScreenMode.NEW);
                    }
                }
            }).catch(error => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        if (pin.length === 4) {
            if (mode === SecurityPinScreenMode.NEW) {
                AsyncStorage.setItem('SECURITY_CODE', pin.join(''));
                setTimeout(() => {
                    dispatch(appLogin(true));
                }, 500);
            } else if (mode === SecurityPinScreenMode.LOGIN) {
                if (pin.join('') === expectedPin) {
                    setPinStatus('CORRECT');
                    setTimeout(() => {
                        dispatch(appLogin(true));
                    }, 500);
                } else if (pin.length > 1) {
                    setPin([]);
                    setPinStatus('INCORRECT');
                }
            } else if (mode === SecurityPinScreenMode.EDIT) {
                navigation.navigate('HomeScreen');
            }
        }
    }, [pin]);

    const handleAddPinNumberAction = (number: number) => {
        setPinStatus('INPROGRESS');
        if (pin.length < 4) {
            setPin([...pin, number]);
        }
    }

    const handleRemovePinNumberAction = () => {
        setPinStatus('INPROGRESS');
        pin.splice(0, 1);
        setPin([...pin]);
    }

    return (
        <View style= { styles.container } >
        <StatusBar style="auto" />
            <SafeAreaView style={ { flex: 1, justifyContent: 'space-between' } }>
                <View style={ commonStyle.headerContainer }>
                    <View style={ { flexDirection: 'row', alignItems: 'center' } }>
                    {
                        mode === 'EDIT' &&
                        <TouchableNativeFeedback
                                onPress={ () => navigation.goBack() }
    background = { TouchableNativeFeedback.Ripple('black', true) } >
        <View style={ commonStyle.headerIcon }>
            <BackIconSvg />
            < /View>
            < /TouchableNativeFeedback>
}
</View>
    < /View>

    < View style = {{ alignItems: 'center', }}>
        <View style={ [styles.imgHolder, { backgroundColor: pinStatus === PinStatus.CORRECT ? '#80E374' : '#3A3A3A', }] }>
            <NoteIconSvg />
            < /View>
            < View style = {{ height: 40 }} />
{
    pinStatus === PinStatus.CORRECT &&
        <Text style={ commonStyle.header2 }> PIN is correct < /Text>
}
{
    (!pinStatus || pinStatus !== PinStatus.CORRECT) &&
        <View>
        {
            mode === SecurityPinScreenMode.NEW &&
        <Text style={ commonStyle.header2 }> Set Your Security PIN < /Text>
}
{
    mode === SecurityPinScreenMode.EDIT &&
        <Text style={ commonStyle.header2 }> Edit Your Security PIN < /Text>
}
{
    mode === SecurityPinScreenMode.LOGIN &&
        <Text style={ commonStyle.header2 }> Enter Your Security PIN < /Text>
}
</View>
                    }
<View style={ { height: 20 } } />
    < View style = {{ flexDirection: 'row' }}>
    {
        [1, 2, 3, 4].map((item, index) => (
            <View
                                    key= { index }
                                    style = {
                [styles.pinCircle, (pin[index]
                    && styles.pinCircleFilled) || null, (pinStatus === PinStatus.CORRECT
                        && styles.pinCircleCorrect) || null, (pinStatus === PinStatus.INCORRECT
                            && styles.pinCodeInCorrect) || null,]} />
                            ))
    }
        < /View>

{
    pinStatus === PinStatus.INCORRECT &&
        <Text style={ { color: '#E41515' } }> Existing pin does not match < /Text>
}
</View>

    < View style = { styles.keyPadContainer } >
        <View>
        <TouchableNativeFeedback
                            onPress={ () => handleAddPinNumberAction(1) }
background = { TouchableNativeFeedback.Ripple('black', true) } >
    <View>
    <Text style={ styles.numText }> 1 < /Text>
        < /View>
        < /TouchableNativeFeedback>
        < TouchableNativeFeedback
onPress = {() => handleAddPinNumberAction(4)}
background = { TouchableNativeFeedback.Ripple('black', true) } >
    <View>
    <Text style={ styles.numText }> 4 < /Text>
        < /View>
        < /TouchableNativeFeedback>
        < TouchableNativeFeedback
onPress = {() => handleAddPinNumberAction(7)}
background = { TouchableNativeFeedback.Ripple('black', true) } >
    <View>
    <Text style={ styles.numText }> 7 < /Text>
        < /View>
        < /TouchableNativeFeedback>
        < /View>

        < View >
        <TouchableNativeFeedback
                            onPress={ () => handleAddPinNumberAction(2) }
background = { TouchableNativeFeedback.Ripple('black', true) } >
    <View>
    <Text style={ styles.numText }> 2 < /Text>
        < /View>
        < /TouchableNativeFeedback>
        < TouchableNativeFeedback
onPress = {() => handleAddPinNumberAction(5)}
background = { TouchableNativeFeedback.Ripple('black', true) } >
    <View>
    <Text style={ styles.numText }> 5 < /Text>
        < /View>
        < /TouchableNativeFeedback>
        < TouchableNativeFeedback
onPress = {() => handleAddPinNumberAction(8)}
background = { TouchableNativeFeedback.Ripple('black', true) } >
    <View>
    <Text style={ styles.numText }> 8 < /Text>
        < /View>
        < /TouchableNativeFeedback>
        < TouchableNativeFeedback
onPress = {() => handleAddPinNumberAction(0)}
background = { TouchableNativeFeedback.Ripple('black', true) } >
    <View>
    <Text style={ styles.numText }> 0 < /Text>
        < /View>
        < /TouchableNativeFeedback>
        < /View>

        < View >
        <TouchableNativeFeedback
                            onPress={ () => handleAddPinNumberAction(3) }
background = { TouchableNativeFeedback.Ripple('black', true) } >
    <View>
    <Text style={ styles.numText }> 3 < /Text>
        < /View>
        < /TouchableNativeFeedback>
        < TouchableNativeFeedback
onPress = {() => handleAddPinNumberAction(6)}
background = { TouchableNativeFeedback.Ripple('black', true) } >
    <View>
    <Text style={ styles.numText }> 6 < /Text>
        < /View>
        < /TouchableNativeFeedback>
        < TouchableNativeFeedback
onPress = {() => handleAddPinNumberAction(9)}
background = { TouchableNativeFeedback.Ripple('black', true) } >
    <View>
    <Text style={ styles.numText }> 9 < /Text>
        < /View>
        < /TouchableNativeFeedback>
        < TouchableNativeFeedback
onPress = {() => handleRemovePinNumberAction()}
background = { TouchableNativeFeedback.Ripple('black', true) } >
    <View>
    <Ionicons style={ styles.numText } name = "md-backspace" size = { 32} />
        </View>
        < /TouchableNativeFeedback>
        < /View>
        < /View>
        < /SafeAreaView>
        < /View>
    );
};

export default SecurityPinScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imgHolder: {
        borderRadius: 50,
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    numText: {
        fontSize: 25,
        paddingHorizontal: 30,
        paddingVertical: 10
    },
    pinCircle: {
        height: 10,
        width: 10,
        margin: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#404040'
    },
    keyPadContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 20
    },
    pinCircleFilled: {
        backgroundColor: '#404040'
    },
    pinCircleCorrect: {
        backgroundColor: '#80E374',
        borderColor: '#80E374'
    },
    pinCodeInCorrect: {
        backgroundColor: '#E41515',
        borderColor: '#E41515'
    }
});
