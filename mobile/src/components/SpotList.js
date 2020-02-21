import React, {useState ,useEffect} from 'react';
import { withNavigation } from 'react-navigation';
import {View, StyleSheet, Text, FlatList, Image, TouchableOpacity} from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png'

function SpotList({tech, navigation}){
    const [spots, setSpots]=useState([]);

    useEffect(()=>{
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { tech }
            })
            console.log(response.data)
            setSpots(response.data);               
        }

        loadSpots();
    }, []);

    function handleNavigate(id) {
        navigation.navigate('Book', {id});
    }

    return (
        <View>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>

            <FlatList
                style={styles.list}
                data={spots}
                keyExtrator={spot=>spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item})=> (
                    <View style={styles.listItem}>                        
                        <Image  style = {styles.thumbnail} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/800px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg'}} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRUTUITO'}</Text>
                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                            <Text stye={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>

                )}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        marginTop: 30,
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },

    bold: {
        fontWeight: 'bold',
    },

    list: {
        paddingHorizontal:20,
    },

    thumbnail: {
        width:200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },

    price: {
        fontSize: 15,
        color: '#999'
    },

    button: {
        height: 32,
        backgroundColor : '#f05a5b',
        justifyContent: 'center',
        borderRadius: 2,
        marginTop: 15,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default withNavigation(SpotList);


//<Image  style = {styles.thumbnail} source={logo} />
//<Image  style = {styles.thumbnail} source={{uri: item.thumbnail_url}} />
//<Text>{item.thumbnail_url}</Text>