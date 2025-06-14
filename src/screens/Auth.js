import React, {Component} from 'react'
import {
    ImageBackground, 
    Text, 
    StyleSheet, 
    View, 
    TextInput, 
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native'

import axios from 'axios'

import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'

import {server, showError, showSucess} from '../common'

const initialState = {
    name: '',
    email: 'bruno@gmail.com',
    password: '123456',
    confirmPassword: '',
    stageNew: false
}

export default class Auth extends Component{

    state = {
        ...initialState
    }

    signinOrSignup = () => {
        if(this.state.stageNew){
            this.signup()
        } else {
            this.signin()
        }
    }

    signup = async () =>{
        try{
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })

            showSucess('Usuario cadastrado')
            this.setState({...initialState})
        } catch(e) {
            showError(e)
        }
    }

    signin =async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            })

            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            this.props.navigation.navigate('Home')

        } catch(e){
            showError(e)
        }
    }

    render(){

        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)

        if(this.state.stageNew){
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.confirmPassword)
            validations.push(this.state.password === this.state.confirmPassword)
        }

        const validForm = validations.reduce((t, a) => t && a)

        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style = {styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    {this.state.stageNew &&
                        <TextInput 
                        //icon= 'user' 
                        placeholder='Nome' 
                        value={this.state.name}
                        style={styles.input} 
                        onChangeText={name => this.setState({name})}
                    />

                    }
                    <TextInput 
                        //icon='at' 
                        placeholder='E-mail' 
                        value={this.state.email}
                        style={styles.input} 
                        onChangeText={email => this.setState({email})}
                    />
                    <TextInput  
                        //icon='lock' 
                        placeholder='Senha' 
                        value={this.state.password}
                        style={styles.input} secureTextEntry = {true}
                        onChangeText={password => this.setState({password})}
                    />
                    { this.state.stageNew && 
                        <TextInput  
                        //icon='asterisk' 
                        placeholder='Confirme a Senha' 
                        value={this.state.confirmPassword}
                        style={styles.input} secureTextEntry = {true}
                        onChangeText={confirmPassword => this.setState({confirmPassword})}
                    />
                    }
                    <TouchableOpacity onPress={this.signinOrSignup}
                        disabled = {!validForm}>
                        <View style={[styles.button, validForm? {} :{backgroundColor:'#AAA'} ]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{padding: 10}}
                    onPress={() => this.setState({stageNew: !this.state.stageNew})}>
                        <Text style={styles.buttonText}>
                            {this.state.stageNew ? 'Ja possui conta?' : 'Ainda nao possui conta?'}
                        </Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%'

    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
        padding: Platform.OS == 'ios' ? 15 : 10,
        color: '#000',
        //fontFamily: 'Roboto'

    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#fff',
        fontSize: 20
    }
})