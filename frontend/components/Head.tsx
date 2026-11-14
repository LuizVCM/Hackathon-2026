import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Head = () => {
    return (
        <View>
            <View style={styles.teste}>
                <View style={styles.logo}>
                    <Image source={{ uri: '' }} />
                </View>
                <Text>Consulta+</Text>
            </View>
            

        </View>
    )
}

export default Head

const styles = StyleSheet.create({
    logo: {
        backgroundColor: 'lightblue',
        width: 60,
        height: 60,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'

    },
    teste:{
        width: 10,
        height: 60,
        backgroundColor: 'purple'
    }

})