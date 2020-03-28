import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'; //feather é uma pasta de icones
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import  styles from './styles';

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1); //inicia com valor de 1 pq nao tem como iniciar em uma pagina vazia
    const [load, setLoad] = useState(false)

    const navigation = useNavigation();

    //função para redirecionar para um outro locar do aplicativo
    function navigateToDetail(incident){ //vai receber o parametro de qual caso o usuario clicou
        navigation.navigate('Detail', { incident });
    }

    //ligação com a api
    async function loadIncidents(){
        if(load){ 
            return; //isso serve para quando o usuario estiver fazendo uma requisição outra seja feita em seguida, como ele rolando a tela pra achar mais  
        }
        
        if(total > 0 && incidents.length == total){
            return;
        }

        setLoad(true); // antes da aquisição para api
        const response = await api.get('incidents',{
            params: {page}
        });
        setIncidents([...incidents, ... response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoad(false)
    }
    useEffect(() => {
       loadIncidents();
    }, []);
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                data={incidents} //array de dados que vai montar a lista
                style={styles.incidentsList}
                keyExtractor={ incident => String (incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => ( //o ":" troca o nome da variavel item por incident
                    <View style={styles.incidents}>
                        <Text style={styles.incidentsProperty}>ONG:</Text>
                        <Text style={styles.incidentsValue}>{incident.name}</Text>
                        
                        <Text style={styles.incidentsProperty}>CASO:</Text>
                        <Text style={styles.incidentsValue}>{incident.title}</Text>
                        
                        <Text style={styles.incidentsProperty}>VALOR:</Text>
                        <Text style={styles.incidentsValue}> 
                            {Intl.NumberFormat('pt-BR', {
                                style:'currency', 
                                currency:'BRL'
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() =>navigateToDetail(incident)}
                        >
                            <Text style={styles.buttonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"/>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}